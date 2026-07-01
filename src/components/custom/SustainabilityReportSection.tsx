'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const SustainabilityReportSection: React.FC = () => {
  return (
			<section className="py-16 md:py-20 lg:py-24 bg-white">
				<div className="container mx-auto px-4 md:px-8">
					<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#163049]/85 text-white p-10 text-center shadow-2xl backdrop-blur-md">
						<div className="absolute inset-0">
							<Image
								src="/images/photo-1661435036699-8686dbfc5304.jpg"
								alt="Rodovia em meio à natureza"
								fill
								className="object-cover opacity-30"
								priority={false}
							/>
						</div>
						<motion.div
							className="relative"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, ease: 'easeOut' }}
						>
							<h2 className="text-3xl md:text-4xl font-bold mb-4 text-gabardo-light-blue drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]">Política do Sistema de Gestão Integrado</h2>
							<p className="max-w-5xl mx-auto text-lg leading-relaxed text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] mb-0">
								Prestar serviço de transporte e logística, para montadoras, importadoras e concessionárias, autorizadas em toda América Latina, de forma segura e sustentável, com o intuito de atender os requisitos das partes interessadas, mantendo compromisso com a proteção ao meio ambiente, redução da
								poluição e segurança viária, atendimento à requisitos legais aplicáveis, empenhando-se para estar à frente das necessidades de nossos clientes, buscando a melhoria contínua do nosso sistema de gestão integrado e de seus profissionais.
							</p>
							{/*		<button
								disabled
								className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg bg-gabardo-light-blue/80 text-white shadow-xl shadow-gabardo-blue/40 border border-white/15 transition-transform duration-300 disabled:opacity-95 disabled:cursor-not-allowed"
							>
								<Download className="w-5 h-5" />
								Download do Relatório (Em Breve)
							</button> */}
						</motion.div>
					</div>
				</div>
			</section>
		);
};

export default SustainabilityReportSection;