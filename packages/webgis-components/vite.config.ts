import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import { defineConfig, UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import summary from 'rollup-plugin-summary';

// Get all component files for individual builds
const componentEntries = globSync('./src/**/*.ts', {
  ignore: [
    '**/*.d.ts',
    '**/*.mdx',
    '**/*.stories.ts',
    '**/*.styles.ts',
    '**/*.test.ts',
  ],
}).reduce(
  (entries, file) => {
    // Remove 'src/' and file extension: src/components/button.ts -> components/button
    const name = path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length),
    );
    // Expand to absolute path
    const filePath = fileURLToPath(new URL(file, import.meta.url));
    entries[name] = filePath;
    return entries;
  },
  {} as Record<string, string>,
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildTarget = process.env.BUILD_TARGET;

const kitchenSinkConfig: UserConfigExport = defineConfig({
  publicDir: false,
  build: {
    outDir: path.join(__dirname, './public/html'),
    lib: {
      entry: path.join(__dirname, './src/index.ts'),
      name: 'cui',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [summary()],
});

// CDN individual components config
const cdnConfig = defineConfig({
  publicDir: false,
  build: {
    outDir: path.join(__dirname, './cdn'),
    minify: true,
    sourcemap: false,
    lib: {
      entry: componentEntries,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        // Preserve directory structure
        entryFileNames: '[name].js',
        chunkFileNames: 'shared/[name]-[hash].js',
      },
    },
  },
  plugins: [dts(), summary()],
});

// Export based on BUILD_TARGET
export default buildTarget === 'cdn' ? cdnConfig : kitchenSinkConfig; // default
