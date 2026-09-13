"use client";

import { useCallback, useState } from "react";

export const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return { value, toggle, setValue } as const;
};
