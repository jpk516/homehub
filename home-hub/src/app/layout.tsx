import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Home Hub',
  description: 'Kiosk for chores, checklists, meals, and calendars',
  manifest: '/manifest.webmanifest'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">
        {children}
      </body>
    </html>
  )
}