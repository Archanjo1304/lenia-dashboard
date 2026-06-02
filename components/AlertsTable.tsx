"use client";

interface Alert {
  id: number;
  nome_aluno: string;
  materia_selecionada: string;
  mensagem: string;
  estrelas: number;
  data: string;
  status_atendimento: string;
}

interface Props { data: Alert[] }

const Stars = ({ n }: { n: number }) => (
  <span>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < n ? "text-yellow-400" : "text-slate-200"}>★</span>
    ))}
  </span>
);

export default function AlertsTable({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-700">🚨 Alertas Pendentes</h2>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
          {data.filter(d => d.status_atendimento === "Pendente").length} pendentes
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-sm">Nenhum alerta pendente!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {data.map((alert) => (
            <div key={alert.id} className="border border-red-100 bg-red-50 rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{alert.nome_aluno}</p>
                  <p className="text-xs text-slate-500 truncate">{alert.materia_selecionada}</p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{alert.mensagem}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Stars n={alert.estrelas} />
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(alert.data).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  alert.status_atendimento === "Pendente"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {alert.status_atendimento}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
