import streamlit as st
from google import genai
from google.genai import types
import io
import zipfile
import re

# ── 상수 ────────────────────────────────────────────────────────────────────────

TEXT_MODEL  = "gemini-2.0-flash"
IMAGE_MODEL = "gemini-3.1-flash-image-preview"  # 나노바나나2

DEFAULT_STYLE_TEMPLATE = (
    "Upgraded stick-man 2D with thick black outline, pure white faces, "
    "single hard cel shading, thicker torso and neck, flat matte colors; "
    "SCENE: [장면 묘사, no text/letters]"
)

STICKMAN_SYSTEM_PROMPT = """당신은 '2D 스틱맨 애니메이션 전문 프롬프트 디렉터'입니다.

## 스타일 가이드 (Style Lock)

**비주얼**
- 캐릭터: Pure-white round faces, single hard cel shading(턱 아래 1단 그림자),
  thick black outline, thicker torso and neck, stick limbs, flat matte colors.
- 배경: 저채도 평면 블록(Low saturation flat blocks), 글자 절대 금지.
- 네거티브: 3D, photoreal, gradient, soft light, text, letters, speech bubble.

**장면 해석**
- 행동 중심: 감정은 눈썹/입선으로, 동작은 명확한 동사(leans, points, nods, clasps, gestures)로 표현.
- 상승/하락 → 화살표 아이콘 | 데이터/실적 → 차트 도형, 기어, 지도 핀 | 계약/문서 → 빈 종이 아이콘
- 모든 간판, 화면, 문서에 글자(Text) 대신 기호/도형만 사용.

**출력 규칙**
영문 이미지 프롬프트 텍스트만 출력. 번호, 설명, 따옴표 없이.
반드시 아래 형식으로 시작:
Upgraded stick-man 2D with thick black outline, pure white faces, single hard cel shading, thicker torso and neck, flat matte colors; SCENE: [영문 장면 묘사, no text or letters]"""


# ── 핵심 함수 ───────────────────────────────────────────────────────────────────

@st.cache_resource
def get_client(api_key: str):
    """API 키 기반 Gemini 클라이언트 (캐시)"""
    return genai.Client(api_key=api_key)


def analyze_script(script: str, client) -> str:
    """Gemini 텍스트 모델로 대본 분석"""
    response = client.models.generate_content(
        model=TEXT_MODEL,
        contents=(
            "아래 대본을 분석해서 한국어로 간결하게 요약해주세요.\n"
            "1. 주제 및 핵심 메시지\n"
            "2. 전체 분위기 / 톤\n"
            "3. 주요 장면이나 등장 개념\n\n"
            f"[대본]\n{script}"
        ),
    )
    return response.text


def segment_script(script: str, seconds: int) -> list[dict]:
    """한국어 기준 1초 ≈ 4~5글자로 대본을 컷 단위로 분할"""
    chars_per_seg = seconds * 4  # 보수적 기준 (4글자/초)

    # 문장 경계(마침표, 느낌표, 물음표, 줄바꿈)로 1차 분리
    sentences = re.split(r"(?<=[.!?\n])\s*", script.strip())
    sentences = [s.strip() for s in sentences if s.strip()]

    segments: list[dict] = []
    current = ""
    idx = 1

    for sent in sentences:
        if not current:
            current = sent
        elif len(current) + 1 + len(sent) <= chars_per_seg:
            current += " " + sent
        else:
            segments.append({"index": idx, "text": current})
            idx += 1
            current = sent

    if current:
        segments.append({"index": idx, "text": current})

    return segments


def generate_image_prompt(segment_text: str, style_template: str, client) -> str:
    """세그먼트 텍스트를 스틱맨 스타일 영문 이미지 프롬프트로 변환"""
    user_prompt = (
        f"다음 텍스트를 스틱맨 2D 이미지 프롬프트로 변환하세요.\n\n"
        f"텍스트: {segment_text}\n\n"
        f"프롬프트 형식 참고:\n{style_template}\n\n"
        "위 형식을 따라 영문 프롬프트만 출력하세요 (번호, 따옴표, 부가 설명 없이):"
    )
    response = client.models.generate_content(
        model=TEXT_MODEL,
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=STICKMAN_SYSTEM_PROMPT
        ),
    )
    return response.text.strip().strip('"').strip("'")


def generate_image(prompt: str, client) -> bytes:
    """나노바나나2 (gemini-3.1-flash-image-preview)로 이미지 생성"""
    response = client.models.generate_content(
        model=IMAGE_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE", "TEXT"]
        ),
    )
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            return part.inline_data.data
    raise ValueError("이미지 데이터가 응답에 포함되지 않았습니다.")


