# LenIA — Dashboard de Gestão Acadêmica

Dashboard em tempo real para o sistema de feedback acadêmico LenIA.
Conectado ao Supabase · Deploy no Vercel · Auto-refresh a cada 60s

---

## 🚀 Deploy (Lorena — siga esses passos)

### Pré-requisitos
- Conta no [GitHub](https://github.com) (gratuita)
- Conta no [Vercel](https://vercel.com) (gratuita)

---

### Passo 1 — Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `lenia-dashboard`
3. Deixa **Privado** (Private)
4. Clica em **Create repository**

---

### Passo 2 — Subir os arquivos

Na tela do repositório vazio, clique em **"uploading an existing file"** e faça upload de toda a pasta `lenia-dashboard`.

Ou, se tiver Git instalado, na pasta do projeto:
```bash
git init
git add .
git commit -m "feat: dashboard inicial LenIA"
git remote add origin https://github.com/SEU_USUARIO/lenia-dashboard.git
git push -u origin main
```

---

### Passo 3 — Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) → **Log in with GitHub**
2. Clica em **"Add New Project"**
3. Seleciona o repositório `lenia-dashboard`
4. Em **Environment Variables**, adiciona:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://ucjwibjtnvrowzvrnzze.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (chave que está no arquivo `.env.local`)
5. Clica em **Deploy**

✅ Em ~2 minutos o dashboard estará no ar com URL tipo:
`https://lenia-dashboard-xxx.vercel.app`

---

### Passo 4 — Domínio personalizado (opcional)

No Vercel → Settings → Domains → adicionar `lenia.seudominio.com`

---

## 🖥️ Rodando localmente (para desenvolvimento)

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 📊 O que o dashboard mostra

| Seção | Descrição |
|---|---|
| KPIs | Total de feedbacks, média de estrelas, alertas, FAQ pendentes |
| Satisfação por Matéria | Ranking com média de estrelas por disciplina |
| Distribuição de Sentimentos | Pizza com % positivo/neutro/negativo |
| Tendência Mensal | Evolução dos feedbacks ao longo do semestre |
| Alertas Pendentes | Feedbacks negativos que precisam de atenção |
| FAQ Pendentes | Perguntas dos alunos sem resposta |
| Feedbacks Recentes | Últimos 8 feedbacks recebidos |

---

## 🔄 Atualização dos dados

- O dashboard atualiza automaticamente a cada **60 segundos**
- Botão **🔄 Atualizar** no header para refresh manual
- Dados vêm diretamente do Supabase (sempre ao vivo)

---

## 📁 Estrutura do projeto

```
lenia-dashboard/
├── app/
│   ├── layout.tsx      # Layout raiz
│   ├── page.tsx        # Página principal (dashboard)
│   └── globals.css     # Estilos globais
├── components/
│   ├── KPICards.tsx        # Cards de indicadores
│   ├── SatisfactionChart.tsx  # Gráfico de barras por matéria
│   ├── SentimentPie.tsx    # Gráfico pizza de sentimentos
│   ├── TrendChart.tsx      # Linha de tendência mensal
│   ├── AlertsTable.tsx     # Tabela de alertas
│   ├── FAQTable.tsx        # Tabela de FAQ
│   └── RecentFeedbacks.tsx # Feedbacks recentes
├── lib/
│   └── supabase.ts     # Cliente Supabase + queries
├── .env.local          # Variáveis de ambiente (NÃO commitar!)
└── package.json
```

---

## ⚠️ Importante

- O arquivo `.env.local` **não deve ser commitado** no GitHub (já está no .gitignore)
- As variáveis de ambiente devem ser configuradas no Vercel (Passo 3)
- O banco de dados é o projeto `nexus01` no Supabase

---

*LenIA · TCC UNICESUMAR 2026 · Daniel Fernando · Gabriel Archanjo · Lorena Andrade*
