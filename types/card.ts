export type CardGrade = "전설" | "영웅" | "희귀" | "고급" | "일반";

export interface Card {
  id: string;
  name: string;
  grade: CardGrade | string;
  effect: string;        // 카드효과 원본 텍스트
  minValue: string;      // 초기수치
  maxValue: string;      // 최대수치
  effectAttribute: string; // 추가피해-속성 (불/땅/전기/얼음/신성/어둠)
  effectRace: string;    // 추가피해-종족 (야수형/악마형/...)
  effectStats: string[]; // 스탯 버프 분류 (공격력/치명타/방어력 등)
}
