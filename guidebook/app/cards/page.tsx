"use client";

import cardsData from "@/data/cards.json";
import { Card } from "@/types/card";
import { CardCard } from "@/components/CardCard";
import { CardsFilter } from "@/components/CardsFilter";
import { useState } from "react";

const cards = cardsData as Card[];

export default function CardsPage() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [attribute, setAttribute] = useState("");
  const [race, setRace] = useState("");

  const filtered = cards.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (grade && c.grade !== grade) return false;
    if (attribute && c.effectAttribute !== attribute) return false;
    if (race && c.effectRace !== race) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">카드 도감</h1>
        <p className="text-gray-500 text-sm">
          총 {cards.length}장의 카드 &middot; 검색 결과 {filtered.length}장
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <CardsFilter
          search={search} setSearch={setSearch}
          grade={grade} setGrade={setGrade}
          attribute={attribute} setAttribute={setAttribute}
          race={race} setRace={setRace}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">조건에 맞는 카드가 없습니다.</p>
          <p className="text-sm mt-1">필터를 초기화해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((card) => (
            <CardCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
