"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";

interface Item { mes: string; total: number; media: number; positivos: number; negativos: number }
interface Props { data: Item[] }

const MESES: Record<string, string> = {
  "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr",
  "05": "Mai", "06": "Jun", "07": "Jul", "08": "Ago",
  "09": "Set", "10": "Out", "11": "Nov", "12": "Dez",
};

const formatMes = (mes: string) => {
  const [, m] = mes.split("-");
  return MESES[m] ?? mes;
};

export default function TrendChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-base font-bold text-slate-700 mb-4">📈 Tendência de Feedbacks por Mês</h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ left: 0, right: 20, top: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" tickFormatter={formatMes} tick={{ fontSize: 11 }} />
          <YAxis yAxisId="left"  tick={{ fontSize: 11 }} domain={[0, "auto"]} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 5]} />
          <Tooltip
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = { total: "Total de feedbacks", media: "Média de estrelas", positivos: "Positivos", negativos: "Negativos" };
              return [value, labels[name] ?? name];
            }}
            labelFormatter={formatMes}
          />
          <Legend
            formatter={(value) => {
              const labels: Record<string, string> = { total: "Total", media: "Média ⭐", positivos: "Positivos", negativos: "Negativos" };
              return labels[value] ?? value;
            }}
          />
          <ReferenceLine yAxisId="right" y={3} stroke="#ca8a04" strokeDasharray="5 5" label={{ value: "Meta 3★", position: "right", fontSize: 10, fill: "#ca8a04" }} />
          <Line yAxisId="left"  type="monotone" dataKey="total"    stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
          <Line yAxisId="right" type="monotone" dataKey="media"    stroke="#ca8a04" strokeWidth={2} dot={{ r: 4 }} />
          <Line yAxisId="left"  type="monotone" dataKey="positivos" stroke="#16a34a" strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 3 }} />
          <Line yAxisId="left"  type="monotone" dataKey="negativos" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
