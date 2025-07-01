import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // baseプロパティに設定する値
  let base = "/"

  // 本番時に適用させるbaseの値
  if (mode === "production") {
    base = "/LetterBoxedJP/"
  }

  return {
    plugins: [react()],
    // baseプロパティをbase変数で指定
    base: base,
  };
})
