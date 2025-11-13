import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: [path.resolve(__dirname, 'tests/setupTests.ts')],
    globals: true,
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src/')
    }
  }
});