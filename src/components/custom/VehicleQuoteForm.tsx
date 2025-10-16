'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader, ArrowRight, ArrowLeft } from 'lucide-react';

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1979 + 1 }, (_, index) => String(currentYear - index));

const parseVehicleValue = (value: string) => {
  if (!value) {
    return NaN;
  }

  const normalized = value
    .replace(/[\sR$]/gi, '')
    .replace(/\./g, '')
    .replace(',', '.');

  return Number(normalized);
};

const sanitizeCep = (value: string) => value.replace(/\D/g, '').slice(0, 8);

const formatCep = (digits: string) => (digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits);

type CepType = 'origin' | 'destination';

const addressFieldMap = {
  origin: {
    cep: 'originCep',
    state: 'originState',
    city: 'originCity',
    address: 'originAddress',
    neighborhood: 'originNeighborhood',
  },
  destination: {
    cep: 'destinationCep',
    state: 'destinationState',
    city: 'destinationCity',
    address: 'destinationAddress',
    neighborhood: 'destinationNeighborhood',
  },
} as const;

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  vehicleCategory: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleValue: string;
  vehicleObservation: string;
  originCep: string;
  originState: string;
  originCity: string;
  originAddress: string;
  originNeighborhood: string;
  destinationState: string;
  destinationCity: string;
  destinationCep: string;
  destinationAddress: string;
  destinationNeighborhood: string;
  routeObservation: string;
  message: string;
  privacyAccepted: boolean;
};

const initialFormData: QuoteFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  vehicleCategory: '',
  vehicleBrand: '',
  vehicleModel: '',
  vehicleYear: '',
  vehicleValue: '',
  vehicleObservation: '',
  originCep: '',
  originState: '',
  originCity: '',
  originAddress: '',
  originNeighborhood: '',
  destinationState: '',
  destinationCity: '',
  destinationCep: '',
  destinationAddress: '',
  destinationNeighborhood: '',
  routeObservation: '',
  message: '',
  privacyAccepted: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mocked vehicle types based on Transportes Gabardo services
const vehicleTypes = [
  'Automóvel de Passeio',
  'SUV / Utilitário',
  'Pick-up',
  'Van',
  'Caminhão Leve',
  'Caminhão Médio',
  'Caminhão Pesado',
  'Máquina Agrícola',
  'Trator',
  'Ônibus',
  'Micro-ônibus',
  'Veículo Especial',
  'Motocicleta',
];

// Mocked vehicle brands
const vehicleBrands = [
  'Audi',
  'BMW',
  'Chevrolet',
  'Citroën',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Jeep',
  'Kia',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Peugeot',
  'Renault',
  'Toyota',
  'Volkswagen',
  'Volvo',
  'Outros',
];

// Brazilian states
const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

