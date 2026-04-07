export interface BossSkill {
  name: string;
  description: string;
}

export interface FieldBoss {
  id: string;
  episode: number;
  mapLevel: number;
  mapName: string;
  bossLevel: number;
  name: string;
  attribute: string;
  race: string;
  skills: BossSkill[];
  mapDescription: string;
}
