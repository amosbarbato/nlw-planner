import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../components/button"

interface InviteGuestsProps {
  openGuestModal: () => void
  openConfirmTripModal: () => void
  emailsToInvite: string[]
}

export function InviteGuests({
  openGuestModal,
  openConfirmTripModal,
  emailsToInvite
}: InviteGuestsProps) {
  return (
    <div className="space-y-3">
      <div className="w-full h-px bg-zinc-800" />
      <button
        type="button"
        onClick={openGuestModal}
        className="h-[42px] flex items-center gap-2 flex-1 text-zinc-400 w-full"
      >
        <UserRoundPlus size={20} />
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight size={20} />
      </Button>
    </div >
  )
}
