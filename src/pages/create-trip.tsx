import { FormEvent, useState } from "react"
import { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"
import { api } from "../lib/axios"
import InputLocalAndDate from "../context/local-date"
import { InviteGuests } from "../context/invite-guests"
import { InviteModal } from "../components/modals/invite"
import { ConfirmTripModal } from "../components/modals/confirm-trip"
import useIsMobile from "../utils/useIsMobile"

export function CreateTripPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

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

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    )

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length == 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <main className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center ">
      <div className="max-w-3xl w-full px-6 text-center space-y-8 md:flex md:flex-col md:items-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/logo.svg"
            alt="plann.er"
            className="w-2/4 md:h-11"
          />
          <p className="text-zinc-400 text-lg max-md:w-[90%]">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl space-y-3 shadow-shape md:flex md:items-center md:space-y-0 md:justify-between md:flex-1 md:w-[780px]">
          <InputLocalAndDate
            openGuestInput={openGuestInput}
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          <div className="md:hidden">
            {isGuestInputOpen && (
              <InviteGuests
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestModal={openGuestModal}
              />
            )}
          </div>
        </div>

        {isGuestInputOpen && (
          <InviteGuests
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={openConfirmTripModal}
            openGuestModal={openGuestModal}
          />
        )}

        <p className="text-zinc-500 text-sm md:w-[490px]">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos
          <a href="#" className="text-zinc-300"> termos de uso</a> e 
          <a href="#" className="text-zinc-300"> políticas de privacidade</a>.
        </p>

      </div>

      {isGuestModalOpen && (
        <InviteModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </main>
  )
}
