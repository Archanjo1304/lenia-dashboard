"use client";

interface FAQ {
  id: number;
  nome_aluno: string;
  materia_selecionada: string;
  pergunta: string;
  status: string;
  data: string;
}

interface Props { data: FAQ[] }

export default function FAQTable({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-700">❓ FAQ — Perguntas Pendentes</h2>
        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
          {data.length} sem resposta
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-sm">Nenhuma pergunta pendente!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {data.map((faq) => (
            <div key={faq.id} className="border border-orange-100 bg-orange-50 rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700">{faq.nome_aluno}</p>
                  <p className="text-xs text-slate-500 truncate">{faq.materia_selecionada}</p>
                  <p className="text-xs text-slate-700 mt-1 italic line-clamp-3">&ldquo;{faq.pergunta}&rdquo;</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="bg-orange-200 text-orange-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    pendente
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(faq.data).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
