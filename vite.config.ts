import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // {
    //   name: 'fix-windows-spaces',
    //   enforce: 'pre',
    //   transformIndexHtml: {
    //     order: 'pre',
    //     handler(html) {
    //       return html.replaceAll('%20', ' ')
    //     },
    //   },
    //   resolveId(source) {
    //     if (source.includes('%20')) {
    //       return decodeURI(source)
    //     }
    //     return null
    //   },
    // },
  ],
})
