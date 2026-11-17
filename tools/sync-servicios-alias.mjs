import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const source = new URL('../formacion-servicios/', import.meta.url);
const aliasPageId = 'servicios-legacy';
const target = new URL('../' + aliasPageId + '/', import.meta.url);
const args = process.argv.slice(2);
const write = args[0] === '--write';
assert(args.length === 0 || (args.length === 1 && write), 'Usage: node tools/sync-servicios-alias.mjs [--write]');

const docs = [
  'page-config.json',
  'components.json',
  'variables.json',
  'angora-combos.json',
  'i18n/es.json',
];

if (write) await mkdir(new URL('i18n/', target), { recursive: true });
for (const file of docs) {
  const data = JSON.parse(await readFile(new URL(file, source), 'utf8'));
  data.pageId = aliasPageId;
  if (file === 'page-config.json') data.seo.robots = 'noindex,follow';

  const expected = JSON.stringify(data, null, 2) + '\n';
  const output = new URL(file, target);
  if (write) await writeFile(output, expected);
  else assert.equal((await readFile(output, 'utf8')).replaceAll('\r\n', '\n'), expected, 'Outdated services alias: ' + file);
}
console.log('Validated the services alias payload.');
