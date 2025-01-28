interface ImportMetaEnv {
  VITE_AUTHORIZE_API_LOGIN_ID: string
  VITE_AUTHORIZE_TRANSACTION_KEY: string
  VITE_AUTHORIZE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 