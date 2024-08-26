import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "./button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { UpdateInvite } from "./modals/update-invite";

export interface ParticipantsProps {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean | null
}

async function confirmParticipant(participantId: string) {
  await api.get(`/participants/${participantId}/confirm`)
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<ParticipantsProps[]>([])
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  function openGuestsModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestModalOpen(false)
  }

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await api.get(`/trips/${tripId}/participants`)
      setParticipants(response.data.participants)
    }
    fetchParticipants()
  }, [tripId])

  const handleConfirmParticipant = async (participantId: string) => {
    await confirmParticipant(participantId)

    const response = await api.get(`/trips/${tripId}/participants`)
    setParticipants(response.data.participants)
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Convidados</h2>

      <div className="space-y-5">

        {participants && participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index + 1}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>

              {participant.is_confirmed ? (
                <CheckCircle2
                  className="text-lime-300 hover:cursor-pointer" size={20}
                  onClick={() => handleConfirmParticipant(participant.id)}
                />
              ) : (
                <CircleDashed
                  className="text-zinc-400 hover:cursor-pointer" size={20}
                  onClick={() => handleConfirmParticipant(participant.id)}
                />
              )}
            </div>
          )
        })}

      </div>
      <Button variant="secondary" onClick={openGuestsModal}>
        <UserCog size={20} />
        Gerenciar convidados
      </Button>

      {isGuestModalOpen && (
        <UpdateInvite
          participants={participants}
          closeGuestsModal={closeGuestsModal}
        />
      )}
    </div>
  )
}
