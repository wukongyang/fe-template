/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_APP_LOGIN_URL:string
  readonly VITE_APP_TOKEN_NAME:string
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  readonly VITE_BUILD_DROP_CONSOLE: string;
  readonly VITE_BUILD_VCONSOLE: string;
  // 更多环境变量...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
