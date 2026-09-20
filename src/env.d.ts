import type { SessionRow } from '>/lib/server/sessions/types';

// Need this global namespace for Astro Locals interface to pass custom properties to the application
// File needs to be at the same level as middleware.ts
// See: https://docs.astro.build/en/guides/typescript/#extending-the-astro-types
declare global {
  namespace App {
    interface Locals {
      session?: SessionRow;
      cookiesDisabled?: boolean;
      redirected: boolean;
    }
  }
}

export {};
