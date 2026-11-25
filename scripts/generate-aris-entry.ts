import { readFileSync, writeFileSync } from 'node:fs';
import { arisMetadata } from '../src/data/arisMetadata';

const { title, summary } = arisMetadata.en;
const html = readFileSync('dist/index.html', 'utf8');
const page = html.replace(
  /<title>[^<]*<\/title>/,
  `<title>${title}</title>\n    <meta name="description" content="${summary}" data-product="aris" />`,
);

writeFileSync('dist/aris.html', page);
