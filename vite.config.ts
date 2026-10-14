import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'fix-windows-spaces',
      enforce: 'pre',
      resolveId(source) {
        if (source.includes('%20')) {
          return decodeURI(source)
        }
        return null
      },
      load(id) {
        if (id.includes('%20')) {
          return null
        }
      },
    },
  ],
})
