import { prisma } from '../src/lib/prisma'

async function main(){
  const d = new Date(); d.setHours(0,0,0,0)
  await prisma.mealPlan.upsert({ where: { date: d }, update: {}, create: { date: d, breakfast: 'Omelets', lunch: 'Sandwiches', dinner: 'Tacos' }})

  const user = await prisma.user.upsert({ where: { id: 'demo' }, update: {}, create: { id: 'demo', name: 'Family' }})
  const chore = await prisma.chore.upsert({ where: { id: 'trash' }, update: {}, create: { id: 'trash', title: 'Take out trash', cadence: 'daily' }})
  await prisma.choreAssignment.create({ data: { choreId: chore.id, userId: user.id, dueDate: d }})

  await prisma.checklistItem.createMany({ data: [
    { title: 'Feed pets', date: d },
    { title: 'Start dishwasher', date: d },
    { title: 'Lock doors', date: d }
  ]})
}

main().then(()=>{ console.log('Seed OK'); process.exit(0)}).catch(e=>{ console.error(e); process.exit(1) })