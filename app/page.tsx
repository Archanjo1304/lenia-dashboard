"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getKPIs, getSatisfacaoPorMateria, getDistribuicaoSentimentos,
  getTendenciaMensal, getAlertasPendentes, getFaqPendentes, getAvaliacoesAula,
} from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import KPICards from "@/components/KPICards";
import SatisfactionChart from "@/components/SatisfactionChart";
import SentimentPie from "@/components/SentimentPie";
import TrendChart from "@/components/TrendChart";
import AlertsTable from "@/components/AlertsTable";
import FAQTable from "@/components/FAQTable";
import RecentFeedbacks from "@/components/RecentFeedbacks";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const [kpis, setKpis] = useState<any>(null);
  const [satisfacao, setSatisfacao] = useState<any[]>([]);
  const [sentimentos, setSentimentos] = useState<any[]>([]);
  const [tendencia, setTendencia] = useState<any[]>([]);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState<any[]>([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [k, s, sent, tend, al, fq, av] = await Promise.all([
        getKPIs(),
        getSatisfacaoPorMateria(),
        getDistribuicaoSentimentos(),
        getTendenciaMensal(),
        getAlertasPendentes(),
        getFaqPendentes(),
        getAvaliacoesAula(),
      ]);

      // Recent feedbacks
      const { data: rf } = await supabase
        .from("feedbacks")
        .select("id, nome_aluno, materia_selecionada, mensagem, sentimento, estrelas, acao, data")
        .order("data", { ascending: false })
        .limit(8);

      setKpis(k);
      setSatisfacao(s);
      setSentimentos(sent);
      setTendencia(tend);
      setAlertas(al);
      setFaqs(fq);
      setRecentFeedbacks(rf ?? []);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    // Auto-refresh a cada 60 segundos
    const interval = setInterval(fetchAll, 60_000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-[#1a2e4a] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 rounded-lg w-9 h-9 flex items-center justify-center font-bold text-lg">L</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">LenIA</h1>
              <p className="text-xs text-blue-200">Dashboard de Gestão Acadêmica</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-blue-300">Última atualização</p>
              <p className="text-xs text-white font-medium">
                {lastUpdate.toLocaleTimeString("pt-BR")}
              </p>
            </div>
            <button
              onClick={fetchAll}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Atualizando...
                </>
              ) : (
                <> 🔄 Atualizar </>
              )}
            </button>
          </div>
        </div>
        {/* Subtitle bar */}
        <div className="bg-[#0f1e30] px-4 py-2 flex items-center gap-6 text-xs text-blue-300 max-w-7xl mx-auto overflow-x-auto">
          <span>📍 UNICESUMAR · Engenharia de Software · 2026</span>
          <span>🎓 5º Período · Noturno</span>
          <span>👥 Daniel · Gabriel · Lorena</span>
          <span>🤖 Análise de sentimento via Google Gemini</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {loading && !kpis ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <svg className="animate-spin w-10 h-10 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <p className="text-slate-500 text-sm">Carregando dados do Supabase...</p>
            </div>
          </div>
        ) : (
          <>
            {/* KPIs */}
            {kpis && <KPICards data={kpis} />}

            {/* Satisfação + Sentimentos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SatisfactionChart data={satisfacao} />
              </div>
              <div>
                <SentimentPie data={sentimentos} />
              </div>
            </div>

            {/* Tendência */}
            <TrendChart data={tendencia} />

            {/* Alertas + FAQ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AlertsTable data={alertas} />
              <FAQTable data={faqs} />
            </div>

            {/* Feedbacks recentes */}
            <RecentFeedbacks data={recentFeedbacks} />

            {/* Footer */}
            <footer className="text-center py-4 text-xs text-slate-400">
              <p>LenIA — Sistema de Feedback Acadêmico Inteligente · TCC UNICESUMAR 2026</p>
              <p className="mt-1">Dados em tempo real via Supabase · Auto-refresh a cada 60s</p>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
