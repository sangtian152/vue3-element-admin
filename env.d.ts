/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KEY: string;
  readonly DZ_API: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}