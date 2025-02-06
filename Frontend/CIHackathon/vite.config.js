import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // or 'prompt'
      injectRegister: 'auto',
      workbox: {
        // Your Workbox configuration here (more on this below)
      },
      manifest: {
        name: 'FarmersConnect',
        short_name: 'FarmersConnect',
        description: 'FarmersConnect',
        theme_color: '#17494D', // Customize your theme color
        icons: [
          {
            src: '/192-192.png', // Path to your icon
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/512-512.png', // Path to your larger icon
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})