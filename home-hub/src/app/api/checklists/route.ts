import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(){
  const start = new Date(); start.setHours(0,0,0,0)
  const end = new Date(); end.setHours(23,59,59,999)
  const items = await prisma.checklistItem.findMany({ where: { date: { gte: start, lte: end }}, orderBy: { title: 'asc' } })
  return Response.json({ items })
}

export async function PATCH(req: NextRequest){
  const { id } = await req.json()
  const item = await prisma.checklistItem.update({ where: { id }, data: { done: { set: true }}})
  return Response.json({ ok: true, item })
}