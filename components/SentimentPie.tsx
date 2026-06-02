"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Item { name: string; value: number }
interface Props { data: Item[] }

const COLORS: Record<string, string> = {
  positivo: "#16a34a",
  neutro:   "#ca8a04",
  negativo: "#dc2626",
};

const LABELS: Record<string, string> = {
  positivo: "😊 Positivo",
  neutro:   "😐 Neutro",
  negativo: "😞 Negativo",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow p-2 text-sm">
      <p className="font-semibold">{LABELS[d.name] ?? d.name}</p>
      <p>{d.value} feedbacks ({d.payload.percent ? (d.payload.percent * 100).toFixed(1) : 0}%)</p>
    </div>
  );
};

export default function SentimentPie({ data }: Props) {
  const total = data.reduce((s, x) => s + x.value, 0);
  const dataWithPercent = data.map(d => ({ ...d, percent: total > 0 ? d.value / total : 0 }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-base font-bold text-slate-700 mb-4">🎭 Distribuição de Sentimentos</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={dataWithPercent} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
            {dataWithPercent.map((entry, i) => (
              <Cell key={i} fill={COLORS[entry.name] ?? "#94a3b8"} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {dataWithPercent.map((d) => (
          <div key={d.name} className="text-center">
            <div className="text-xl font-bold" style={{ color: COLORS[d.name] ?? "#94a3b8" }}>
              {d.value}
            </div>
            <div className="text-xs text-slate-500">{LABELS[d.name] ?? d.name}</div>
            <div className="text-xs font-medium" style={{ color: COLORS[d.name] ?? "#94a3b8" }}>
              {total > 0 ? ((d.value / total) * 100).toFixed(0) : 0}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
