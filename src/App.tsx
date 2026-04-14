/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, 
  ChevronRight, 
  Smartphone, 
  ShieldCheck, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Info,
  Layers,
  Users,
  Zap,
  Gift,
  TrendingUp
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

// Constants based on the proposal
const PDC_MONTHLY = 5872;
const AL_YEAR_1_MONTHLY = 4500;
const AL_YEAR_2_PLUS_MONTHLY = 5000;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function App() {
  const [years, setYears] = useState(5);

  const chartData = useMemo(() => {
    const data = [];
    let pdcTotal = 0;
    let alTotal = 0;

    for (let m = 0; m <= years * 12; m++) {
      if (m > 0) {
        pdcTotal += PDC_MONTHLY;
        const alMonthly = m <= 12 ? AL_YEAR_1_MONTHLY : AL_YEAR_2_PLUS_MONTHLY;
        alTotal += alMonthly;
      }
      
      if (m % 6 === 0) {
        data.push({
          month: m === 0 ? 'Início' : `${m}m`,
          pdc: pdcTotal,
          al: alTotal,
          savings: pdcTotal - alTotal,
        });
      }
    }
    return data;
  }, [years]);

  const stats = useMemo(() => {
    const y1Savings = (PDC_MONTHLY - AL_YEAR_1_MONTHLY) * 12;
    const y2PlusSavings = (PDC_MONTHLY - AL_YEAR_2_PLUS_MONTHLY) * 12;
    const totalSavings = y1Savings + (y2PlusSavings * (years - 1));
    const freeMonthsY1 = y1Savings / PDC_MONTHLY;
    const freeMonthsY2 = y2PlusSavings / PDC_MONTHLY;
    const totalFreeMonths = totalSavings / PDC_MONTHLY;

    return {
      y1Savings,
      y2PlusSavings,
      totalSavings,
      freeMonthsY1,
      freeMonthsY2,
      totalFreeMonths
    };
  }, [years]);

  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans">
      {/* Header */}
      <header className="h-20 px-10 flex justify-between items-center border-b border-border bg-card shrink-0">
        <div className="text-2xl font-extrabold text-primary tracking-tighter">AgenciaLINK</div>
        <div className="text-right">
          <h1 className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Proposta Estratégica</h1>
          <p className="font-semibold text-text-main">Adriano | Brazil Health</p>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 grid grid-cols-[320px_1fr] gap-6 p-6 lg:px-10 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex flex-col gap-5 overflow-y-auto pr-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm text-center border-l-4 border-l-accent"
          >
            <div className="text-[10px] uppercase text-text-muted font-bold mb-1">Economia no 1º Ano</div>
            <div className="text-3xl font-black text-accent">{formatCurrency(stats.y1Savings).split(',')[0]}</div>
            <div className="text-xs text-text-muted mt-1 font-medium">Redução imediata de 23%</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm text-center border-l-4 border-l-primary"
          >
            <div className="text-[10px] uppercase text-text-muted font-bold mb-1">Economia Recorrente</div>
            <div className="text-3xl font-black text-primary">{formatCurrency(stats.y2PlusSavings).split(',')[0]}</div>
            <div className="text-xs text-text-muted mt-1 font-medium">Garantida a partir do 13º mês</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-highlight p-5 rounded-2xl border border-[#bbf7d0] text-center space-y-1"
          >
            <div className="text-xs font-bold text-[#166534]">Equivale a</div>
            <div className="text-5xl font-black text-accent leading-none py-2">{stats.totalFreeMonths.toFixed(1)}</div>
            <div className="text-xs font-bold text-[#166534] uppercase tracking-tight">MENSALIDADES GRÁTIS*</div>
            <div className="text-[10px] text-text-muted mt-2 font-medium italic">*Acumulado em {years} anos</div>
          </motion.div>

          {/* Interactive Slider */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
              <span>Horizonte de Tempo</span>
              <span className="text-primary">{years} Anos</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={years} 
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          {/* Opening Unmissable Offer Block */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                <Zap size={14} className="text-yellow-400" />
                Oferta Imperdível
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black leading-tight">
                  Transformação Digital e Financeira <br />
                  <span className="text-highlight">Exclusiva para Saúde+</span>
                </h2>
                <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
                  Proposta estratégica com negociação diferenciada via indicação <span className="font-bold text-white">Marcelo Reina (Brazil Health)</span>. 
                  Foco em economia real imediata e residual, com tecnologia de ponta para escala.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { icon: <TrendingDown size={18} />, label: 'Economia Forte', desc: 'R$ 16k no 1º ano' },
                  { icon: <Smartphone size={18} />, label: 'App White Label', desc: 'Sem custo adicional' },
                  { icon: <Layers size={18} />, label: 'B2Cor Promo', desc: 'Condição Especial' },
                  { icon: <Zap size={18} />, label: 'Versão Pro', desc: 'Full para todos' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                    <div className="text-highlight mb-1">{item.icon}</div>
                    <div className="text-[10px] font-black uppercase tracking-tight">{item.label}</div>
                    <div className="text-xs text-blue-100">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Comparison Table Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm"
          >
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingDown size={16} className="text-accent" />
              Projeção de Fluxo de Caixa
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-2 text-[10px] text-text-muted uppercase font-bold">Período</th>
                    <th className="text-left py-3 px-2 text-[10px] text-text-muted uppercase font-bold">Valor Mensal</th>
                    <th className="text-left py-3 px-2 text-[10px] text-text-muted uppercase font-bold">Economia Mensal</th>
                    <th className="text-left py-3 px-2 text-[10px] text-text-muted uppercase font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-4 px-2 text-sm font-medium">Cenário Atual (PDC)</td>
                    <td className="py-4 px-2 text-sm text-text-muted">{formatCurrency(PDC_MONTHLY)}</td>
                    <td className="py-4 px-2 text-sm text-text-muted">-</td>
                    <td className="py-4 px-2 text-[10px] font-bold text-text-muted uppercase">Custo Base</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 text-sm font-medium">1º ao 12º Mês</td>
                    <td className="py-4 px-2 text-sm font-bold text-primary">{formatCurrency(AL_YEAR_1_MONTHLY)}</td>
                    <td className="py-4 px-2 text-sm font-black text-accent">{formatCurrency(PDC_MONTHLY - AL_YEAR_1_MONTHLY)}</td>
                    <td className="py-4 px-2">
                      <span className="bg-blue-100 text-primary text-[9px] font-black px-2 py-0.5 rounded uppercase">Promocional</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 text-sm font-medium">A partir do 13º Mês</td>
                    <td className="py-4 px-2 text-sm font-bold text-primary">{formatCurrency(AL_YEAR_2_PLUS_MONTHLY)}</td>
                    <td className="py-4 px-2 text-sm font-black text-accent">{formatCurrency(PDC_MONTHLY - AL_YEAR_2_PLUS_MONTHLY)}</td>
                    <td className="py-4 px-2">
                      <span className="bg-emerald-100 text-accent text-[9px] font-black px-2 py-0.5 rounded uppercase">Recorrente</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Chart Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm h-[300px]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                Acúmulo de Capital
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <span className="text-[9px] font-bold text-text-muted uppercase">PDC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[9px] font-bold text-text-muted uppercase">AgenciaLINK</span>
                </div>
              </div>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e40af" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                    tickFormatter={(value) => `R$ ${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Area type="monotone" dataKey="pdc" stroke="#e2e8f0" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="al" stroke="#1e40af" fillOpacity={1} fill="url(#colorAl)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Value Added Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-1">Diferenciais de Valor</h3>
                <p className="text-xs text-text-muted">Por que a AgenciaLINK é a escolha estratégica superior:</p>
              </div>
              <div className="bg-highlight px-3 py-1 rounded-full text-[10px] font-bold text-[#166534] uppercase tracking-wider">
                Valor Agregado {">"} Preço
              </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left py-3 px-4 text-[10px] text-text-muted uppercase font-bold rounded-tl-xl">Recurso / Benefício</th>
                    <th className="text-center py-3 px-4 text-[10px] text-primary uppercase font-black">AgenciaLINK</th>
                    <th className="text-center py-3 px-4 text-[10px] text-text-muted uppercase font-bold rounded-tr-xl">Concorrente (PDC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 px-4 text-xs font-semibold text-text-main">Simulador de Saúde</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-accent font-bold text-xs">
                        <CheckCircle2 size={14} /> Profissional (Full)
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-text-muted">Standard / Limitado</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-xs font-semibold text-text-main">App Mobile Personalizado</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-accent font-bold text-xs">
                        <CheckCircle2 size={14} /> White Label Incluso
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-text-muted">Não Disponível</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-xs font-semibold text-text-main">Integração CRM (B2Cor)</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-primary font-bold text-xs">
                        <ArrowUpRight size={14} /> Condição Promocional
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-text-muted">Manual / Inexistente</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-xs font-semibold text-text-main">Suporte e Treinamento</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-accent font-bold text-xs">
                        <CheckCircle2 size={14} /> Dedicado + Online
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-text-muted">Reativo / Ticket</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Detailed Subsections */}
            <div className="grid grid-cols-3 gap-6">
              {/* App Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                    <Smartphone size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-text-main">Simulador Profissional (App White Label)</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    'Divulgamos a sua Marca no lugar da Nossa!',
                    'Sua marca própria nas lojas Android e iOS',
                    'Acesso à versão MAIS PROFISSIONAL para todos os usuários',
                    'Sem custo adicional de desenvolvimento ou manutenção',
                    'Diferencial significativo para atrair e reter corretores',
                    'Cotações ultra-rápidas em apenas 2 passos',
                    'Compartilhamento instantâneo via WhatsApp, E-mail ou PDF'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-text-muted leading-tight">
                      <div className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CRM Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-accent rounded-xl flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-text-main">B2Cor CRM (Condição Promocional)</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    'Condição promocional para uso do CRM integrado',
                    'Gestão centralizada de leads e funil',
                    'Qualificação automatizada de leads',
                    'Gestão centralizada de dados dos clientes',
                    'Automação de propostas e acompanhamento',
                    'Sincronização imediata com o simulador'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-text-muted leading-tight">
                      <div className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SivCOR Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-text-main">Migração SivCOR (Promoção)</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    '70% de desconto no setup (R$ 20k → R$ 6k)',
                    'Pagamento: R$ 3k à vista + R$ 3k (30 dias)',
                    'Carência total: 1ª mensalidade GRÁTIS',
                    'Sistema de gestão completo e integrado'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-text-muted leading-tight">
                      <div className="mt-1 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[100px] px-10 bg-text-main text-white flex items-center justify-between shrink-0">
        <div className="flex items-baseline gap-3">
          <div className="text-xs opacity-70 font-medium">Economia Total Acumulada ({years} anos):</div>
          <div className="text-4xl font-black text-[#4ade80]">{formatCurrency(stats.totalSavings)}</div>
        </div>
        <div className="text-[10px] opacity-60 italic max-w-[350px] text-right leading-relaxed">
          Condições diferenciadas viabilizadas pela indicação de Marcelo Reina. O valor da AgenciaLINK permanece abaixo do concorrente PDC em todo o ciclo de vida.
        </div>
      </footer>
    </div>
  );
}