def build_zip(success_images: list[tuple[int, bytes]]) -> bytes:
    """(컷 번호, 이미지 바이트) 목록을 ZIP으로 묶기"""
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        for cut_idx, img_bytes in success_images:
            zf.writestr(f"cut_{cut_idx:03d}.png", img_bytes)
    return buf.getvalue()


# ── 페이지 설정 ─────────────────────────────────────────────────────────────────

st.set_page_config(
    page_title="이미지 생성기",
    page_icon="🎬",
    layout="wide",
)

# ── 사이드바 ─────────────────────────────────────────────────────────────────────

with st.sidebar:
    st.title("⚙️ 설정")

    api_key = st.text_input(
        "🔑 Gemini API Key",
        type="password",
        placeholder="AIza...",
        help="Google AI Studio (aistudio.google.com)에서 발급받은 API 키",
    )

    st.divider()

    st.subheader("🕐 컷당 시간")
    seconds_per_cut = st.slider(
        label="초 단위로 조정하세요",
        min_value=1,
        max_value=30,
        value=5,
        step=1,
        format="%d초",
    )
    chars_min = seconds_per_cut * 4
    chars_max = seconds_per_cut * 5
    st.caption(
        f"현재: **{seconds_per_cut}초** / 컷 → 약 **{chars_min}~{chars_max}글자** 분량"
    )

    st.divider()

    st.subheader("🎨 이미지 프롬프트 형식")
    style_template = st.text_area(
        label="스타일 템플릿 (수정 가능)",
        value=DEFAULT_STYLE_TEMPLATE,
        height=160,
        help="[장면 묘사] 부분이 각 컷 내용으로 자동 채워집니다. 원하는 스타일로 수정하세요.",
    )

    st.divider()

    with st.expander("ℹ️ 사용 모델"):
        st.markdown(
            "- **텍스트 분석/프롬프트 생성**\n"
            "  `gemini-2.0-flash`\n\n"
            "- **이미지 생성 (나노바나나2)**\n"
            "  `gemini-3.1-flash-image-preview`"
        )


# ── 메인 ─────────────────────────────────────────────────────────────────────────

st.title("🎬 대본 기반 이미지 생성기")
st.caption(
    "대본을 입력하면 → 분석 → 초단위 분할 → 이미지 프롬프트화 → 나노바나나2로 이미지 생성까지 자동으로 진행됩니다."
)

script = st.text_area(
    "📝 대본 입력",
    placeholder=(
        "여기에 대본을 입력하세요...\n\n"
        "예시:\n"
        "부자들은 위기를 기회로 삼습니다. 주식 시장이 폭락할 때 오히려 매수 버튼을 누르죠.\n"
        "공포에 사는 것. 그것이 부자들의 공식입니다."
    ),
    height=220,
)

# 실행 버튼 (중앙 정렬)
_, btn_col, _ = st.columns([1, 2, 1])
with btn_col:
    run = st.button(
        "🚀 이미지 생성 시작",
        use_container_width=True,
        type="primary",
        disabled=not (api_key and script.strip()),
    )

# 안내 메시지
if not api_key:
    st.warning("⬅️ 사이드바에서 Gemini API Key를 먼저 입력해주세요.")
elif not script.strip():
    st.info("📝 대본을 입력하면 생성 버튼이 활성화됩니다.")


# ── 4단계 파이프라인 ──────────────────────────────────────────────────────────────

