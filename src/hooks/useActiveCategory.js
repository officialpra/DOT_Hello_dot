"use client";

import { useState, useCallback } from "react";

export function useActiveCategory(initial = "All") {
  const [active, setActive] = useState(initial);

  const change = useCallback((category) => {
    setActive(category);
  }, []);

  return { active, change };
}
