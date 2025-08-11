'use client'
import useSWR from 'swr'

export default function ChoresView(){
  const fetcher = (u:string)=>fetch(u).then(r=>r.json())
  const { data, mutate } = useSWR('/api/chores', fetcher)
  const assignments = data?.assignments || []

  const complete = async (id:string)=>{
    await fetch('/api/chores', { method:'PATCH', body: JSON.stringify({ id }) })
    mutate()
  }

  return (
    <div className="space-y-3">
      {assignments.map((a:any)=> (
        <div key={a.id} className="flex items-center justify-between">
          <div>
            <div className="text-xl">{a.chore.title}</div>
            <div className="text-sm opacity-70">Due {new Date(a.dueDate).toLocaleDateString()}</div>
          </div>
          {!a.completed ? <button className="btn" onClick={()=>complete(a.id)}>Mark Done</button> : <span className="opacity-70">Done</span>}
        </div>
      ))}
      {!assignments.length && <div>No chores assigned today.</div>}
    </div>
  )
}