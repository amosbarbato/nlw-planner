import { format } from "date-fns/format"
import { ptBR } from "date-fns/locale"
import { CircleCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../lib/axios"

interface ActivitiesProps {
  date: string,
  activities: {
    id: string,
    title: string,
    occurs_at: string
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<ActivitiesProps[] | undefined>([])

  useEffect(() => {
    api.get(`trips/${tripId}/activities`)
      .then(response => { setActivities(response.data.activities) })
  }, [tripId])

  return (
    <ul className="space-y-8">

      {activities && activities?.map((category) => {
        return (
          <li key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(category.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(category.date, "EEEE", { locale: ptBR })}
              </span>
            </div>

            {category.activities.length > 0 ? (
              <div className="space-y-2.5">
                {category.activities.map((activity) => {
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 rounded-xl"
                    >
                      <div className="flex items-center gap-3 ">
                        <CircleCheck size={20} className="text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                      </div>
                      <span className="text-zinc-400 text-sm">
                        {format(activity.occurs_at, "HH':'mm")}h
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
            )}
          </li>
        )
      })}

    </ul>
  )
}
