'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, TrendingUp, Users, MoreVertical, ArrowUpRight } from 'lucide-react';

const CrmDashboard: React.FC = () => {
  const stats = [
    { name: 'Coletas confirmadas', value: '87', change: '+12%', icon: TrendingUp },
    { name: 'Veículos em trânsito', value: '214', change: '+18%', icon: Clock },
    { name: 'Entrega no prazo', value: '96%', change: '+4%', icon: CheckCircle },
    { name: 'Novos parceiros', value: '5', change: '+2%', icon: Users },
  ] as const;

  const chartData = [
    { label: 'Jan', rotas: 38, entregas: 32 },
    { label: 'Fev', rotas: 42, entregas: 37 },
    { label: 'Mar', rotas: 46, entregas: 41 },
    { label: 'Abr', rotas: 50, entregas: 45 },
    { label: 'Mai', rotas: 54, entregas: 48 },
    { label: 'Jun', rotas: 61, entregas: 57 },
  ];

  const supportTickets = [
    { id: 1, title: 'Atualizar janela de coleta VW Anchieta', status: 'Concluído' },
    { id: 2, title: 'Homologar rota Recife → Salvador', status: 'Em andamento' },
    { id: 3, title: 'Revisar checklist de caminhões cegonha', status: 'Em andamento' },
  ];

  const topCategories = [
    { id: 1, name: 'Montadoras', status: 'Fluxo estável' },
    { id: 2, name: 'Frotistas', status: 'Novas negociações' },
    { id: 3, name: 'Locadoras', status: 'Campanha ativa' },
  ];

  const maxChartValue = Math.max(
    ...chartData.map((item) => Math.max(item.rotas, item.entregas))
  );

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black uppercase tracking-tight leading-tight">
            Dashboard de Orçamentos
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Monitoramento diário das operações e oportunidades estratégicas da Gabardo.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-[#EEF2F8] p-8 rounded-3xl shadow-sm border border-[#D8DEE8] transform hover:-translate-y-1 transition-transform duration-300 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.3em]">{stat.name}</p>
                  <p className="mt-2 text-4xl font-bold text-gabardo-blue">{stat.value}</p>
                </div>
                <div className="bg-white text-gray-400 p-3 rounded-full border border-[#D8DEE8]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-2 text-gabardo-blue font-semibold">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          );})}
        </div>

        <div className="mt-12 grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight leading-tight">Visão operacional</h3>
                <p className="mt-2 text-sm text-gray-500">Rotas despachadas vs. Entregas concluídas</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gabardo-blue font-medium">
                <span className="inline-block h-3 w-3 rounded-full bg-gabardo-blue" />
                Rotas despachadas
              </div>
              <div className="flex items-center gap-2 text-gabardo-light-blue font-medium">
                <span className="inline-block h-3 w-3 rounded-full bg-gabardo-light-blue" />
                Entregas concluídas
              </div>
            </div>
            <div className="mt-10 flex items-end justify-between gap-4">
              {chartData.map((item, index) => {
                const rotasHeight = (item.rotas / maxChartValue) * 100;
                const entregasHeight = (item.entregas / maxChartValue) * 100;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
                    className="flex flex-col items-center gap-4 flex-1"
                  >
                    <div className="flex items-end gap-2 w-full justify-center h-40">
                      <span
                        className="w-7 rounded-full bg-gabardo-blue/80"
                        style={{ height: `${rotasHeight}%` }}
                      />
                      <span
                        className="w-7 rounded-full bg-gabardo-light-blue"
                        style={{ height: `${entregasHeight}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="rounded-3xl shadow-lg bg-gabardo-blue p-8 text-white flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-widest">Expansão</span>
              <h3 className="text-3xl font-bold leading-tight">
                Novo hub Gabardo aprovado em Paulínia (SP).
              </h3>
              <p className="text-sm text-white/85">
                Capacidade extra de 60 vagas/dia para veículos leves já disponível para agendamento de clientes estratégicos.
              </p>
            </div>
            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-white text-gabardo-blue px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors">
              Agendar operação piloto
            </button>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black uppercase tracking-tight leading-tight">Alertas operacionais</h3>
                <p className="mt-2 text-sm text-gray-500">Prioridades da central logística nas últimas 24h.</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-8 space-y-6">
              {supportTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{ticket.title}</p>
                    <p className="text-xs text-gray-500">Atualizado há 2h</p>
                  </div>
                  <span className={`inline-flex items-center gap-2 text-xs font-semibold ${ticket.status === 'Concluído' ? 'text-green-600' : 'text-gabardo-blue'}`}>
                    <CheckCircle className="w-4 h-4" />
                    {ticket.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black uppercase tracking-tight leading-tight">Carteira por segmento</h3>
                <p className="mt-2 text-sm text-gray-500">Como evolui o pipeline comercial por vertical.</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-8 space-y-6">
              {topCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                    <span className="text-xs text-gray-500">{category.status}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${index === 0 ? 'bg-gabardo-blue' : index === 1 ? 'bg-gabardo-light-blue' : 'bg-gray-400'}`}
                      style={{ width: `${65 - index * 12}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CrmDashboard;