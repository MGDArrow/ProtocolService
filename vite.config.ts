
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue(), VitePWA({
    manifest: {
      name: `Service Protocol`,
      short_name: `Service`,
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      theme_color: `#80F`,
      background_color: `#80F`,
      lang: 'ru',
    },
  }),],
  base   : '/ProtocolService',
  resolve: {
    alias: {
      '@'          : path.resolve(__dirname, 'src'),
      '@assets'    : path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores'    : path.resolve(__dirname, 'src/stores'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/variables.scss";',
      },
    },
  },
});
