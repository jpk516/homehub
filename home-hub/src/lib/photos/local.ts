import { promises as fs } from 'fs'
import path from 'path'
import { env } from '@/lib/env'

export async function getLocalPhotos(limit=50){
  try {
    const dir = env.LOCAL_PHOTO_DIR
    const entries = await fs.readdir(dir)
    const files = entries.filter(f=> /\.(jpg|jpeg|png|webp)$/i.test(f)).slice(0, limit)
    // Expose as /photos/.. via static route: bind-mount to /photos in container and add a rewrite in next.config if desired.
    return files.map(f=> `/photos/${encodeURIComponent(f)}`)
  } catch {
    return []
  }
}