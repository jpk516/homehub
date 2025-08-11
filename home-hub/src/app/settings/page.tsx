import KioskShell from '@/components/KioskShell'
export default function Page(){
  return (
    <KioskShell>
      <div className="card space-y-4">
        <h2 className="text-2xl">Settings</h2>
        <p>Configure calendar accounts and photo sources in the <code>.env</code> and via future UI here.</p>
      </div>
    </KioskShell>
  )
}