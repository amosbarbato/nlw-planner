import { useState } from "react";
import InputLocalAndDate from "./context/local-date";
import { DateRange } from "react-day-picker";
import { InviteGuests } from "./context/invite-guests";

export function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [destination, setDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([])

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  return (
    <main className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center ">
      <div className="max-w-3xl w-full px-6 text-center space-y-8">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/logo.svg"
            alt="plann.er"
            className="w-2/4"
          />
          <p className="text-zinc-400 text-lg w-[90%]">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl space-y-3 shadow-shape">
          <InputLocalAndDate
            openGuestInput={openGuestInput}
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestInputOpen && (
            <InviteGuests
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos
          <a href="#" className="text-zinc-300"> termos de uso</a>
          <a href="#" className="text-zinc-300"> políticas de privacidade</a>.
        </p>

      </div>
    </main>
  )
}
