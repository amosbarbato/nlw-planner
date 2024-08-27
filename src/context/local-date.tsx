import { ArrowRight, CalendarDays, MapPin, Settings2, X } from "lucide-react"
import { Button } from "../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"

interface LocalAndDateProps {
  isGuestInputOpen: boolean
  closeGuestInput: () => void
  openGuestInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

function InputLocalAndDate({
  openGuestInput,
  closeGuestInput,
  isGuestInputOpen,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: LocalAndDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d 'de' LLL", { locale: ptBR })
      .concat(' a ')
      .concat(format(eventStartAndEndDates.to, "d 'de' LLL", { locale: ptBR }))
    : null

  return (
    <>
      <div className="max-md:space-y-2 md:flex md:space-x-5 md:items-center md:w-[500px]">
        <div className="h-[42px] flex items-center gap-2 flex-1">
          <MapPin className="text-zinc-400" size={20} />
          <input
            disabled={isGuestInputOpen}
            type="text"
            placeholder="Para onde?"
            className="text-lg bg-transparent placeholder-zinc-400 outline-none max-md:w-full"
            onChange={event => setDestination(event.target.value)}
          />
        </div>
        <button
          onClick={openDatePicker}
          disabled={isGuestInputOpen}
          className="h-[42px] flex items-center gap-2 max-md:flex-1 text-zinc-400 w-full md:w-fit"
        >
          <CalendarDays size={20} />
          <span className="text-lg">
            {displayDate || 'Quando?'}
          </span>
        </button>

      </div>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[90%] md:w-[28%] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    className="text-zinc-400"
                    size={20}
                    onClick={closeDatePicker}
                  />
                </button>
              </div>
            </div>
            <DayPicker
              locale={ptBR}
              mode="range"
              showOutsideDays={true}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              classNames={{
                month_grid: `w-full mt-2`,
                nav: `space-x-4 items-center absolute`,
                button_next: `w-7 h-7 border border-zinc-700 hover:bg-zinc-700 rounded-md`,
                button_previous: `w-7 h-7 border border-zinc-700 hover:bg-zinc-700 rounded-md`,
                month_caption: `text-end text-xl capitalize`,
                weekdays: `flex gap`,
                weekday: `h-12 w-12 flex items-end justify-center uppercase`,
                weeks: `space-y-2`,
                week: `flex gap`,
                day: `h-12 w-12 flex justify-center`,
                selected: `bg-lime-300 text-lime-950 font-bold`,
                range_start: `rounded-l-lg`,
                range_middle: `rounded-none`,
                range_end: `rounded-r-lg`,
                outside: `opacity-30 bg-zinc-900`,
                disabled: `opacity-30`
              }}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 border-l border-zinc-800 max-md:hidden mx-5" />

      {isGuestInputOpen ? (
        <Button size="button" onClick={closeGuestInput} variant="secondary">
          Alterar local/data
          <Settings2 size={20} />
        </Button>
      ) : (
          <Button size="button" onClick={openGuestInput}>
            Continuar
          <ArrowRight size={20} />
        </Button>
      )}

    </>
  )
}

export default InputLocalAndDate