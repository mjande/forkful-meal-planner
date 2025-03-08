/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_AUTH_SERVICE_URL: string;
  readonly VITE_RECIPES_SERVICE_URL: string;
  readonly VITE_MEALS_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
