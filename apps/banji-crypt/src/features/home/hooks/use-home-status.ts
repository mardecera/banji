"use client";

import { useToggle } from "@banji/hooks";

export const useHomeStatus = () => useToggle(false);
