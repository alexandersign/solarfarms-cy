#!/usr/bin/env npx tsx
/**
 * Fail CI if el/ru messages drift from the English source of truth.
 * New public copy must be added to messages/en.json first, then translated.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(__dirname, '..')

function load(name: string): unknown {
  return JSON.parse(readFileSync(resolve(ROOT, 'messages', `${name}.json`), 'utf8'))
}

function flatten(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : []
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    flatten(child, prefix ? `${prefix}.${key}` : key)
  )
}

function main() {
  const enKeys = new Set(flatten(load('en')))
  let failed = false

  for (const locale of ['el', 'ru']) {
    const keys = new Set(flatten(load(locale)))
    const missing = [...enKeys].filter((key) => !keys.has(key))
    const extra = [...keys].filter((key) => !enKeys.has(key))

    if (missing.length || extra.length) {
      failed = true
      console.error(`\n[${locale}] message catalog does not match en.json`)
      if (missing.length) {
        console.error(`  Missing (${missing.length}):`)
        missing.forEach((key) => console.error(`    - ${key}`))
      }
      if (extra.length) {
        console.error(`  Extra (${extra.length}):`)
        extra.forEach((key) => console.error(`    - ${key}`))
      }
    } else {
      console.log(`[${locale}] ${keys.size} keys — in sync with en`)
    }
  }

  if (failed) {
    console.error('\nAdd the missing keys to every locale before shipping.')
    process.exit(1)
  }
}

main()
