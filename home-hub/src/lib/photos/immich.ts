import { env } from '@/lib/env'

// Placeholder: implement Immich API fetch here once API details are confirmed.
// Strategy: If ALBUM_ID is provided, query the album for assets, map to public URLs.
// Otherwise, fetch recent/random assets. Fallback to local files if API call fails.

export async function getImmichPhotos(_limit=50): Promise<string[]> {
  if(!env.IMMICH_BASE_URL || !env.IMMICH_API_KEY) return []
  // TODO: Implement Immich asset list request using fetch with Bearer token
  // return array of image URLs accessible from the kiosk (e.g., proxied route)
  return []
}