/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_IMAGE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}