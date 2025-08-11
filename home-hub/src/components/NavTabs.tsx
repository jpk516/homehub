'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: 'Dashboard' },
  { href: '/chores', label: 'Chores' },
  { href: '/checklists', label: 'Checklists' },
  { href: '/meals', label: 'Meals' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/settings', label: 'Settings' }
]

export default function NavTabs() {
  const pathname = usePathname()
  return (
    <nav className="grid grid-cols-3 gap-3 p-4 bg-zinc-950">
      {tabs.map(t => (
        <Link key={t.href} href={t.href} className={`tab text-center text-lg ${pathname===t.href?'tab-active':''}`}>{t.label}</Link>
      ))}
    </nav>
  )
}