// Vehicle models by brand
const vehicleModelsByBrand: Record<string, string[]> = {
  'Audi': ['A3', 'A4', 'A5', 'A6', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
  'BMW': ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5', 'X6', 'iX3'],
  'Chevrolet': ['Onix', 'Tracker', 'Spin', 'S10', 'Montana', 'Cruze', 'Equinox'],
  'Citroën': ['C3', 'C4 Cactus', 'Aircross', 'Jumper'],
  'Fiat': ['Argo', 'Mobi', 'Toro', 'Strada', 'Pulse', 'Fastback', 'Ducato'],
  'Ford': ['Ka', 'EcoSport', 'Ranger', 'Bronco Sport', 'Maverick', 'Transit'],
  'Honda': ['City', 'Civic', 'HR-V', 'CR-V', 'Accord', 'WR-V'],
  'Hyundai': ['HB20', 'Creta', 'Tucson', 'Santa Fe', 'ix35', 'Palisade'],
  'Jeep': ['Renegade', 'Compass', 'Commander', 'Wrangler', 'Grand Cherokee'],
  'Kia': ['Picanto', 'Sportage', 'Sorento', 'Seltos', 'Carnival'],
  'Mercedes-Benz': ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC', 'GLE', 'Sprinter'],
  'Mitsubishi': ['L200', 'Pajero', 'Eclipse Cross', 'ASX'],
  'Nissan': ['Versa', 'Kicks', 'Sentra', 'Frontier', 'X-Trail'],
  'Peugeot': ['208', '2008', '3008', 'Partner', 'Expert'],
  'Renault': ['Kwid', 'Sandero', 'Duster', 'Oroch', 'Captur', 'Kardian'],
  'Toyota': ['Corolla', 'Hilux', 'SW4', 'RAV4', 'Yaris', 'Corolla Cross'],
  'Volkswagen': ['Gol', 'Polo', 'Virtus', 'Nivus', 'T-Cross', 'Taos', 'Amarok', 'Saveiro'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'V60'],
  'Outros': ['Outro modelo'],
};

const VehicleQuoteForm: React.FC = () => {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1: {
        if (!formData.name || !formData.email || !formData.phone) {
          return 'Preencha os dados de contato obrigatórios.';
        }
        if (!emailRegex.test(formData.email)) {
          return 'Informe um e-mail válido.';
        }
        const digits = formData.phone.replace(/\D/g, '');
        if (digits.length < 10) {
          return 'Informe um telefone com DDD.';
        }
        return null;
      }
      case 2: {
        if (!formData.vehicleCategory || !formData.vehicleBrand || !formData.vehicleModel || !formData.vehicleYear || !formData.vehicleValue) {
          return 'Preencha todas as informações do veículo.';
        }
        if (!yearOptions.includes(formData.vehicleYear)) {
          return 'Selecione um ano válido para o veículo.';
        }
        const value = parseVehicleValue(formData.vehicleValue);
        if (!Number.isFinite(value) || value <= 0) {
          return 'Informe o valor do veículo corretamente.';
        }
        return null;
      }
      case 3: {
        if (!formData.originState || !formData.originCity || !formData.destinationState || !formData.destinationCity) {
          return 'Informe origem e destino completos.';
        }
        if (!formData.privacyAccepted) {
          return 'Você precisa aceitar a política de privacidade.';
        }
        return null;
      }
      default:
        return null;
    }
  };

  const validateAllSteps = () => {
    for (let current = 1; current <= 3; current += 1) {
      const message = validateStep(current);
      if (message) {
        return { step: current, message };
      }
    }
    return null;
  };

  // Fetch address from CEP using BrasilAPI
  const fetchAddressFromCEP = async (cep: string, type: 'origin' | 'destination') => {
    // Remove any non-digit characters
    const cleanCep = cep.replace(/\D/g, '');
    
    // Only fetch if CEP has exactly 8 digits
    if (cleanCep.length !== 8) return;

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
      
      if (!response.ok) {
        console.error('CEP não encontrado');
        return;
      }

      const data = await response.json();
      
      // Update form data with the address information
      if (type === 'origin') {
        setFormData((prev) => ({
          ...prev,
          originState: data.state,
          originCity: data.city,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          destinationState: data.state,
          destinationCity: data.city,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setError(null);
    
    // If brand changes, update available models and clear model selection
    if (name === 'vehicleBrand') {
      setAvailableModels(vehicleModelsByBrand[value] || []);
      setFormData((prev) => ({ ...prev, [name]: value, vehicleModel: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Auto-fill address when CEP is complete
      if (name === 'originCep' && value.replace(/\D/g, '').length === 8) {
        fetchAddressFromCEP(value, 'origin');
      } else if (name === 'destinationCep' && value.replace(/\D/g, '').length === 8) {
        fetchAddressFromCEP(value, 'destination');
      }
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setError(null);
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNextStep = () => {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePreviousStep = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateAllSteps();
    if (validation) {
      setStep(validation.step);
      setError(validation.message);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormData);
        setStep(1);
      } else {
        const data = await response.json().catch(() => null);
        setError((data?.error as string | undefined) ?? 'Erro ao enviar a cotação. Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f9ff] via-white to-[#eef2f9] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gabardo-blue md:text-4xl">Cotação enviada com sucesso!</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 md:text-lg">
              Agradecemos seu interesse. Nossa equipe comercial analisará sua solicitação e entrará em contato em breve com uma proposta detalhada.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-full bg-gabardo-blue px-8 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Enviar nova cotação
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f9ff] via-white to-[#eef2f9] py-16 md:py-20 lg:py-24">
      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-4xl font-bold uppercase tracking-tight text-gabardo-blue md:text-5xl"
          >
            Pedido de Cotação Transporte de Veículos
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-12"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/90 p-8 shadow-[0_22px_40px_-22px_rgba(19,45,81,0.45)] md:p-12">
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gabardo-blue">Passo {step} de {totalSteps}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gabardo-blue"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="relative space-y-8">
                {error && (
                  <div className="rounded border border-red-200 bg-red-100 px-4 py-3 text-red-700" role="alert">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                  >
                    <h3 className="mb-6 text-2xl font-bold text-gabardo-blue">Dados do Solicitante</h3>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Nome completo *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          placeholder="Informe seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Empresa (Opcional)</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          placeholder="Informe sua empresa"
                        />
                      </div>
                    </div>
                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">E-mail *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Telefone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center justify-center gap-3 rounded-full bg-gabardo-blue px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0f1f3a]"
                      >
                        Prosseguir <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                  >
                    <h3 className="mb-6 text-2xl font-bold text-gabardo-blue">Dados do Veículo</h3>
                    <div className="grid gap-6 lg:grid-cols-5">
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Veículo *</label>
                        <select
                          name="vehicleCategory"
                          value={formData.vehicleCategory}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                        >
                          <option value="">Selecione</option>
                          {vehicleTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Marca *</label>
                        <select
                          name="vehicleBrand"
                          value={formData.vehicleBrand}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                        >
                          <option value="">Selecione</option>
                          {vehicleBrands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Modelo *</label>
                        <select
                          name="vehicleModel"
                          value={formData.vehicleModel}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.vehicleBrand}
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">{formData.vehicleBrand ? 'Selecione' : 'Selecione a marca primeiro'}</option>
                          {availableModels.map((model) => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Ano / Fabricação *</label>
                        <select
                          name="vehicleYear"
                          value={formData.vehicleYear}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                        >
                          <option value="">Selecione</option>
                          {yearOptions.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Valor do Veículo *</label>
                        <input
                          type="text"
                          name="vehicleValue"
                          value={formData.vehicleValue}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          placeholder="Ex: 150000"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gabardo-blue">Observação sobre o veículo (Opcional)</label>
                      <input
                        type="text"
                        name="vehicleObservation"
                        value={formData.vehicleObservation}
                        onChange={handleInputChange}
                        className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                        placeholder="Ex.: Veículo sem bateria, não liga, coleção etc."
                      />
                    </div>

                    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="flex items-center justify-center gap-3 rounded-full border border-gabardo-blue px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-gabardo-blue transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gabardo-blue/10"
                      >
                        <ArrowLeft className="h-5 w-5" /> Voltar
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center justify-center gap-3 rounded-full bg-gabardo-blue px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0f1f3a]"
                      >
                        Prosseguir <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                  >
                    <h3 className="mb-6 text-2xl font-bold text-gabardo-blue">Origem e Destino</h3>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="grid gap-6 lg:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gabardo-blue">CEP de Origem</label>
                          <input
                            type="text"
                            name="originCep"
                            value={formData.originCep}
                            onChange={handleInputChange}
                            maxLength={9}
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="00000-000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gabardo-blue">UF de Origem *</label>
                          <select
                            name="originState"
                            value={formData.originState}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          >
                            <option value="">Selecione</option>
                            {brazilianStates.map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gabardo-blue">Município de Origem *</label>
                          <input
                            type="text"
                            name="originCity"
                            value={formData.originCity}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="Selecione um município"
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 lg:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gabardo-blue">CEP de Destino</label>
                          <input
                            type="text"
                            name="destinationCep"
                            value={formData.destinationCep}
                            onChange={handleInputChange}
                            maxLength={9}
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="00000-000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gabardo-blue">UF de Destino *</label>
                          <select
                            name="destinationState"
                            value={formData.destinationState}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                          >
                            <option value="">Selecione</option>
                            {brazilianStates.map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gabardo-blue">Município de Destino *</label>
                          <input
                            type="text"
                            name="destinationCity"
                            value={formData.destinationCity}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="Selecione um município"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gabardo-blue">Observação (Opcional)</label>
                      <textarea
                        name="routeObservation"
                        value={formData.routeObservation}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                        placeholder="Detalhes adicionais sobre o trajeto"
                      />
                    </div>
                    <div className="mt-6 flex items-start gap-3">
                      <input
                        id="privacyAccepted"
                        type="checkbox"
                        name="privacyAccepted"
                        checked={formData.privacyAccepted}
                        onChange={handleCheckboxChange}
                        className="mt-1 h-5 w-5 rounded border-neutral-300 text-gabardo-blue focus:ring-gabardo-blue"
                        required
                      />
                      <label htmlFor="privacyAccepted" className="text-sm text-gray-600">
                        Ao clicar em Solicitar Cotação você concorda com nossa política de privacidade.
                      </label>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="flex items-center justify-center gap-3 rounded-full border border-gabardo-blue px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-gabardo-blue transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gabardo-blue/10"
                      >
                        <ArrowLeft className="h-5 w-5" /> Voltar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-3 rounded-full bg-gabardo-blue px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0f1f3a] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? <Loader className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        {loading ? 'Enviando...' : 'Solicitar cotação'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VehicleQuoteForm;