"use client";

import fellowsData from "@/data/fellows.json";
import { Fellow } from "@/types/fellow";
import { FellowCard } from "@/components/FellowCard";
import { FellowsFilter } from "@/components/FellowsFilter";
import { useState } from "react";

const fellows = fellowsData as Fellow[];

export default function FellowsPage() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [lineage, setLineage] = useState("");
  const [attribute, setAttribute] = useState("");

  const filtered = fellows.filter((f) => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (grade && f.grade !== grade) return false;
    if (lineage && f.lineage !== lineage) return false;
    if (attribute && f.attribute !== attribute) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">펠로우 목록</h1>
        <p className="text-gray-500 text-sm">
          총 {fellows.length}명의 펠로우 &middot; 검색 결과 {filtered.length}명
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <FellowsFilter
          search={search} setSearch={setSearch}
          grade={grade} setGrade={setGrade}
          lineage={lineage} setLineage={setLineage}
          attribute={attribute} setAttribute={setAttribute}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">조건에 맞는 펠로우가 없습니다.</p>
          <p className="text-sm mt-1">필터를 초기화해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((fellow) => (
            <FellowCard key={fellow.id} fellow={fellow} />
          ))}
        </div>
      )}
    </div>
  );
}
