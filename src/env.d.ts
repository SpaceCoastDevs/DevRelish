/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
}

type DevRelishUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  groupId?: string | null;
};

declare namespace App {
  interface Locals {
    /** Supplied by the host Astro site's auth middleware. */
    user: DevRelishUser | null;
    session?: unknown;
  }
}