if run and api_key and script.strip():

    client = get_client(api_key)

    # ── 1단계: 대본 분석 ─────────────────────────────────────────────────────────
    with st.status("📊 1단계: 대본 분석 중...", expanded=True) as s1:
        try:
            st.write("Gemini가 대본의 주제, 분위기, 핵심 장면을 파악합니다...")
            analysis = analyze_script(script, client)
            s1.update(label="✅ 1단계: 대본 분석 완료", state="complete", expanded=False)
        except Exception as e:
            s1.update(label="❌ 1단계: 대본 분석 실패", state="error")
            st.error(f"오류: {e}")
            st.stop()

    with st.expander("📊 대본 분석 결과 보기", expanded=False):
        st.markdown(analysis)

    # ── 2단계: 초단위 분할 ────────────────────────────────────────────────────────
    with st.status("✂️ 2단계: 대본 분할 중...", expanded=True) as s2:
        try:
            st.write(f"{seconds_per_cut}초 기준 (약 {chars_min}~{chars_max}글자/컷)으로 분할합니다...")
            segments = segment_script(script, seconds_per_cut)
            s2.update(
                label=f"✅ 2단계: {len(segments)}개 컷으로 분할 완료",
                state="complete",
                expanded=False,
            )
        except Exception as e:
            s2.update(label="❌ 2단계: 대본 분할 실패", state="error")
            st.error(f"오류: {e}")
            st.stop()

    with st.expander(f"✂️ 분할 결과 ({len(segments)}컷)", expanded=True):
        for seg in segments:
            st.markdown(f"**{seg['index']}번 컷** — {seg['text']}")

    # 세그먼트 인덱스 → 텍스트 조회용 딕셔너리
    seg_map = {seg["index"]: seg["text"] for seg in segments}

    # ── 3단계: 이미지 프롬프트 생성 ────────────────────────────────────────────────
    prompts: list[str] = []
    with st.status("✍️ 3단계: 이미지 프롬프트 생성 중...", expanded=True) as s3:
        prog3 = st.progress(0, text="프롬프트 생성 준비 중...")
        try:
            for i, seg in enumerate(segments):
                prog3.progress(
                    (i + 1) / len(segments),
                    text=f"프롬프트 생성 중: {i + 1} / {len(segments)}컷",
                )
                prompt_text = generate_image_prompt(seg["text"], style_template, client)
                prompts.append(prompt_text)

            s3.update(
                label=f"✅ 3단계: {len(prompts)}개 프롬프트 생성 완료",
                state="complete",
                expanded=False,
            )
        except Exception as e:
            s3.update(label="❌ 3단계: 프롬프트 생성 실패", state="error")
            st.error(f"오류: {e}")
            st.stop()

    with st.expander(f"✍️ 생성된 이미지 프롬프트 ({len(prompts)}개)", expanded=False):
        for i, p in enumerate(prompts):
            st.code(f"{i + 1}. {p}", language="text")

    # ── 4단계: 이미지 생성 (나노바나나2) ─────────────────────────────────────────────
    all_images: list[tuple[int, bytes | None]] = []
    failed_cuts: list[int] = []

    with st.status("🖼️ 4단계: 이미지 생성 중...", expanded=True) as s4:
        prog4 = st.progress(0, text="이미지 생성 준비 중...")
        for i, (seg, prompt_text) in enumerate(zip(segments, prompts)):
            prog4.progress(
                (i + 1) / len(prompts),
                text=f"이미지 생성 중: {i + 1} / {len(prompts)}컷",
            )
            try:
                img_bytes = generate_image(prompt_text, client)
                all_images.append((seg["index"], img_bytes))
            except Exception as e:
                failed_cuts.append(seg["index"])
                all_images.append((seg["index"], None))
                st.warning(f"컷 {seg['index']} 생성 실패: {e}")

        success_images = [(idx, b) for idx, b in all_images if b is not None]

        if failed_cuts:
            s4.update(
                label=(
                    f"⚠️ 4단계: {len(success_images)}/{len(segments)}개 완료 "
                    f"(실패 컷: {failed_cuts})"
                ),
                state="complete",
                expanded=False,
            )
        else:
            s4.update(
                label=f"✅ 4단계: 이미지 {len(success_images)}개 생성 완료",
                state="complete",
                expanded=False,
            )

    # ── 결과 이미지 그리드 ───────────────────────────────────────────────────────────
    st.divider()
    st.subheader(f"🖼️ 생성된 이미지 ({len(success_images)}컷)")

    COLS_PER_ROW = 3
    for row_start in range(0, len(all_images), COLS_PER_ROW):
        row_items = all_images[row_start : row_start + COLS_PER_ROW]
        cols = st.columns(COLS_PER_ROW)
        for col, (cut_idx, img_bytes) in zip(cols, row_items):
            with col:
                cut_text = seg_map.get(cut_idx, "")
                caption = f"컷 {cut_idx}: {cut_text[:35]}{'...' if len(cut_text) > 35 else ''}"
                if img_bytes:
                    st.image(img_bytes, caption=caption, use_container_width=True)
                else:
                    st.error(f"컷 {cut_idx} 생성 실패")
                    st.caption(cut_text)

    # ── 다운로드 ────────────────────────────────────────────────────────────────────
    if success_images:
        st.divider()
        dl_left, dl_right = st.columns([4, 1])
        with dl_left:
            zip_data = build_zip(success_images)
            st.download_button(
                label=f"⬇️ 전체 이미지 ZIP 다운로드 ({len(success_images)}개)",
                data=zip_data,
                file_name="generated_images.zip",
                mime="application/zip",
                use_container_width=True,
            )
        with dl_right:
            st.metric("생성 완료", f"{len(success_images)} / {len(segments)} 컷")
