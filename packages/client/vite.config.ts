import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
      '@types': '/src/types',
    },
  },
});
