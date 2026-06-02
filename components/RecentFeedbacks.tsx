"use client";

interface Feedback {
  id: number;
  nome_aluno: string;
  materia_selecionada: string;
  mensagem: string;
  sentimento: string;
  estrelas: number;
  acao: string;
  data: string;
}

interface Props { data: Feedback[] }

const SENT_BADGE: Record<string, string> = {
  positivo: "bg-green-100 text-green-700",
  neutro:   "bg-yellow-100 text-yellow-700",
  negativo: "bg-red-100 text-red-700",
};

const SENT_LABEL: Record<string, string> = {
  positivo: "😊 Positivo",
  neutro:   "😐 Neutro",
  negativo: "😞 Negativo",
};

export default function RecentFeedbacks({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-base font-bold text-slate-700 mb-4">💬 Feedbacks Recentes</h2>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {data.map((fb) => (
          <div key={fb.id} className="border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-semibold text-slate-700">{fb.nome_aluno}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SENT_BADGE[fb.sentimento] ?? "bg-slate-100 text-slate-600"}`}>
                    {SENT_LABEL[fb.sentimento] ?? fb.sentimento}
                  </span>
                  {fb.acao === "ALERTA" && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">🚨 ALERTA</span>
                  )}
                  {fb.acao === "ELOGIO" && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">🌟 ELOGIO</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{fb.materia_selecionada}</p>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{fb.mensagem}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-yellow-500">{"★".repeat(fb.estrelas)}{"☆".repeat(5 - fb.estrelas)}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(fb.data).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
