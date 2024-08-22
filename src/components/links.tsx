import { Link2, Plus } from "lucide-react"
import { Button } from "./button"

export function ImportantsLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        <li className="list-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a className="text-xs text-zinc-400" href="https://www.airbnb.com.br/rooms/104700011">https://www.airbnb.com.br/rooms/104700011</a>
          </div>
          <Link2 className="text-zinc-400" size={20} />
        </li>

        <li className="list-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a className="text-xs text-zinc-400" href="https://www.airbnb.com.br/rooms/104700011">https://www.airbnb.com.br/rooms/104700011</a>
          </div>
          <Link2 className="text-zinc-400" size={20} />
        </li>

        <li className="list-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a className="text-xs text-zinc-400" href="https://www.airbnb.com.br/rooms/104700011">https://www.airbnb.com.br/rooms/104700011</a>
          </div>
          <Link2 className="text-zinc-400" size={20} />
        </li>

        <li className="list-none flex items-center justify-between">
          <div className="space-y-1">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a className="text-xs text-zinc-400" href="https://www.airbnb.com.br/rooms/104700011">https://www.airbnb.com.br/rooms/104700011</a>
          </div>
          <Link2 className="text-zinc-400" size={20} />
        </li>
      </div>

      <Button variant="secondary">
        <Plus size={20} />
        Cadastrar novo Link
      </Button>

    </div>
  )
}
