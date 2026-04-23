#!/usr/bin/env tsx
/**
 * wp-lighthief-sync.ts
 * ─────────────────────────────────────────────────────────────
 * WordPress REST API sync tool for lighthief.cy ONLY.
 * NOT for solarfarms.cy (Next.js — different project entirely).
 *
 * Credentials live in .env.lighthief.local (gitignored).
 * Copy .env.lighthief.local.example → .env.lighthief.local to set up.
 *
 * Usage:
 *   npx tsx scripts/wp-lighthief-sync.ts list-pages
 *   npx tsx scripts/wp-lighthief-sync.ts list-posts
 *   npx tsx scripts/wp-lighthief-sync.ts push-page bess-systems
 *   npx tsx scripts/wp-lighthief-sync.ts push-all
 *   npx tsx scripts/wp-lighthief-sync.ts upload-media <path/to/image.jpg>
 *   npx tsx scripts/wp-lighthief-sync.ts new-post <path/to/post.html> "Post Title"
 *   npx tsx scripts/wp-lighthief-sync.ts info
 *
 * Or via npm (after adding scripts to package.json):
 *   npm run wp:list
 *   npm run wp:push -- bess-systems
 *   npm run wp:push-all
 */

import * as fs   from 'fs'
import * as path from 'path'

// ─── Load .env.lighthief.local ────────────────────────────────
function loadEnv() {
  const envFile = path.join(process.cwd(), '.env.lighthief.local')
  if (!fs.existsSync(envFile)) {
    console.error('❌  .env.lighthief.local not found.')
    console.error('    Copy .env.lighthief.local.example → .env.lighthief.local and fill in credentials.')
    process.exit(1)
  }
  const lines = fs.readFileSync(envFile, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv()

const WP_URL  = (process.env.WP_LH_URL || '').replace(/\/$/, '')
const WP_USER = process.env.WP_LH_USER || ''
const WP_PASS = (process.env.WP_LH_APP_PASSWORD || '').replace(/\s/g, '')

if (!WP_URL || !WP_USER || !WP_PASS) {
  console.error('❌  Missing WP_LH_URL, WP_LH_USER or WP_LH_APP_PASSWORD in .env.lighthief.local')
  process.exit(1)
}

// ─── Auth header ─────────────────────────────────────────────
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
const API  = `${WP_URL}/wp-json/wp/v2`

// ─── Page manifest ───────────────────────────────────────────
// Maps page keys → { local file, WP slug, WP title, parent slug? }
// Add new pages here as you create them.
const PAGES: Record<string, PageDef> = {
  'bess-systems': {
    file:   'lighthief-cyprus/website/bess-systems/bess-page.html',
    slug:   'bess-systems',
    title:  'Battery Energy Storage Systems',
    status: 'publish',
  },
  // ── future pages ──
  // 'commercial': {
  //   file:   'lighthief-cyprus/website/commercial/commercial-page.html',
  //   slug:   'commercial-bess',
  //   title:  'Commercial BESS Solutions',
  //   status: 'publish',
  // },
}

interface PageDef {
  file:     string
  slug:     string
  title:    string
  status:   'publish' | 'draft' | 'private'
  parentId?: number
}

// ─── Helpers ─────────────────────────────────────────────────
async function wpFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API}${endpoint}`
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: AUTH,
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`WP API error ${res.status} ${res.statusText}: ${text.slice(0, 300)}`)
  }
  return res.json() as Promise<any>
}

/** Find a WP page by slug. Returns the page object or null. */
async function findPageBySlug(slug: string): Promise<any | null> {
  const results = await wpFetch(`/pages?slug=${encodeURIComponent(slug)}&per_page=1`)
  return Array.isArray(results) && results.length > 0 ? results[0] : null
}

/** Find a WP post by slug. Returns the post object or null. */
async function findPostBySlug(slug: string): Promise<any | null> {
  const results = await wpFetch(`/posts?slug=${encodeURIComponent(slug)}&per_page=1`)
  return Array.isArray(results) && results.length > 0 ? results[0] : null
}

/** Strip <html>/<head>/<body> wrapper — keep only inner content for Code Module. */
function extractBody(html: string): string {
  // If the file has a <body> tag, extract the body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  if (bodyMatch) return bodyMatch[1].trim()
  return html.trim()
}

/** Read and prepare content from a local HTML file. */
function readHtmlFile(filePath: string): string {
  const abs = path.join(process.cwd(), filePath)
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${abs}`)
  return fs.readFileSync(abs, 'utf8')
}

