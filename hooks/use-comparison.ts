"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getMotorcycles } from "@/lib/motorcycles";

export const MAX_COMPARISON = 4;
const STORAGE_KEY = "motos-na-web:comparison:v1";
const CHANGE_EVENT = "motos-na-web:comparison-change";
let memorySnapshot = "";
let useMemory = false;

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
function getSnapshot() {
  if (useMemory) return memorySnapshot;
  try { return window.localStorage.getItem(STORAGE_KEY) ?? ""; }
  catch { return memorySnapshot; }
}
function parseSelection(snapshot: string): string[] {
  try {
    const value: unknown = JSON.parse(snapshot || "[]");
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is string =>
      typeof id === "string" && getMotorcycles().some((moto) => moto.id === id),
    ))].slice(0, MAX_COMPARISON);
  } catch { return []; }
}
function saveSelection(ids: string[]) {
  memorySnapshot = JSON.stringify(ids);
  try { window.localStorage.setItem(STORAGE_KEY, memorySnapshot); useMemory = false; }
  catch { useMemory = true; } // Continua em memória quando o armazenamento é bloqueado.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
export function useComparison() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const ids = useMemo(() => parseSelection(snapshot), [snapshot]);
  const motorcycles = ids.flatMap((id) => getMotorcycles().filter((moto) => moto.id === id));
  function toggle(id: string) {
    const current = parseSelection(getSnapshot());
    if (current.includes(id)) saveSelection(current.filter((item) => item !== id));
    else if (current.length < MAX_COMPARISON && getMotorcycles().some((moto) => moto.id === id)) saveSelection([...current, id]);
  }
  return { ids, motorcycles, toggle, clear: () => saveSelection([]) };
}
