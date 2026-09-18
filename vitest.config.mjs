import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',

    include: [
      'src/**/*.test.js',
      'src/**/*.spec.js',
      'src/**/*.test.ts',
      'src/**/*.spec.ts'
    ],

    coverage: {
      provider: 'v8',

      reporter: [
        'text',
        'html',
        'lcov'
      ],

      reportsDirectory: './coverage',

      include: [
        'src/**/*.{js,ts,vue}'
      ],

      exclude: [
        'src/main.js',
        'src/router/**',
        'src/**/*.test.js',
        'src/**/*.spec.js',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.d.ts'
      ]
    }
  }
})
