import { ReactNode } from 'react'
import NavTabs from './NavTabs'
import IdleManager from './IdleManager'

export default function KioskShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full grid grid-rows-[auto,1fr]">
      <IdleManager />
      <NavTabs />
      <main className="p-6 overflow-auto">{children}</main>
    </div>
  )
}