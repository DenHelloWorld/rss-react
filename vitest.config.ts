import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test-utils/setupTests.test.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: ['src/**/*.test.{ts,tsx}', 'src/main.tsx', 'src/test-utils/*'],
        thresholds: {
          global: {
            statements: 80,
            branches: 50,
            functions: 50,
            lines: 50,
          },
        },
      },
    },
  })
);
