import { readFileSync, writeFileSync } from 'node:fs';
import { productMetadata } from '../src/data/productMetadata';

const html = readFileSync('dist/index.html', 'utf8');

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

for (const [route, { en }] of Object.entries(productMetadata)) {
  const page = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(en.title)}</title>\n    <meta name="description" content="${escapeHtml(en.summary)}" data-product />`,
  );

  writeFileSync(`dist${route}.html`, page);
}
