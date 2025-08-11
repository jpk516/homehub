export function mergeEvents(...lists: HubEvent[][]): HubEvent[]{
  const map = new Map<string, HubEvent>()
  for(const list of lists){
    for(const e of list){ map.set(`${e.id}`, e) }
  }
  return Array.from(map.values()).sort((a,b)=> new Date(a.start).getTime() - new Date(b.start).getTime())
}