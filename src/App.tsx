import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "./components/button";

export function App() {
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

        <div className="">
          <div className="bg-zinc-900 p-4 rounded-xl space-y-3">
            <div className="space-y-2">
              <div className="h-[42px] flex items-center gap-2 flex-1">
                <MapPin className="text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Para onde?"
                  className="text-lg bg-transparent placeholder-zinc-400 outline-none w-full"
                />
              </div>
              <button className="h-[42px] flex items-center gap-2 flex-1 text-zinc-400 w-full">
                <CalendarDays size={20} />
                <span className="text-lg">
                  Quando?
                </span>
              </button>
            </div>
            <Button>
              Continuar
              <ArrowRight size={20} />
            </Button>
          </div>
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
