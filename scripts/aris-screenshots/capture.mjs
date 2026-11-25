import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mockAris } from './mock.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const output = join(fileURLToPath(new URL('../../', import.meta.url)), 'public', 'images', 'aris', 'screenshots');
const url = new URL(process.argv[2] ?? 'http://127.0.0.1:4174/');
const screens = ['home', 'recording', 'minutes', 'transcript', 'settings', 'menu-bar', 'meeting-alert'];
const requested = process.argv.slice(3);
const scratch = await mkdtemp(join(tmpdir(), 'aris-captures-'));
const browser = await chromium.launch({ channel: 'chrome' });

try {
  await mkdir(output, { recursive: true });
  for (const theme of ['light', 'dark']) {
    for (const [index, screen] of screens.entries()) {
      if (requested.length && !requested.includes(screen)) continue;
      const page = await browser.newPage({
        viewport: { width: 1040, height: 700 }, colorScheme: theme, reducedMotion: 'reduce',
        locale: 'es-CL', timezoneId: 'America/Santiago',
      });
      try {
        const errors = [];
        page.on('pageerror', error => errors.push(error));
        await page.route('**/*', route => new URL(route.request().url()).origin === url.origin
          ? route.continue()
          : route.abort());
        await page.addInitScript(mockAris, { screen, theme });
        await page.goto(url.href);

        if (screen === 'menu-bar' || screen === 'meeting-alert') {
          // The native popover uses a translucent background supplied by macOS.
          await page.addStyleTag({ content: `
            html.panel body {
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: radial-gradient(ellipse at 50% 38%, var(--hover), transparent 65%), var(--sidebar);
            }
            html.panel #root {
              width: 320px;
              zoom: 1.65;
              border: 1px solid var(--line);
              border-radius: 14px;
              background: var(--panel);
              box-shadow: 0 16px 44px rgb(0 0 0 / 24%);
              overflow: hidden;
            }
          ` });
          const content = screen === 'menu-bar'
            ? page.getByRole('button', { name: 'Iniciar reunión' })
            : page.getByRole('alert').getByText('Parece que empezó una reunión');
          await content.waitFor();
        } else {
          // Reproduce the native title bar dots over the frontend’s reserved space.
          await page.addStyleTag({ content: `
            body::before {
              position: fixed;
              z-index: 40;
              top: 14px;
              left: 18px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #ff5f57;
              box-shadow: 20px 0 #febc2e, 40px 0 #28c840;
              content: "";
              pointer-events: none;
            }
          ` });
          await page.getByRole('button', { name: 'Lanzamiento de Atlas · Demo' }).waitFor();
          switch (screen) {
            case 'home':
              await page.getByRole('button', { name: 'Iniciar reunión' }).waitFor();
              break;
            case 'recording':
              await page.getByText('El viernes revisamos qué mejoras podemos incorporar antes del lanzamiento.').waitFor();
              await page.getByRole('meter').first().waitFor();
              break;
            case 'minutes':
            case 'transcript':
              await page.getByRole('button', { name: 'Lanzamiento de Atlas · Demo' }).click();
              if (screen === 'minutes') {
                await page.getByText('Preparar la guía').waitFor();
              } else {
                await page.getByRole('tab', { name: 'Transcripción' }).click();
                await page.getByText('Mateo', { exact: true }).first().waitFor();
              }
              break;
            case 'settings':
              await page.getByRole('button', { name: 'Configuración' }).click();
              await page.getByRole('button', { name: /Funciones de IA/ }).click();
              await page.getByText('Redacción de actas', { exact: true }).waitFor();
              await page.getByRole('button', { name: theme === 'light' ? 'Modo oscuro' : 'Modo claro' }).waitFor();
              break;
          }
        }

        const file = `${String(index + 1).padStart(2, '0')}-${screen}-${theme}`;
        const png = join(scratch, `${file}.png`);
        await page.screenshot({ path: png, animations: 'disabled' });
        if (errors.length) throw new AggregateError(errors, file);
        execFileSync('cwebp', ['-quiet', '-lossless', png, '-o', join(output, `${file}.webp`)]);
        console.log(file);
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
  await rm(scratch, { recursive: true, force: true });
}
