import { prisma } from '@/lib/prisma'

export async function GET(){
  const d = new Date(); d.setHours(0,0,0,0)
  const today = await prisma.mealPlan.findUnique({ where: { date: d } })
  return Response.json({ today })
}