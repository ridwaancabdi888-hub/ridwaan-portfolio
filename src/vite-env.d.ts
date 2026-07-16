/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_CALLMEBOT_PHONE?: string;
  readonly VITE_CALLMEBOT_APIKEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
