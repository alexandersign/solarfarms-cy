'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, BookOpen, AlertTriangle, Info } from 'lucide-react'
import { CrmHeader } from '@/components/crm/crm-header'
import {
  CRM_KB_SECTIONS,
  CRM_KB_BESS_IMAGE,
  CRM_KB_FOOTER,
  type CrmKbSection,
  type CrmKbTable,
} from '@/lib/crm-sales-knowledge'
import { CRM_KB_OFFERS_INDEX } from '@/lib/crm-kb-documents'

function KbTable({ table }: { table: CrmKbTable }) {
  return (
    <div className="mb-4 overflow-x-auto">
      {table.caption && (
        <p className="text-xs font-semibold text-[#404040] mb-2 flex items-center gap-2">
          {table.caption}
          {table.internalOnly && (
            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
              Internal only
            </span>
          )}
        </p>
      )}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 text-white text-xs font-semibold"
                style={{ background: '#1A365D' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell, j) => (
                <td key={j} className="border border-slate-200 px-3 py-2 text-[#404040] align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function KbSectionBlock({ section }: { section: CrmKbSection }) {
  const isOffers = section.id === 'offers-sent'

  return (
    <section id={section.id} className="scroll-mt-36 mb-10">
      <h2 className="text-lg font-bold mb-2" style={{ color: '#C9A432' }}>
        {section.title}
      </h2>
      {section.summary && (
        <p className="text-sm text-[#404040] mb-4">{section.summary}</p>
      )}

      {section.callouts?.map((c, i) => (
        <div
          key={i}
          className={`flex gap-2 text-sm rounded-lg px-3 py-2 mb-3 ${
            c.type === 'warning'
              ? 'bg-amber-50 border border-amber-200 text-amber-900'
              : 'bg-blue-50 border border-blue-200 text-[#1A365D]'
          }`}
        >
          {c.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{c.text}</span>
        </div>
      ))}

      {section.bullets && (
        <ul className="list-disc pl-5 text-sm text-[#404040] space-y-1.5 mb-4">
          {section.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {section.tables?.map((t, i) => (
        <KbTable key={i} table={t} />
      ))}

      {isOffers && (
        <ul className="space-y-2">
          {CRM_KB_OFFERS_INDEX.map((o) => (
            <li key={o.slug}>
              <a
                href={`/api/crm/kb/document?slug=${o.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2B5FA0] hover:underline"
              >
                {o.title}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-xs text-slate-500 ml-2">
                {o.client} · {o.type} · {o.date}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!isOffers &&
        section.links?.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#2B5FA0] hover:underline mr-4"
          >
            {link.label}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ))}
    </section>
  )
}

export default function CrmKnowledgePage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/crm/login?callbackUrl=/crm/knowledge')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        Loading…
      </div>
    )
  }

  if (status === 'unauthenticated') return null

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <CrmHeader activeNav="knowledge">
        <div className="bg-white border-b px-4 py-2">
          <div className="container mx-auto flex items-center gap-2 text-sm text-[#404040]">
            <BookOpen className="w-4 h-4 text-[#1A365D]" />
            <span>Internal sales reference — pricing, scope, offers. Not for client distribution.</span>
          </div>
        </div>
      </CrmHeader>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-52 shrink-0">
          <nav className="lg:sticky lg:top-32 bg-white rounded-lg border shadow-sm p-3">
            <p className="text-xs font-semibold text-[#1A365D] uppercase tracking-wide mb-2">
              Sections
            </p>
            <ul className="space-y-1">
              {CRM_KB_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-sm text-[#404040] hover:text-[#1A365D] py-1 px-2 rounded hover:bg-slate-100"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
            <div
              className="rounded-lg overflow-hidden mb-6 border"
              style={{ background: 'linear-gradient(135deg,#1A365D 0%,#2B5FA0 100%)' }}
            >
              <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 text-white">
                  <h1 className="text-xl font-bold mb-1" style={{ color: '#C9A432' }}>
                    Sales Knowledge Base
                  </h1>
                  <p className="text-sm text-blue-100">
                    PV O&M · BESS EPC · LTSA · EMS · bankability · offers sent
                  </p>
                </div>
                <div className="relative w-full md:w-64 h-40 rounded overflow-hidden bg-slate-800 shrink-0">
                  <Image
                    src={CRM_KB_BESS_IMAGE}
                    alt="Linyang BESS container — EVE LFP cell racks"
                    fill
                    className="object-cover"
                    sizes="256px"
                    priority
                  />
                </div>
              </div>
            </div>

            {CRM_KB_SECTIONS.map((section) => (
              <KbSectionBlock key={section.id} section={section} />
            ))}
          </div>

          <footer className="text-xs text-slate-500 pb-8 border-t pt-4">
            {CRM_KB_FOOTER.company} · {CRM_KB_FOOTER.reg} ·{' '}
            <Link href="https://solarfarms.cy" className="hover:underline">
              {CRM_KB_FOOTER.website}
            </Link>
          </footer>
        </main>
      </div>
    </div>
  )
}
