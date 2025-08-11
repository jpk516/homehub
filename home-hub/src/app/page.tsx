import KioskShell from '@/components/KioskShell'
import CalendarView from '@/components/CalendarView'
import ChecklistView from '@/components/ChecklistView'
import ChoresView from '@/components/ChoresView'
import MealPlanner from '@/components/MealPlanner'

export default function Page(){
  return (
    <KioskShell>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="card xl:col-span-2"><h2 className="text-2xl mb-4">Today’s Calendar</h2><CalendarView compact /></div>
        <div className="card"><h2 className="text-2xl mb-4">Daily Checklist</h2><ChecklistView /></div>
        <div className="card"><h2 className="text-2xl mb-4">Chores</h2><ChoresView /></div>
        <div className="card xl:col-span-2"><h2 className="text-2xl mb-4">Meal Plan</h2><MealPlanner /></div>
      </div>
    </KioskShell>
  )
}