function truncate(s: string, n = 60) { return s.length > n ? s.slice(0, n) + '…' : s }
function pad(s: string, n: number) { return String(s).padEnd(n) }

// ─── Commands ─────────────────────────────────────────────────

/** list-pages: show all pages on lighthief.cy */
async function listPages() {
  console.log(`\n📄  Pages on ${WP_URL}\n`)
  let page = 1
  let total = 0
  while (true) {
    const results: any[] = await wpFetch(`/pages?per_page=100&page=${page}&orderby=title&order=asc`)
    if (!results.length) break
    for (const p of results) {
      const status = p.status === 'publish' ? '🟢' : p.status === 'draft' ? '🟡' : '⚪'
      console.log(`  ${status}  ${pad(String(p.id), 6)} ${pad(p.slug, 32)} ${truncate(p.title?.rendered || '', 50)}`)
    }
    total += results.length
    if (results.length < 100) break
    page++
  }
  console.log(`\n  Total: ${total} pages\n`)
}

/** list-posts: show all posts on lighthief.cy */
async function listPosts() {
  console.log(`\n📝  Posts on ${WP_URL}\n`)
  let page = 1
  let total = 0
  while (true) {
    const results: any[] = await wpFetch(`/posts?per_page=100&page=${page}&orderby=date&order=desc`)
    if (!results.length) break
    for (const p of results) {
      const status = p.status === 'publish' ? '🟢' : p.status === 'draft' ? '🟡' : '⚪'
      const date = p.date?.slice(0, 10) || ''
      console.log(`  ${status}  ${pad(String(p.id), 6)} ${pad(date, 12)} ${pad(p.slug, 32)} ${truncate(p.title?.rendered || '', 44)}`)
    }
    total += results.length
    if (results.length < 100) break
    page++
  }
  console.log(`\n  Total: ${total} posts\n`)
}

/** push-page <key>: create or update a page from the manifest */
async function pushPage(key: string) {
  const def = PAGES[key]
  if (!def) {
    console.error(`❌  Unknown page key: "${key}"`)
    console.error(`    Available keys: ${Object.keys(PAGES).join(', ')}`)
    process.exit(1)
  }

  console.log(`\n🔄  Pushing page: "${def.title}" (slug: ${def.slug})`)
  console.log(`    Source: ${def.file}`)

  const rawHtml = readHtmlFile(def.file)
  // Keep the full HTML including <style> — wrap in raw HTML block for Divi Code Module
  const content = rawHtml

  const existing = await findPageBySlug(def.slug)

  if (existing) {
    console.log(`    Found existing page ID: ${existing.id} — updating…`)
    await wpFetch(`/pages/${existing.id}`, {
      method: 'POST',
      body: JSON.stringify({
        title:   def.title,
        content: content,
        status:  def.status,
        slug:    def.slug,
      }),
    })
    console.log(`✅  Updated: ${WP_URL}/${def.slug}/`)
  } else {
    console.log(`    No existing page found — creating new…`)
    const created = await wpFetch('/pages', {
      method: 'POST',
      body: JSON.stringify({
        title:   def.title,
        content: content,
        status:  def.status,
        slug:    def.slug,
        ...(def.parentId ? { parent: def.parentId } : {}),
      }),
    })
    console.log(`✅  Created: ${WP_URL}/${def.slug}/  (ID: ${created.id})`)
  }
}

/** push-all: push every page in the manifest */
async function pushAll() {
  const keys = Object.keys(PAGES)
  console.log(`\n🚀  Pushing ${keys.length} page(s) to ${WP_URL}\n`)
  let ok = 0; let fail = 0
  for (const key of keys) {
    try {
      await pushPage(key)
      ok++
    } catch (err: any) {
      console.error(`❌  Failed [${key}]: ${err.message}`)
      fail++
    }
  }
  console.log(`\n  Done — ${ok} succeeded, ${fail} failed\n`)
}

