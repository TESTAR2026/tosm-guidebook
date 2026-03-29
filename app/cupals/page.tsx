"use client";

import cupalsData from "@/data/cupals.json";
import { Cupal } from "@/types/cupal";
import { CupalCard } from "@/components/CupalCard";
import { CupalsFilter } from "@/components/CupalsFilter";
import { useState } from "react";

const cupals = cupalsData as Cupal[];

export default function CupalsPage() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [attribute, setAttribute] = useState("");
  const [race, setRace] = useState("");

  const filtered = cupals.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (grade && c.grade !== grade) return false;
    if (attribute && c.attribute !== attribute) return false;
    if (race && c.race !== race) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">큐폴 도감</h1>
        <p className="text-gray-500 text-sm">
          총 {cupals.length}종의 큐폴 &middot; 검색 결과 {filtered.length}종
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <CupalsFilter
          search={search} setSearch={setSearch}
          grade={grade} setGrade={setGrade}
          attribute={attribute} setAttribute={setAttribute}
          race={race} setRace={setRace}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">조건에 맞는 큐폴이 없습니다.</p>
          <p className="text-sm mt-1">필터를 초기화해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((cupal) => (
            <CupalCard key={cupal.id} cupal={cupal} />
          ))}
        </div>
      )}
    </div>
  );
}
