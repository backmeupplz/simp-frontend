import preact from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as Plugin,
      ],
    },
    outDir: 'dist',
  },
  server: {
    allowedHosts: ['empty-points-fail.loca.lt'],
  },
})
