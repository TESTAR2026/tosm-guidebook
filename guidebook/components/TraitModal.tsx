"use client";

import { useState } from "react";
import { Trait } from "@/types/fellow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TraitModalProps {
  trait: Trait;
  index: number;
}

export function TraitModal({ trait, index }: TraitModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            <span className="font-medium text-gray-800 text-sm">{trait.name}</span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
              {index + 1}
            </span>
            {trait.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{trait.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
