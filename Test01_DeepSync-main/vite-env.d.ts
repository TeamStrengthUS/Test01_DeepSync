// Fix: Providing manual declarations for Vite environment variables to resolve "Cannot find type definition file for 'vite/client'"
interface ImportMetaEnv {
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
