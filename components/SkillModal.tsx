"use client";

import { useState } from "react";
import { Skill } from "@/types/fellow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AttributeBadge } from "./AttributeBadge";
import { AttributeIcon } from "./AttributeIcon";
import { SKILL_TYPE_STYLES, SKILL_LINEAGE_STYLES } from "@/lib/constants";

interface SkillModalProps {
  skill: Skill;
  index: number;
  fellowAttribute: string;
}

export function SkillModal({ skill, index, fellowAttribute }: SkillModalProps) {
  const [open, setOpen] = useState(false);

  const displayAttribute = skill.attribute || fellowAttribute;
  const typeStyle = SKILL_TYPE_STYLES[skill.type] || "bg-gray-100 text-gray-700 border border-gray-200";
  const lineageStyle = skill.lineage ? SKILL_LINEAGE_STYLES[skill.lineage] : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            <span className="font-medium text-gray-800 text-sm truncate">{skill.name}</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {skill.type && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeStyle}`}>
                  {skill.type}
                </span>
              )}
              {skill.lineage && lineageStyle && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lineageStyle}`}>
                  {skill.lineage}
                </span>
              )}
              {displayAttribute && (
                <AttributeBadge attribute={displayAttribute} size="sm" />
              )}
            </div>
          </div>
          <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0 ml-2">
            +
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 flex-wrap">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            {skill.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {skill.type && (
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeStyle}`}>
                {skill.type}
              </span>
            )}
            {skill.lineage && lineageStyle && (
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lineageStyle}`}>
                {skill.lineage} 계열
              </span>
            )}
            {displayAttribute && (
              <span className="flex items-center gap-1.5">
                <AttributeIcon attribute={displayAttribute} size={22} />
                <span className="text-sm font-medium text-gray-700">
                  {displayAttribute} 속성
                </span>
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            {skill.cooldown && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-0.5">쿨다운</p>
                <p className="text-sm font-semibold text-gray-800">{skill.cooldown}</p>
              </div>
            )}
            {skill.range && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-0.5">거리/범위</p>
                <p className="text-sm font-semibold text-gray-800">{skill.range}</p>
              </div>
            )}
            {skill.race && (
              <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                <p className="text-xs text-gray-400 mb-0.5">적용 종족</p>
                <p className="text-sm font-semibold text-gray-800">{skill.race}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-400 mb-1">스킬 설명</p>
            <p className="text-sm text-gray-700 leading-relaxed">{skill.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