/** upload-media <filePath>: upload an image to WP Media Library */
async function uploadMedia(filePath: string) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
  if (!fs.existsSync(abs)) {
    console.error(`❌  File not found: ${abs}`)
    process.exit(1)
  }

  const fileName = path.basename(abs)
  const ext = path.extname(abs).toLowerCase().slice(1)
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    pdf: 'application/pdf',
  }
  const mime = mimeMap[ext] || 'application/octet-stream'
  const fileBuffer = fs.readFileSync(abs)

  console.log(`\n📤  Uploading: ${fileName} (${mime}, ${(fileBuffer.length / 1024).toFixed(1)} KB)`)

  const res = await fetch(`${API}/media`, {
    method: 'POST',
    headers: {
      Authorization: AUTH,
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': mime,
    },
    body: fileBuffer,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upload failed ${res.status}: ${text.slice(0, 300)}`)
  }

  const media = await res.json() as any
  console.log(`✅  Uploaded: ${media.source_url}`)
  console.log(`    Media ID: ${media.id}`)
  console.log(`    Use in Divi Image module or as src= in your HTML`)
  return media
}

/** new-post <filePath> "Title": create a new draft blog post */
async function newPost(filePath: string, title: string) {
  const rawHtml = readHtmlFile(filePath)
  const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  console.log(`\n📝  Creating draft post: "${title}"`)
  const existing = await findPostBySlug(slugBase)
  if (existing) {
    const ans = `Post with slug "${slugBase}" already exists (ID ${existing.id}). Updating content.`
    console.log(`    ⚠️  ${ans}`)
    await wpFetch(`/posts/${existing.id}`, {
      method: 'POST',
      body: JSON.stringify({ title, content: rawHtml, status: 'draft' }),
    })
    console.log(`✅  Updated draft: ${WP_URL}/?p=${existing.id}`)
  } else {
    const created = await wpFetch('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content: rawHtml,
        status:  'draft',
        slug:    slugBase,
      }),
    })
    console.log(`✅  Draft created (ID: ${created.id}): ${WP_URL}/?p=${created.id}`)
    console.log(`    Edit in WP Admin: ${WP_URL}/wp-admin/post.php?post=${created.id}&action=edit`)
  }
}

/** info: test connection and show site info */
async function info() {
  console.log(`\n🔍  Connecting to ${WP_URL}…`)
  const site = await wpFetch('/../') // /wp-json/ root
  const me   = await wpFetch('/users/me')
  console.log(`\n  ✅  Connected`)
  console.log(`  Site:    ${site.name || WP_URL}`)
  console.log(`  User:    ${me.name} (ID: ${me.id}, roles: ${(me.roles || []).join(', ')})`)

  const pageCount = await wpFetch('/pages?per_page=1')
  const postCount = await wpFetch('/posts?per_page=1')
  console.log(`\n  Pages in manifest: ${Object.keys(PAGES).length}`)
  console.log(`  Manifest keys:     ${Object.keys(PAGES).join(', ')}`)
  console.log()
}

function printUsage() {
  console.log(`
  lighthief.cy WordPress Sync — lighthief.cy ONLY (not solarfarms.cy)
  ─────────────────────────────────────────────────────────────────────
  Commands:

    info                           Test connection + show site info
    list-pages                     List all pages on lighthief.cy
    list-posts                     List all posts on lighthief.cy

    push-page <key>                Push a page from the manifest
                                   Keys: ${Object.keys(PAGES).join(', ')}
    push-all                       Push all pages in the manifest

    upload-media <file>            Upload an image/PDF to WP Media Library
    new-post <file> "<Title>"      Create a new draft blog post

  Setup:
    1. Copy .env.lighthief.local.example → .env.lighthief.local
    2. Fill in WP_LH_USER and WP_LH_APP_PASSWORD
       (Generate app password: WP Admin → Users → Profile → Application Passwords)
    3. npm run wp:info

  Adding a new page:
    1. Create HTML in lighthief-cyprus/website/<name>/<name>-page.html
    2. Add an entry to the PAGES manifest in this script
    3. npm run wp:push -- <key>
  `)
}

// ─── CLI entry ────────────────────────────────────────────────
const [cmd, arg1, arg2] = process.argv.slice(2)

;(async () => {
  try {
    switch (cmd) {
      case 'info':         await info();                              break
      case 'list-pages':   await listPages();                         break
      case 'list-posts':   await listPosts();                         break
      case 'push-page':
        if (!arg1) { console.error('❌  Usage: push-page <key>'); process.exit(1) }
        await pushPage(arg1)
        break
      case 'push-all':     await pushAll();                           break
      case 'upload-media':
        if (!arg1) { console.error('❌  Usage: upload-media <file>'); process.exit(1) }
        await uploadMedia(arg1)
        break
      case 'new-post':
        if (!arg1 || !arg2) { console.error('❌  Usage: new-post <file> "<Title>"'); process.exit(1) }
        await newPost(arg1, arg2)
        break
      default:
        printUsage()
    }
  } catch (err: any) {
    console.error(`\n❌  ${err.message}\n`)
    process.exit(1)
  }
})()
