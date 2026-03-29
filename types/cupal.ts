import { Grade } from "./fellow";

export type CupalPassiveBuffType = "관통" | "회피" | "명중" | "블록";

export interface Cupal {
  id: string;
  name: string;
  grade: Grade;
  passiveBuffType: CupalPassiveBuffType | string;
  passiveDescription: string;
  skillName: string;
  attack: string;         // 공격 속성: 얼음/불/땅/전기/신성/어둠/무/""
  debuff: string;         // 디버프 요약
  attackBuff: string;     // 공격버프 요약
  defenseBuff: string;    // 방어버프 요약
  heal: string;           // 회복 요약
  extraDamageAttribute: string;  // 추가피해 - 속성 (땅, 얼음 ... 전체)
  extraDamageRace: string;       // 추가피해 - 종족 (곤충형, 악마형 ... 전체)
  skillDescription: string;
  skillCooldown: string;
  companionEffect: string;
  possessionEffect: string;
}
