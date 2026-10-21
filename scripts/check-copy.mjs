// Fails the build when site copy breaks the rules in CLAUDE.md: things the company does
// not offer or claim, words we avoid, and Polish typography (a non-breaking space after
// one-letter words). Only copy is checked: JSX text, string literals and the JSON with
// page meta and company details, never identifiers, class names, paths or comments.
//
//   node scripts/check-copy.mjs        check (runs before every build)
//   node scripts/check-copy.mjs --fix  also insert the missing non-breaking spaces
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseAst } from 'vite';

const FIX = process.argv.includes('--fix');
const NBSP = ' ';

const RULES = [
  [/gwarancj/i, 'no warranty period on the site for now'],
  [/ładowar|ładuje samoch|ładowani\w* (aut|samochod)|samoch\w* elektryczn|wallbox/i, 'EV chargers are not offered'],
  [/\bankiet|kalkulator/i, 'the enquiry is not a survey or a calculator'],
  [/dobierz\w* zestaw|dob[oó]r\w* zestaw|dobierzemy zestaw/i, 'no kits to pick'],
  [/sprawdzon\w* (zestaw|rzecz|rozwiąza)|realizacj|gotowych dom|bestseller|najczęściej wybier/i, 'new company: no track-record claims'],
  [/HEPA|PN-HD|uprawnie\w* SEP|atestowan/i, 'unverified standards or certificates'],
  [/przepięci|\bburz/i, 'surge protection is not a service'],
  [/SSWiN|alarm|syren|intruz|uzbraj|rozbraj/i, 'alarm systems are not offered; cameras send notifications'],
  [/podlew|nawadnia/i, 'garden watering is not offered'],
  [/głośnik|muzyk|multiroom|nagłośn|multimedi|\bkin(o|a|ie|em)\b/i, 'audio, multimedia and home cinema are not offered'],
  [/klimatyz/i, 'air conditioning is not offered'],
  [/szybki\w* internet|internet\w* w (całym|każdym)|wi-?fi (na każdym|w całym|dla gości)/i, 'we do not provide internet or household Wi-Fi'],
  [/asystent\w* głosow|komend\w* głosow|polecen\w* głosow|\bgłosem\b/i, 'no voice assistants or commands'],
  [/LOQED|\bradar/i, 'only what we install'],
  [/rysunk/i, 'checking drawings is not a target offer'],
  [/cał\w* Polsk/i, 'region is Warszawa i okolice'],
  [/oddzwoni|oddzwaniam/i, 'contact copy says "odezwiemy się" (visitors can choose e-mail only)'],
  [/\b(3EM|TRV|ANPR|LPR|DeepinView\w*|AcuSense|ColorVu|TandemVu|mmWave|NVR|PoE|DALI|Gen ?[34]|AI)\b/, 'no model numbers or jargon in copy'],
  [/dokumentacj|schemat\w* instalac|serwis po gwarancji/i, 'after installation: only training and free configuration'],
];

// Attributes and object keys that hold code, not copy
const CODE_ATTRS = new Set([
  'className', 'to', 'href', 'src', 'srcSet', 'sizes', 'id', 'key', 'role', 'type', 'name', 'autoComplete', 'inputMode',
  'rel', 'target', 'htmlFor', 'viewBox', 'd', 'fill', 'stroke', 'mask', 'maskUnits', 'fetchPriority', 'loading',
  'decoding', 'aria-controls', 'aria-labelledby', 'aria-describedby', 'path', 'element', 'media',
]);
const CODE_KEYS = new Set(['id', 'path', 'icon', 'category', 'image', 'value', 'query', 'className', 'to', 'type', 'key', 'slug']);

// A one-letter word (a, i, o, u, w, z) followed by an ordinary space or a line break
const ONE_LETTER = /(?<![\p{L}\p{N}_\-./@&#])([aiouwzAIOUWZ])(?: |[ \t]*\n\s*)(?=[\p{L}\p{N}„"(«])/gu;

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(name) && name !== 'entry-server.tsx') files.push(p);
  }
};
walk('src');

const problems = [];
let fixed = 0;
const lineOf = (src, index) => src.slice(0, index).split('\n').length;
const checkRules = (file, line, text, isJsxText) => {
  for (const [re, why] of RULES) if (re.test(text)) problems.push(`${file}:${line}  ${why}\n    ${text.trim().slice(0, 140)}`);
  if (isJsxText && /\s&\s/.test(text)) problems.push(`${file}:${line}  write "i", not "&"\n    ${text.trim().slice(0, 140)}`);
};

