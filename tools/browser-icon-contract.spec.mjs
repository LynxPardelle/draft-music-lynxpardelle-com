import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const siteConfig = JSON.parse(readFileSync(resolve(import.meta.dirname, '..', 'site-config.json'), 'utf8'));

test('the Music draft uses its published Lynx Pardelle mark as the browser favicon', () => {
  assert.equal(
    siteConfig.site?.icons?.favicon,
    'https://assets.zoolandingpage.com.mx/music.lynxpardelle.com/default/hero-images/lynx-pardelle-lince.png',
  );
});
