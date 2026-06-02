"use client";

interface KPI {
  total_feedbacks: number;
  media_estrelas: number;
  total_alertas: number;
  avaliacoes_aula: number;
  faq_pendentes: number;
  pendentes_atendimento: number;
}

interface Props { data: KPI }

function Card({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${color}`}>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function KPICards({ data }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(data.media_estrelas) ? "text-yellow-400" : "text-slate-200"}>★</span>
  ));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card label="Total de Feedbacks" value={data.total_feedbacks}         color="border-blue-500"   sub="feedbacks gerais" />
      <Card label="Média de Estrelas"  value={data.media_estrelas}           color="border-yellow-400" sub="escala 1–5" />
      <Card label="Alertas Gerados"    value={data.total_alertas}            color="border-red-500"    sub="feedbacks negativos" />
      <Card label="Aval. de Aulas"     value={data.avaliacoes_aula}          color="border-purple-500" sub="avaliações específicas" />
      <Card label="FAQ Pendentes"      value={data.faq_pendentes}            color="border-orange-400" sub="sem resposta" />
      <Card label="Pendentes Atenção"  value={data.pendentes_atendimento}    color="border-slate-400"  sub="não atendidos" />
    </div>
  );
}
