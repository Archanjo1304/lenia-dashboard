import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ────────────────────────────────────────────────────────────────────

export interface Feedback {
  id: number;
  data: string;
  id_aluno: number;
  nome_aluno: string;
  mensagem: string;
  materia_selecionada: string;
  sentimento: string;
  estrelas: number;
  acao: string;
  tipo_feedback: string;
  status_atendimento: string;
}

export interface AvaliacaoAula {
  id: number;
  nome_aluno: string;
  materia_selecionada: string;
  comentario: string;
  sentimento: string;
  estrelas: number;
  acao: string;
  data: string;
}

export interface FaqPergunta {
  id: number;
  nome_aluno: string;
  materia_selecionada: string;
  pergunta: string;
  resposta: string | null;
  status: string;
  data: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  tipo: string;
  email: string;
}

export interface Materia {
  id: number;
  codigo: string;
  nome: string;
  tipo: string;
  nome_professor: string;
  email_professor: string;
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getKPIs() {
  const { data, error } = await supabase.rpc("get_kpis").single();
  if (error) {
    // fallback: query manual
    const [f, av, faq, alertas] = await Promise.all([
      supabase.from("feedbacks").select("id, estrelas, acao, status_atendimento"),
      supabase.from("avaliacoes_aula").select("id"),
      supabase.from("faq_perguntas").select("id, status"),
      supabase.from("feedbacks").select("id").eq("acao", "ALERTA"),
    ]);

    const feedbacks = f.data ?? [];
    const mediaEstrelas =
      feedbacks.length > 0
        ? feedbacks.reduce((s, x) => s + (x.estrelas ?? 0), 0) / feedbacks.length
        : 0;

    return {
      total_feedbacks: feedbacks.length,
      media_estrelas: parseFloat(mediaEstrelas.toFixed(1)),
      total_alertas: (alertas.data ?? []).length,
      avaliacoes_aula: (av.data ?? []).length,
      faq_pendentes: (faq.data ?? []).filter((x) => x.status === "pendente").length,
      pendentes_atendimento: feedbacks.filter((x) => x.status_atendimento === "Pendente").length,
    };
  }
  return data;
}

export async function getSatisfacaoPorMateria() {
  const { data } = await supabase
    .from("feedbacks")
    .select("materia_selecionada, estrelas, sentimento, acao");

  if (!data) return [];

  const grouped: Record<string, { total: number; somaEstrelas: number; positivos: number; negativos: number; neutros: number; alertas: number }> = {};

  data.forEach((f) => {
    const m = f.materia_selecionada ?? "Desconhecida";
    if (!grouped[m]) grouped[m] = { total: 0, somaEstrelas: 0, positivos: 0, negativos: 0, neutros: 0, alertas: 0 };
    grouped[m].total++;
    grouped[m].somaEstrelas += f.estrelas ?? 0;
    if (f.sentimento === "positivo") grouped[m].positivos++;
    if (f.sentimento === "negativo") grouped[m].negativos++;
    if (f.sentimento === "neutro") grouped[m].neutros++;
    if (f.acao === "ALERTA") grouped[m].alertas++;
  });

  return Object.entries(grouped)
    .map(([materia, v]) => ({
      materia: materia.length > 35 ? materia.substring(0, 35) + "…" : materia,
      materiaFull: materia,
      media: parseFloat((v.somaEstrelas / v.total).toFixed(1)),
      total: v.total,
      positivos: v.positivos,
      negativos: v.negativos,
      neutros: v.neutros,
      alertas: v.alertas,
    }))
    .sort((a, b) => b.media - a.media);
}

export async function getDistribuicaoSentimentos() {
  const { data } = await supabase.from("feedbacks").select("sentimento");
  if (!data) return [];

  const counts: Record<string, number> = {};
  data.forEach((f) => {
    const s = f.sentimento ?? "neutro";
    counts[s] = (counts[s] ?? 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export async function getTendenciaMensal() {
  const { data } = await supabase
    .from("feedbacks")
    .select("data, estrelas, sentimento")
    .order("data", { ascending: true });

  if (!data) return [];

  const grouped: Record<string, { total: number; somaEstrelas: number; positivos: number; negativos: number }> = {};

  data.forEach((f) => {
    if (!f.data) return;
    const mes = f.data.substring(0, 7); // YYYY-MM
    if (!grouped[mes]) grouped[mes] = { total: 0, somaEstrelas: 0, positivos: 0, negativos: 0 };
    grouped[mes].total++;
    grouped[mes].somaEstrelas += f.estrelas ?? 0;
    if (f.sentimento === "positivo") grouped[mes].positivos++;
    if (f.sentimento === "negativo") grouped[mes].negativos++;
  });

  return Object.entries(grouped).map(([mes, v]) => ({
    mes,
    total: v.total,
    media: parseFloat((v.somaEstrelas / v.total).toFixed(1)),
    positivos: v.positivos,
    negativos: v.negativos,
  }));
}

export async function getAlertasPendentes() {
  const { data } = await supabase
    .from("feedbacks")
    .select("id, nome_aluno, materia_selecionada, mensagem, estrelas, data, status_atendimento")
    .eq("acao", "ALERTA")
    .order("data", { ascending: false })
    .limit(10);

  return data ?? [];
}

export async function getFaqPendentes() {
  const { data } = await supabase
    .from("faq_perguntas")
    .select("id, nome_aluno, materia_selecionada, pergunta, status, data")
    .eq("status", "pendente")
    .order("data", { ascending: false })
    .limit(8);

  return data ?? [];
}

export async function getAvaliacoesAula() {
  const { data } = await supabase
    .from("avaliacoes_aula")
    .select("id, nome_aluno, materia_selecionada, comentario, sentimento, estrelas, data")
    .order("data", { ascending: false })
    .limit(5);

  return data ?? [];
}
