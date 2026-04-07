"use client";

import { useState, useMemo } from "react";
import fieldBossData from "@/data/bosses-field.json";
import { FieldBoss } from "@/types/boss";
import { FieldBossCard } from "@/components/FieldBossCard";
import { Input } from "@/components/ui/input";
import { AttributeIcon } from "@/components/AttributeIcon";
import { ATTRIBUTES, CUPAL_RACES } from "@/lib/constants";

const bosses = fieldBossData as FieldBoss[];
const episodes = Array.from(new Set(bosses.map((b) => b.episode))).sort((a, b) => a - b);

export default function FieldBossPage() {
  const [search, setSearch] = useState("");
  const [episode, setEpisode] = useState<number | null>(null);
  const [attribute, setAttribute] = useState("");
  const [race, setRace] = useState("");

  const toggle = (current: string, value: string, setter: (v: string) => void) =>
    setter(current === value ? "" : value);

  const filtered = useMemo(() => bosses.filter((b) => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.mapName.toLowerCase().includes(search.toLowerCase())) return false;
    if (episode !== null && b.episode !== episode) return false;
    if (attribute && b.attribute !== attribute) return false;
    if (race && b.race !== race) return false;
    return true;
  }), [search, episode, attribute, race]);

  const hasFilter = search || episode !== null || attribute || race;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
          <a href="/bosses" className="hover:text-gray-600">보스</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">필드 보스</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">필드 보스</h1>
        <p className="text-gray-500 text-sm">총 {bosses.length}마리 · 검색 결과 {filtered.length}마리</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 space-y-4">
        <Input
          placeholder="보스 이름 또는 맵 이름 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        {/* Episode filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500 w-14">에피소드</span>
          {episodes.map((ep) => (
            <button
              key={ep}
              onClick={() => setEpisode(episode === ep ? null : ep)}
              className={`h-7 px-3 rounded-full text-xs font-bold transition-all border ${
                episode === ep
                  ? "bg-gray-800 text-white border-gray-800 ring-2 ring-inset ring-amber-400"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
              }`}
            >
              {ep}
            </button>
          ))}
        </div>

        {/* Attribute filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500 w-14">속성</span>
          {ATTRIBUTES.filter(a => a !== "무속성").map((a) => (
            <button
              key={a}
              onClick={() => toggle(attribute, a, setAttribute)}
              className={`h-7 flex items-center gap-1.5 px-2.5 rounded-full text-xs font-semibold transition-all ${
                attribute === a
                  ? "bg-gray-200 ring-2 ring-inset ring-amber-400"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <AttributeIcon attribute={a} size={18} />
              <span>{a}</span>
            </button>
          ))}
        </div>

        {/* Race filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500 w-14">종족</span>
          {CUPAL_RACES.map((r) => (
            <button
              key={r}
              onClick={() => toggle(race, r, setRace)}
              className={`h-7 px-3 rounded-full text-xs font-semibold transition-all border ${
                race === r
                  ? "bg-purple-100 text-purple-700 border-purple-200 ring-2 ring-inset ring-amber-400"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={() => { setSearch(""); setEpisode(null); setAttribute(""); setRace(""); }}
          className={`text-xs text-gray-400 hover:text-gray-600 underline ${!hasFilter ? "invisible" : ""}`}
        >
          필터 초기화
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">조건에 맞는 보스가 없습니다.</p>
          <p className="text-sm mt-1">필터를 초기화해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((boss) => (
            <FieldBossCard key={boss.id} boss={boss} />
          ))}
        </div>
      )}
    </div>
  );
}
