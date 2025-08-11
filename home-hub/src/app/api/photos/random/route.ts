import { getImmichPhotos } from '@/lib/photos/immich'
import { getLocalPhotos } from '@/lib/photos/local'

export async function GET(request: Request){
  const { searchParams } = new URL(request.url)
  const count = Number(searchParams.get('count') || 50)

  let urls = await getImmichPhotos(count)
  if(!urls.length){
    urls = await getLocalPhotos(count)
  }
  return Response.json({ urls })
}