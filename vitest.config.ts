import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const scssStubId = '\0vitest-scss-stub';
const scssStub = 'export default {};';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vitest-scss-stub',
      resolveId(id) {
        if (id.endsWith('.scss') || id.endsWith('.sass') || id.endsWith('.css')) {
          return scssStubId;
        }
      },
      load(id) {
        if (id === scssStubId) return scssStub;
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}', 'tests/**/*.spec.{ts,tsx}'],
    globals: true,
  },
});
