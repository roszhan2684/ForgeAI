"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/lib/store/project-store";

export function StoreHydration() {
  useEffect(() => {
    useProjectStore.persist.rehydrate();
  }, []);
  return null;
}
