import { defineConfig, type UserConfig } from 'tsdown';

const entries = {
  'ds/stack': 'src/datastructures/Stack.ts',
  'ds/queue': 'src/datastructures/Queue.ts',
  'ds/heap': 'src/datastructures/Heap.ts',
  'ds/priority-queue': 'src/datastructures/PriorityQueue.ts',
  'ds/types': 'src/datastructures/types.ts',
};

const shared: UserConfig = {
  target: 'es2022',
  outDir: 'dist',
};

// derive minified entry map
const minEntries = Object.fromEntries(Object.entries(entries).map(([key, value]) => [`${key}.min`, value]));

export default defineConfig([
  {
    ...shared,
    format: ['esm', 'cjs'],
    entry: entries,
    platform: 'node',
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    unbundle: true,
    exports: {
      enabled: true,
      devExports: false,
      packageJson: false,
    },
    publint: true,
    attw: {
      enabled: true,
      profile: 'node16',
    },
  },

  {
    ...shared,
    format: ['esm'],
    entry: minEntries,
    platform: 'browser',
    dts: false,
    sourcemap: false,
    minify: true,
    unbundle: false,
  },
]);
