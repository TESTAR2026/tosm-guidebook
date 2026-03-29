import { Grade, Attribute } from "./fellow";

export type CupalRace =
  | "야수형"
  | "악마형"
  | "변이형"
  | "식물형"
  | "곤충형"
  | "초월형"
  | "인간형";

export interface Cupal {
  id: string;
  name: string;
  grade: Grade;
  attribute: Attribute;
  race: CupalRace;
  passiveBuff: string;
  description: string;
  skillName: string;
  skillDescription: string;
  skillCooldown: string;
  companionEffect: string;
  possessionEffect: string;
}
