export type Grade = "R" | "SR" | "UR";
export type FellowClass =
  | "전투"
  | "사격"
  | "신앙"
  | "암살"
  | "마법"
  | "가디스";
export type Attribute =
  | "불"
  | "땅"
  | "전기"
  | "얼음"
  | "신성"
  | "어둠";
export type SkillType = "공격" | "버프/보조";
export type SkillLineage = "물리" | "원소" | "정신" | "";
export type Race =
  | "야수형"
  | "악마형"
  | "변이형"
  | "식물형"
  | "곤충형"
  | "초월형"
  | "인간형"
  | "";

export interface Trait {
  name: string;
  description: string;
}

export interface Skill {
  name: string;
  type: SkillType | "";
  lineage: SkillLineage;
  attribute: Attribute | "";
  race: Race;
  cooldown: string;
  range: string;
  description: string;
}

export interface Fellow {
  id: string;
  name: string;
  grade: Grade;
  class: string;
  lineage: FellowClass;
  attribute: Attribute;
  synergy: string;
  traits: Trait[];
  skills: Skill[];
  passiveEffect: string;
}
