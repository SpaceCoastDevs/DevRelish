import type { AstroIntegration } from "astro";

export type DevRelishOptions = {
  /** Mount path for DevRelish routes. Defaults to the site root. */
  base?: `/${string}`;
};

export default function devRelish(options?: DevRelishOptions): AstroIntegration;
