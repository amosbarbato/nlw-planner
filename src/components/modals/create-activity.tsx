import { FormEvent } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../button"
import useIsMobile from "../../utils/useIsMobile"

interface CreateActiveModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActiveModal({
  closeCreateActivityModal
}: CreateActiveModalProps) {
  const { tripId } = useParams()
  const isMobile = useIsMobile()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end md:items-center justify-center backdrop-blur-[8px] z-10">
      {isMobile ? (
        <div className="w-full py-5 px-6 shadow-shape bg-zinc-900 space-y-5 animate-slide">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Cadastrar atividade</h2>
              <button>
                <X className="text-zinc-400" size={20} onClick={closeCreateActivityModal} />
              </button>
            </div>
            <p className="text-sm text-zinc-400 text-left">
              Todos convidados podem visualizar as atividades.
            </p>
          </div>

          <form onSubmit={createActivity} className="space-y-3">
            <div className="space-y-2">
              <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Tag className="text-zinc-400" size={20} />
                <input
                  name="title"
                  placeholder="Qual a atividade?"
                  className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Calendar className="text-zinc-400" size={20} />
                <input
                  type="datetime-local"
                  name="occurs_at"
                  placeholder="Qual a atividade?"
                  className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                />
              </div>
            </div>

            <Button>
              Salvar atividade
            </Button>
          </form>

        </div>
      ) : (
        <div className="w-[540px] py-5 px-6 shadow-shape bg-zinc-900 rounded-xl space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Cadastrar atividade</h2>
              <button>
                <X className="text-zinc-400" size={20} onClick={closeCreateActivityModal} />
              </button>
            </div>
            <p className="text-sm text-zinc-400 text-left">
              Todos convidados podem visualizar as atividades.
            </p>
          </div>

          <form onSubmit={createActivity} className="space-y-3">
            <div className="space-y-2">
              <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Tag className="text-zinc-400" size={20} />
                <input
                  name="title"
                  placeholder="Qual a atividade?"
                  className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Calendar className="text-zinc-400" size={20} />
                <input
                  type="datetime-local"
                  name="occurs_at"
                  placeholder="Qual a atividade?"
                  className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                />
              </div>
            </div>

            <Button>
              Salvar atividade
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
