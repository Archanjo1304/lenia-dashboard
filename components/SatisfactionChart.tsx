"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts";

interface Item {
  materia: string;
  materiaFull: string;
  media: number;
  total: number;
  positivos: number;
  negativos: number;
  alertas: number;
}

interface Props { data: Item[] }

const getColor = (media: number) => {
  if (media >= 4)   return "#16a34a";
  if (media >= 3)   return "#ca8a04";
  if (media >= 2)   return "#ea580c";
  return "#dc2626";
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Item;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm max-w-xs">
      <p className="font-semibold text-slate-800 mb-1">{d.materiaFull}</p>
      <p>⭐ Média: <b>{d.media}</b> / 5</p>
      <p>📊 Total: <b>{d.total}</b> feedbacks</p>
      <p className="text-green-600">😊 Positivos: {d.positivos}</p>
      <p className="text-red-500">😞 Negativos: {d.negativos}</p>
      <p className="text-red-700">🚨 Alertas: {d.alertas}</p>
    </div>
  );
};

export default function SatisfactionChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-base font-bold text-slate-700 mb-4">⭐ Satisfação por Matéria</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40, top: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 5]} tickCount={6} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="materia" tick={{ fontSize: 10 }} width={140} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="media" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getColor(entry.media)} />
            ))}
            <LabelList dataKey="media" position="right" style={{ fontSize: 11, fontWeight: 700 }} formatter={(v: number) => `${v}★`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-3 text-xs text-slate-500 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600 inline-block"/>≥ 4.0 Ótimo</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-600 inline-block"/>≥ 3.0 Regular</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500 inline-block"/>≥ 2.0 Ruim</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-600 inline-block"/>&lt; 2.0 Crítico</span>
      </div>
    </div>
  );
}
