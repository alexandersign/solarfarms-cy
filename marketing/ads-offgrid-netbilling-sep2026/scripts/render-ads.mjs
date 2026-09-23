#!/usr/bin/env node
/**
 * Render Lighthief off-grid + net-billing ads at every Meta / Google size.
 * Usage: node marketing/ads-offgrid-netbilling-sep2026/scripts/render-ads.mjs
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const EXPORT = path.join(ROOT, 'export')

const CREATIVES = [
  { id: 'og-home-a', product: 'off-grid', variant: 'home-a' },
  { id: 'og-home-b', product: 'off-grid', variant: 'home-b' },
  { id: 'og-home-c', product: 'off-grid', variant: 'home-c' },
  { id: 'og-biz', product: 'off-grid', variant: 'business' },
  { id: 'nb-home-a', product: 'net-billing', variant: 'home-a' },
  { id: 'nb-home-b', product: 'net-billing', variant: 'home-b' },
  { id: 'nb-biz', product: 'net-billing', variant: 'business' },
]

const SIZES = [
  { id: 'feed-square', w: 1080, h: 1080, platforms: ['meta', 'google'] },
  { id: 'feed-portrait', w: 1080, h: 1350, platforms: ['meta'] },
  { id: 'stories-reels', w: 1080, h: 1920, platforms: ['meta'] },
  { id: 'landscape', w: 1920, h: 1080, platforms: ['meta'] },
  { id: 'link-landscape', w: 1200, h: 628, platforms: ['meta', 'google'] },
  { id: 'carousel-square', w: 1200, h: 1200, platforms: ['meta', 'google'] },
  { id: 'rd-portrait', w: 960, h: 1200, platforms: ['google'] },
  { id: 'mrec', w: 300, h: 250, platforms: ['google'] },
  { id: 'large-rect', w: 336, h: 280, platforms: ['google'] },
  { id: 'square-250', w: 250, h: 250, platforms: ['google'] },
  { id: 'leaderboard', w: 728, h: 90, platforms: ['google'] },
  { id: 'billboard', w: 970, h: 250, platforms: ['google'] },
  { id: 'mobile-banner', w: 320, h: 50, platforms: ['google'] },
  { id: 'large-mobile', w: 320, h: 100, platforms: ['google'] },
  { id: 'half-page', w: 300, h: 600, platforms: ['google'] },
  { id: 'wide-skyscraper', w: 160, h: 600, platforms: ['google'] },
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1')
      let rel = decodeURIComponent(url.pathname)
      if (rel === '/') rel = '/html/ad.html'
      const file = path.join(ROOT, rel)
      if (!file.startsWith(ROOT)) {
        res.writeHead(403)
        res.end()
        return
      }
      fs.readFile(file, (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end('not found')
          return
        }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
        res.end(data)
      })
    })
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port })
    })
  })
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

async function waitReady(page) {
  await page.waitForFunction(() => document.fonts && document.fonts.status === 'loaded')
  await page.waitForFunction(() => document.body.dataset.ready === '1')
  await page.waitForTimeout(120)
}

function previewHtml(rows) {
  const cards = rows
    .map(
      (r) => `
      <figure>
        <img src="${r.rel}" alt="${r.alt}" width="${Math.min(r.w, 360)}" />
        <figcaption>${r.alt}<br>${r.w}×${r.h}</figcaption>
      </figure>`
    )
    .join('\n')
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<title>Lighthief Ad Set — Off-Grid & Net Billing</title>
<style>
  :root { --navy:#1A365D; --gold:#C9A432; --grey:#404040; }
  body { font-family: "Segoe UI", system-ui, sans-serif; margin: 0; background: #F0F4F8; color: #000; }
  header { background: linear-gradient(135deg, #1A365D, #2B5FA0); color: #fff; padding: 32px 40px; }
  h1 { color: #C9A432; margin: 0 0 8px; }
  h2 { color: #C9A432; margin: 36px 40px 12px; }
  p { color: #d7e2ef; margin: 0; }
  nav { display: flex; flex-wrap: wrap; gap: 10px; padding: 20px 40px 0; }
  nav a { background: #fff; color: #1A365D; text-decoration: none; padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; }
  section { padding: 8px 40px 32px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
  figure { margin: 0; background: #fff; padding: 12px; border-radius: 10px; box-shadow: 0 2px 10px rgba(26,54,93,0.08); }
  img { width: 100%; height: auto; display: block; background: #eef2f6; }
  figcaption { font-size: 12px; color: #404040; margin-top: 8px; line-height: 1.4; }
</style>
</head><body>
<header>
  <h1>Lighthief ad set — September 2026</h1>
  <p>Off-grid and net billing · Meta + Google · A/B variants · ${rows.length} images</p>
</header>
<nav>
  <a href="#off-grid">Off-grid</a>
  <a href="#net-billing">Net billing</a>
  <a href="copy-sheet.csv">Copy sheet (CSV)</a>
</nav>
${['off-grid', 'net-billing']
  .map((product) => {
    const group = rows.filter((r) => r.product === product)
    const variants = [...new Set(group.map((r) => r.variant))]
    return `<section id="${product}">
      <h2>${product.replace('-', ' ')}</h2>
      ${variants
        .map((variant) => {
          const items = group.filter((r) => r.variant === variant)
          return `<h3 style="margin:16px 0 10px;color:#1A365D">${variant}</h3><div class="grid">${items
            .filter((r) => r.platform === 'meta' || (r.platform === 'google' && !r.shared))
            .map(
              (r) => `
        <figure>
          <img src="${r.rel}" alt="${r.alt}" />
          <figcaption>${r.alt}<br>${r.w}×${r.h} · ${r.platforms.join(' + ')}</figcaption>
        </figure>`
            )
            .join('')}</div>`
        })
        .join('')}
    </section>`
  })
  .join('')}
</body></html>`
}

async function main() {
  const { server, port } = await startServer()
  const browser = await chromium.launch()
  const context = await browser.newContext({ deviceScaleFactor: 1 })
  const page = await context.newPage()
  const rows = []

  const onlySize = process.argv.find((a) => a.startsWith('--size='))?.slice(7)
  const onlyCreative = process.argv.find((a) => a.startsWith('--creative='))?.slice(11)
  const creatives = onlyCreative ? CREATIVES.filter((c) => c.id === onlyCreative) : CREATIVES
  const sizes = onlySize ? SIZES.filter((s) => `${s.w}x${s.h}` === onlySize || s.id === onlySize) : SIZES

  for (const creative of creatives) {
    for (const size of sizes) {
      const key = `${size.w}x${size.h}`
      await page.setViewportSize({ width: size.w, height: size.h })
      await page.goto(`http://127.0.0.1:${port}/html/ad.html?c=${creative.id}&s=${key}`, {
        waitUntil: 'networkidle',
      })
      await waitReady(page)

      for (const platform of size.platforms) {
        const dir = path.join(EXPORT, platform, creative.product, creative.variant)
        ensureDir(dir)
        const filename = `${size.id}_${size.w}x${size.h}.png`
        const out = path.join(dir, filename)
        await page.screenshot({ path: out, type: 'png' })
        rows.push({
          platform,
          product: creative.product,
          variant: creative.variant,
          size: size.id,
          w: size.w,
          h: size.h,
          rel: `export/${platform}/${creative.product}/${creative.variant}/${filename}`,
          alt: `${creative.product} ${creative.variant} ${size.id}`,
          platforms: size.platforms,
          shared: size.platforms.length > 1 && platform === 'google',
        })
      }
      process.stdout.write(`ok  ${creative.id}  ${key}\n`)
    }
  }

  await browser.close()
  server.close()

  if (onlySize || onlyCreative) {
    console.log(`\nRendered ${rows.length} images (partial) → ${EXPORT}`)
    return
  }

  fs.writeFileSync(path.join(ROOT, 'preview.html'), previewHtml(rows))
  const manifest = {
    generated: new Date().toISOString().slice(0, 10),
    contact: {
      name: 'Alexander Papacosta',
      title: 'Cyprus Director',
      phone: '+357 99 164 158',
      email: 'office@lighthief.com',
      officePhone: '+357 77 77 00 50',
      website: 'solarfarms.cy',
      company: 'Lighthief Cyprus Ltd',
      companyNumber: 'HE 477423',
    },
    totals: { images: rows.length, creatives: CREATIVES.length, sizes: SIZES.length },
    files: rows,
  }
  fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\nRendered ${rows.length} images → ${EXPORT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
