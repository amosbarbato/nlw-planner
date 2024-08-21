import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../button"

interface InviteModalProps {
  closeGuestModal: () => void
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
}

export function InviteModal({
  closeGuestModal,
  emailsToInvite,
  addNewEmailToInvite,
  removeEmailFromInvites
}: InviteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center backdrop-blur-[8px]">
      <div className="w-full py-5 px-6 shadow-shape bg-zinc-900 space-y-5 animate-slide">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Selecionar convidados</h2>
            <button>
              <X className="text-zinc-400" size={20} onClick={closeGuestModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map(email => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button type="button">
                  <X
                    onClick={() => removeEmailFromInvites(email)}
                    className="text-zinc-400"
                    size={16}
                  />
                </button>
              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={addNewEmailToInvite}
          className="space-y-3"
        >
          <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
            <AtSign className="text-zinc-400" size={20} />
            <input
              name="email"
              type="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus size={20} />
          </Button>
        </form>

      </div>
    </div>
  )
}
