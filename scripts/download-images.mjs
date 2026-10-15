// Downloads every image referenced in src/data/products.json into
// public/products/<id>/ and rewrites the JSON to point at the local copies.
// Images are fetched at 1000px wide via Shopify's CDN resizing to keep the repo small.
// Usage: node scripts/download-images.mjs
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dataFile = path.join(root, 'src/data/products.json');
const WIDTH = 1000;
const CONCURRENCY = 8;

const products = JSON.parse(await readFile(dataFile, 'utf8'));

const sized = (url) => {
  const u = new URL(url);
  u.searchParams.set('width', WIDTH);
  return u.toString();
};

const jobs = [];
const localFor = new Map();
for (const p of products) {
  const dir = `products/${p.id}`;
  const urls = [...p.images, ...p.colors.map((c) => c.image)].filter((u) => u?.startsWith('http'));
  for (const url of new Set(urls)) {
    if (localFor.has(url)) continue;
    const ext = path.extname(new URL(url).pathname).toLowerCase() || '.jpg';
    const local = `/${dir}/${localFor.size + 1}${ext}`;
    localFor.set(url, local);
    jobs.push({ url, file: path.join(root, 'public', local) });
  }
}

let done = 0;
let failed = 0;
const worker = async () => {
  while (jobs.length) {
    const { url, file } = jobs.shift();
    try {
      await access(file);
    } catch {
      try {
        const res = await fetch(sized(url));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, Buffer.from(await res.arrayBuffer()));
      } catch (err) {
        failed++;
        localFor.delete(url);
        console.error(`failed ${url}: ${err.message}`);
        continue;
      }
    }
    if (++done % 100 === 0) console.log(`${done} images downloaded`);
  }
};
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const swap = (url) => localFor.get(url) ?? url;
for (const p of products) {
  p.images = p.images.map(swap);
  p.colors = p.colors.map((c) => ({ ...c, image: c.image && swap(c.image) }));
  p.variants = p.variants.map((v) => ({ ...v, image: v.image && swap(v.image) }));
}
await writeFile(dataFile, JSON.stringify(products, null, 1));
console.log(`done: ${done} downloaded, ${failed} failed`);