// Walks the tree; cb gets the node and its ancestors (closest last)
const visit = (node, ancestors, cb) => {
  if (!node || typeof node !== 'object') return;
  if (node.type) cb(node, ancestors);
  const next = node.type ? [...ancestors, node] : ancestors;
  for (const key of Object.keys(node)) {
    const value = node[key];
    if (Array.isArray(value)) value.forEach((child) => child && child.type && visit(child, next, cb));
    else if (value && typeof value === 'object' && value.type) visit(value, next, cb);
  }
};

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const ast = parseAst(src, { lang: file.endsWith('x') ? 'tsx' : 'ts' }, file);
  const edits = [];

  // Code, not copy: imports, class names, paths, ids, icon names, DOM lookups, comparisons
  const isCode = (parent) => {
    if (!parent) return false;
    if (parent.type === 'ImportDeclaration' || parent.type === 'ImportExpression') return true;
    if (parent.type === 'JSXAttribute') {
      const name = parent.name?.name;
      return CODE_ATTRS.has(name) || String(name).startsWith('data-');
    }
    if (parent.type === 'Property' && parent.key?.type) {
      const k = parent.key.name ?? parent.key.value;
      return CODE_KEYS.has(k);
    }
    if (parent.type === 'CallExpression') {
      const callee = parent.callee;
      const fn = callee?.property?.name ?? callee?.name;
      return ['getElementById', 'querySelector', 'querySelectorAll', 'getItem', 'removeItem', 'setItem', 'get', 'set', 'delete', 'track', 'setAttribute'].includes(fn);
    }
    if (parent.type === 'BinaryExpression' || parent.type === 'SwitchCase' || parent.type === 'TSLiteralType') return true;
    return false;
  };
  const skip = (ancestors) => ancestors.some(isCode);

  visit(ast, [], (node, ancestors) => {
    const parent = ancestors[ancestors.length - 1];
    // Object keys like '/multimedia' in REDIRECTS, and `export … from '…'` paths, are code
    if (parent?.type === 'Property' && parent.key === node) return;
    if ((parent?.type === 'ExportNamedDeclaration' || parent?.type === 'ExportAllDeclaration') && parent.source === node) return;
    let text = null;
    let start = 0;
    let isJsxText = false;
    if (node.type === 'JSXText') {
      text = src.slice(node.start, node.end);
      start = node.start;
      isJsxText = true;
    } else if (node.type === 'Literal' && typeof node.value === 'string' && !skip(ancestors)) {
      text = src.slice(node.start + 1, node.end - 1);
      start = node.start + 1;
    } else if (node.type === 'TemplateElement' && !skip(ancestors)) {
      // The element's span includes the delimiter before it (` or }), the text starts after it
      text = node.value.raw;
      start = node.start + 1;
    }
    if (text === null || !/\p{L}/u.test(text)) return;
    if (/^(https?:|\/|#|mailto:)/.test(text.trim()) || (!text.includes(' ') && !isJsxText)) return;

    checkRules(file, lineOf(src, start), text, isJsxText);
    for (const m of text.matchAll(ONE_LETTER)) {
      edits.push({ from: start + m.index, to: start + m.index + m[0].length, text: m[1] + NBSP });
    }

  });

  // `i{' '}kamery` → `i{' '}kamery`
  visit(ast, [], (node) => {
    const kids = node.children;
    if (!Array.isArray(kids)) return;
    kids.forEach((kid, i) => {
      const prev = kids[i - 1];
      if (
        kid.type === 'JSXExpressionContainer' &&
        kid.expression?.type === 'Literal' &&
        kid.expression.value === ' ' &&
        prev?.type === 'JSXText' &&
        /(?<![\p{L}\p{N}])[aiouwzAIOUWZ]$/u.test(src.slice(prev.start, prev.end))
      ) {
        edits.push({ from: kid.expression.start, to: kid.expression.end, text: "'\\u00a0'" });
      }
    });
  });

  if (!edits.length) continue;
  if (FIX) {
    let out = src;
    for (const e of edits.sort((a, b) => b.from - a.from)) out = out.slice(0, e.from) + e.text + out.slice(e.to);
    writeFileSync(file, out);
    fixed += edits.length;
  } else {
    for (const e of edits) {
      problems.push(`${file}:${lineOf(src, e.from)}  non-breaking space after a one-letter word (run: node scripts/check-copy.mjs --fix)\n    ${src.slice(e.from, e.from + 40).replace(/\n\s*/g, ' ')}`);
    }
  }
}

// Page meta and company details
for (const file of ['src/data/pages.json', 'src/config/site.json']) {
  const raw = readFileSync(file, 'utf8');
  let changed = false;
  const data = JSON.parse(raw, function (key, value) {
    if (typeof value !== 'string' || key === 'url' || key === 'email' || key === 'phone' || key === 'telegram' || key === 'photo') return value;
    checkRules(file, '-', value, false);
    const next = value.replace(ONE_LETTER, (m, letter) => letter + NBSP);
    if (next !== value) {
      if (FIX) {
        changed = true;
        fixed++;
        return next;
      }
      problems.push(`${file}  non-breaking space after a one-letter word (run: node scripts/check-copy.mjs --fix)\n    ${value.slice(0, 80)}`);
    }
    return value;
  });
  if (changed) writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

if (FIX && fixed) console.log(`check-copy: inserted ${fixed} non-breaking space(s)`);
if (problems.length) {
  console.error(`check-copy: ${problems.length} problem(s)\n` + problems.join('\n'));
  process.exit(1);
}
console.log('check-copy: OK');
