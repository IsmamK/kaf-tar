import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import analyzer from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
   
    analyzer(),
 
  ],
  server: {
    historyApiFallback: true,
     // Enable history API fallback
  },
  build: {
    sourcemap: true,  // Enable source maps for easier debugging in production
  },
  
})
