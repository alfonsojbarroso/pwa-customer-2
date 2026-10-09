import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'Gestor de Clientes PWA',
        short_name: 'ClientesApp',
        description: 'Aplicación web progresiva con React',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // --- CONFIGURACIÓN DE WORKBOX PARA LA API ---
      workbox: {
        runtimeCaching: [
          {
            // Aplica esta regla a cualquier petición que vaya a tu endpoint de clientes
            urlPattern: /^http:\/\/localhost:9090\/api\/v1\/customer.*/i,
            handler: 'NetworkFirst', // Intenta red primero, si no hay internet usa la caché
            options: {
              cacheName: 'api-clientes-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // Guarda en caché por 7 días
              },
              cacheableResponse: {
                statuses: [0, 200] // Guarda respuestas exitosas
              }
            }
          }
        ]
      }
    })
  ]
})