import { Calendar, CalendarRange, Info, MapPin, Plus } from "lucide-react";
import { Button } from "../components/button";
import { Activities } from "../components/activies";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreateActiveModal } from "../components/modals/create-activity";
import { ImportantsLinks } from "../components/links";
import { Guests } from "../components/guests";
import useIsMobile from "../utils/useIsMobile";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function TripPage() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState("atividades")

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(response => { setTrip(response.data.trip) })
  }, [tripId])

  const displayedDate = trip
    ? format(trip.starts_at, "d ' de ' LLL.", { locale: ptBR })
      .concat(' a ')
      .concat(format(trip.ends_at, "d ' de ' LLL.", { locale: ptBR }))
    : null

  return (
    <>

      {isMobile ? (
        <div>
          <main className="p-5 mx-auto mb-24">
            <div className="space-y-5">

              <div className="px-4 h-16 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-zinc-400" />
                  <span className="text-zinc-100 capitalize text-sm">{trip?.destination}</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-zinc-400" />
                    <span className="text-zinc-100 text-sm">{displayedDate}</span>
                  </div>
                </div>
              </div>

              {activeTab === "atividades" ? (
                <section className="gap-16">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Atividades</h2>
                      <Button size="plus" onClick={openCreateActivityModal}>
                        <Plus size={20} />
                        Nova Atividade
                      </Button>
                    </div>
                    <Activities />
                  </div>
                </section>
              ) : (
                <section className="space-y-6">
                  <ImportantsLinks />
                  <div className="border-b border-zinc-800" />
                  <Guests />
                </section>
              )}
            </div>
          </main>
          <div className="fixed bottom-0 w-full p-5 pt-16 bg-gradient-to-t from-black">
            <div className="p-3 bg-zinc-900 rounded-xl flex gap-2">
              <Button
                variant={`${activeTab === "atividades" ? "primary" : "secondary"}`}
                onClick={() => setActiveTab("atividades")}
              >
                <CalendarRange size={20} />
                Atividades
              </Button>
              <Button
                variant={`${activeTab === "detalhes" ? "primary" : "secondary"}`}
                onClick={() => setActiveTab("detalhes")}
              >
                <Info size={20} />
                Detalhes
              </Button>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-[85%] my-10 space-y-8">
            <div className="px-4 h-16 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-zinc-400" />
                <span className="text-zinc-100 capitalize text-sm md:text-lg">{trip?.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-zinc-400" />
                  <span className="text-zinc-100 text-sm md:text-lg">{displayedDate}</span>
              </div>
            </div>

            <main className="flex gap-16 px-6">
              <article className="w-[65%] space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[32px] font-semibold">Atividades</h2>
                  <Button size="button" onClick={openCreateActivityModal}>
                    <Plus size={20} />
                    Nova Atividade
                  </Button>
                </div>
                <Activities />
              </article>
              <aside className="w-[30%] space-y-6">
                <ImportantsLinks />
                <div className="border-b border-zinc-800" />
                <Guests />
              </aside>
            </main>
          </div>
        </div>
      )
      }


      {
        isCreateActivityModalOpen && (
          <CreateActiveModal
            closeCreateActivityModal={closeCreateActivityModal}
          />
        )
      }

    </>
  )
}
