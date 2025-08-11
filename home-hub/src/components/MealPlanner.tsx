'use client'
import useSWR from 'swr'

export default function MealPlanner(){
  const fetcher = (u:string)=>fetch(u).then(r=>r.json())
  const { data } = useSWR('/api/meals', fetcher)
  const meals = data?.today

  if(!meals) return <div>No meals planned for today.</div>
  return (
    <div className="grid grid-cols-3 gap-4 text-xl">
      <div><div className="opacity-70">Breakfast</div><div>{meals.breakfast || '—'}</div></div>
      <div><div className="opacity-70">Lunch</div><div>{meals.lunch || '—'}</div></div>
      <div><div className="opacity-70">Dinner</div><div>{meals.dinner || '—'}</div></div>
    </div>
  )
}