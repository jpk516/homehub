'use client'
import { useEffect, useState } from 'react'
import PhotoSlideshow from './PhotoSlideshow'

const timeoutSeconds = Number(process.env.NEXT_PUBLIC_IDLE_TIMEOUT_SECONDS ?? 120)

export default function IdleManager(){
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    let timer: any
    const reset = () => { setIdle(false); clearTimeout(timer); timer = setTimeout(()=>setIdle(true), timeoutSeconds*1000) }
    ['mousemove','mousedown','touchstart','keydown'].forEach(ev=> window.addEventListener(ev, reset))
    reset()
    return () => ['mousemove','mousedown','touchstart','keydown'].forEach(ev=> window.removeEventListener(ev, reset))
  }, [])
  if(!idle) return null
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <PhotoSlideshow onExit={() => setIdle(false)} />
    </div>
  )
}