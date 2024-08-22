import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Link2, Tag, X } from "lucide-react";
import { Button } from "../button";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void
}

export function CreateLinkModal({
  closeCreateLinkModal
}: CreateLinkModalProps) {
  const { tripId } = useParams()

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center backdrop-blur-[8px] z-10">
      <div className="w-full py-5 px-6 shadow-shape bg-zinc-900 space-y-5 animate-slide">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Cadastrar link</h2>
            <button>
              <X className="text-zinc-400" size={20} onClick={closeCreateLinkModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="space-y-2">
            <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Tag className="text-zinc-400" size={20} />
              <input
                name="title"
                placeholder="Título do link"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <div className="p-4 flex items-center flex-1 gap-2 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Link2 className="text-zinc-400" size={20} />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>
          </div>

          <Button>
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}
