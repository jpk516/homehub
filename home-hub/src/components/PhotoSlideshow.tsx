'use client'
import { useEffect, useState } from 'react'

export default function PhotoSlideshow({ onExit }: { onExit: ()=>void }){
  const [urls, setUrls] = useState<string[]>([])
  const [i, setI] = useState(0)

  useEffect(()=>{
    let mounted = true
    fetch('/api/photos/random?count=50').then(r=>r.json()).then(d=>{ if(mounted) setUrls(d.urls || []) })
    const esc = (e: KeyboardEvent)=>{ if(e.key==='Escape') onExit() }
    window.addEventListener('keydown', esc)
    return ()=>{ mounted = false; window.removeEventListener('keydown', esc) }
  },[onExit])

  useEffect(()=>{
    const t = setInterval(()=> setI(prev => (urls.length? (prev+1)%urls.length : 0)), 5000)
    return ()=> clearInterval(t)
  },[urls])

  if(!urls.length) return <div className="w-full h-full flex items-center justify-center">Loading photos…</div>
  return (
    <div className="w-full h-full" onClick={onExit}>
      <img src={urls[i]} alt="slideshow" className="w-full h-full object-contain" />
    </div>
  )
}