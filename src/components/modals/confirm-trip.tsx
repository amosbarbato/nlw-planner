import { Mail, User, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../button"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center backdrop-blur-[8px]">
      <div className="w-full py-5 px-6 shadow-shape bg-zinc-900 space-y-5 animate-slide">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Confirmar criação de viagem</h2>
            <button>
              <X className="text-zinc-400" size={20} onClick={closeConfirmTripModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Para concluir a criação da viagem preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="space-y-2">
            <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
              <User size={20} className="text-zinc-400" />
              <input
                name="name"
                placeholder="Seu nome completo"
                className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
                onChange={event => setOwnerName(event.target.value)}
              />
            </div>
            <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Mail size={20} className="text-zinc-400" />
              <input
                name="email"
                type="email"
                placeholder="Seu e-mail pessoal"
                className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
                onChange={event => setOwnerEmail(event.target.value)}
              />
            </div>
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}
