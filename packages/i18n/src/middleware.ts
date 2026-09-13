import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

export const createIntlMiddleware = () => createMiddleware(routing);
