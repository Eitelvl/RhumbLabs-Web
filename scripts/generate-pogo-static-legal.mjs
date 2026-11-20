import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const root = process.cwd();

for (const document of ['privacy-policy', 'terms-of-use']) {
  const sections = Object.fromEntries(['es', 'en'].map(language => {
    const markdown = readFileSync(join(root, 'src/data/legal', `pogo-${document}-${language}.md`), 'utf8');
    return [language, renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, markdown))];
  }));

  const title = document === 'privacy-policy' ? 'Política de privacidad / Privacy Policy' : 'Términos de uso / Terms of Use';
  const html = `<!doctype html>
<html lang="es" data-language="es" class="standalone-legal">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Pogo | Rhumb Labs</title>
  <style>
    :root { font-family: system-ui, -apple-system, sans-serif; line-height: 1.65; }
    body { max-width: 800px; margin: 0 auto; padding: 24px 20px 80px; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-bottom: 24px; border-bottom: 1px solid #8885; }
    a { color: #11a8fd; }
    button { padding: 8px 14px; border: 1px solid #8888; border-radius: 999px; background: transparent; color: inherit; cursor: pointer; font: inherit; }
    main { padding-top: 28px; overflow-wrap: anywhere; }
    h1, h2, h3 { line-height: 1.2; }
    h2 { margin-top: 2em; }
    li { margin: 0.45em 0; }
    [data-language="es"] [lang="en"], [data-language="en"] [lang="es"] { display: none; }
  </style>
  <script>
    try { document.documentElement.dataset.language = localStorage.getItem('language') === 'en' ? 'en' : 'es'; document.documentElement.lang = document.documentElement.dataset.language; } catch {}
  </script>
  <link rel="stylesheet" href="/styles/standalone-2000.css">
</head>
<body>
  <header><a href="/legal">Rhumb Labs · Pogo</a><button id="language-toggle" type="button" aria-label="Cambiar idioma">ES / EN</button></header>
  <main><article lang="es">${sections.es}</article><article lang="en">${sections.en}</article></main>
  <script>
    document.getElementById('language-toggle').addEventListener('click', function () {
      var next = document.documentElement.dataset.language === 'es' ? 'en' : 'es';
      document.documentElement.dataset.language = next;
      document.documentElement.lang = next;
      this.setAttribute('aria-label', next === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish');
      try { localStorage.setItem('language', next); } catch {}
    });
  </script>
</body>
</html>
`;
  writeFileSync(join(root, 'public', 'static-legal', 'pogo', `${document}.html`), html);
}
