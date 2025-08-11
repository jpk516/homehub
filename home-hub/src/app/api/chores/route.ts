import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(){
  const todayStart = new Date(); todayStart.setHours(0,0,0,0)
  const todayEnd = new Date(); todayEnd.setHours(23,59,59,999)
  const assignments = await prisma.choreAssignment.findMany({
    where: { dueDate: { gte: todayStart, lte: todayEnd } },
    include: { chore: true }
  })
  return Response.json({ assignments })
}

export async function PATCH(req: NextRequest){
  const { id } = await req.json()
  const updated = await prisma.choreAssignment.update({ where: { id }, data: { completed: true, completedAt: new Date() }})
  return Response.json({ ok: true, updated })
}