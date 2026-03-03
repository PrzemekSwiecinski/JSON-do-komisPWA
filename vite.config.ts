import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
     VitePWA({
      // --- NOWOŚĆ: To włącza PWA w trybie npm run dev ---
      devOptions: {
        enabled: true,
        type: 'module', // To ważne dla nowych wersji Vite
      },
      // --------------------------------------------------
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Komis Samochodowy',
        short_name: 'Komis',
        description: 'Przeglądaj oferty aut używanych',
        theme_color: '#334155',
        background_color: '#f8fafc',
        icons: [
          {
            src: 'auto_logo1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'auto_logo2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Ważne: usuwamy stare cache przy aktualizacji SW
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Cachowanie JSONa z internetu
            urlPattern: ({ url }) => {
              // Złap wszystko co ma .json LUB jest Twoim API_URL
              return url.pathname.includes('.json');
            },
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-data-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cachowanie zdjęć
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})