import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { AtSign, Plus, X } from "lucide-react";
import { ParticipantsProps } from "../guests";
import { Button } from "../button";
import useIsMobile from "../../utils/useIsMobile";

interface UpdateInviteProps {
  participants: ParticipantsProps[]
  closeGuestsModal: () => void
}

export function UpdateInvite({ participants, closeGuestsModal }: UpdateInviteProps) {
  const { tripId } = useParams();
  const [emailToInvite, setEmailToInvite] = useState<string>('')
  const invitedEmails = participants.map(participant => participant.email)
  const isMobile = useIsMobile()

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailToInvite.includes(email)) {
      return
    }

    setEmailToInvite(email)

    event.currentTarget.reset()
  }

  const handleConfirm = async () => {
    if (emailToInvite.length > 0) {
      invitedEmails.push(...emailToInvite);

      const updatedTrip = {
        email: emailToInvite
      }

      try {
        await api.post(`/trips/${tripId}/invites`, updatedTrip);
        closeGuestsModal();
        setEmailToInvite('');
        window.location.reload();
      } catch (error) {
        console.error("Erro ao atualizar convidados:", error);
      }
    }
  }


  return (
    <div className="fixed inset-0 bg-black/60 flex items-end md:items-center justify-center backdrop-blur-[8px] z-10">
      {isMobile ? (
        <div className="w-full py-5 px-6 shadow-shape bg-zinc-900 space-y-5 animate-slide">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Selecionar convidados</h2>
              <button>
                <X className="text-zinc-400" size={20} onClick={closeGuestsModal} />
              </button>
            </div>
            <p className="text-sm text-zinc-400 text-left">
              Os convidados irão receber e-mails para confirmar a participação na viagem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {emailToInvite.length > 0 && (
              <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{emailToInvite}</span>
                <button type="button" onClick={() => setEmailToInvite("")}>
                  <X className="text-zinc-400" size={16} />
                </button>
              </div>
            )}

            {invitedEmails.map(email => (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button" onClick={() => setEmailToInvite("")}>
                  <X className="text-zinc-400" size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <form onSubmit={addEmailToInvite} className="space-y-3" >
            <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
              <AtSign className="text-zinc-400" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Digite o e-mail do convidado"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <Button type="submit" variant="secondary">
              Convidar
              <Plus size={20} />
            </Button>
          </form>
          <Button onClick={handleConfirm} >
            Salvar Convidados
          </Button>
        </div>
      ) : (
        <div className="w-[540px] py-5 px-6 shadow-shape bg-zinc-900 rounded-xl space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Selecionar convidados</h2>
              <button>
                <X className="text-zinc-400" size={20} onClick={closeGuestsModal} />
              </button>
            </div>
            <p className="text-sm text-zinc-400 text-left">
              Os convidados irão receber e-mails para confirmar a participação na viagem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {emailToInvite.length > 0 && (
              <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{emailToInvite}</span>
                <button type="button" onClick={() => setEmailToInvite("")}>
                  <X className="text-zinc-400" size={16} />
                </button>
              </div>
            )}

            {invitedEmails.map(email => (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button" onClick={() => setEmailToInvite("")}>
                  <X className="text-zinc-400" size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <form onSubmit={addEmailToInvite} className="space-y-3" >
            <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
              <AtSign className="text-zinc-400" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Digite o e-mail do convidado"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <Button type="submit" variant="secondary">
              Convidar
              <Plus size={20} />
            </Button>
          </form>
          <Button onClick={handleConfirm} >
            Salvar Convidados
          </Button>
        </div>
      )}
    </div>
  )
}
