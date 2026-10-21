// Used only by the build (scripts/prerender.mjs): renders one path to HTML,
// waiting for the lazily loaded page, so every page ships with its content.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App.tsx';
import { ROUTES, REDIRECTS } from './routes.tsx';

export const ROUTE_PATHS = ROUTES.map((r) => r.path);
export const ROUTE_FILES: Record<string, string> = Object.fromEntries(ROUTES.map((r) => [r.path, r.file]));
export { REDIRECTS };
export { NOT_FOUND_META } from './components/RouteMeta.tsx';

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
    // Keep every part of the page in place. By default React moves large parts to the end
    // and reveals them with inline scripts, which the Content-Security-Policy blocks.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const html = await new Response(prelude).text();
  if (html.includes('<!--$?-->') || html.includes('<script')) throw new Error(`${url}: rendered with unfinished parts`);
  return html;
}
