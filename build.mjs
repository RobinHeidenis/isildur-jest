import {build} from 'esbuild'
import packagejson from './package.json' assert { type: "json" };
import pkg from 'npm-dts';
const {Generator} = pkg;

void new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  external: Object.keys(packagejson.dependencies),

}

void build({
  ...shared,
  outfile: 'dist/index.js',

})

void build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm',
})