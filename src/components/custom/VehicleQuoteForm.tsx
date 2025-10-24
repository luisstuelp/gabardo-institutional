'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader, ArrowRight, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { useFipeVehicleData } from '@/hooks/useFipeApi';
import { VehicleModelAutocomplete } from '@/components/custom/VehicleModelAutocomplete';

const parseVehicleValue = (value: string) => {
  if (!value) {
    return NaN;
  }

  const digitsOnly = value.replace(/[^0-9]/g, '');
  if (!digitsOnly) {
    return NaN;
  }

  return Number(digitsOnly) / 100;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  vehicleCategory: string;
  vehicleCategoryManual: string;
  vehicleBrand: string;
  vehicleBrandCode: string;
  vehicleBrandManual: string;
  vehicleModel: string;
  vehicleModelCode: string;
  vehicleModelManual: string;
  vehicleYear: string;
  vehicleYearCode: string;
  vehicleYearManual: string;
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
  vehicleCategoryManual: '',
  vehicleBrand: '',
  vehicleBrandCode: '',
  vehicleBrandManual: '',
  vehicleModel: '',
  vehicleModelCode: '',
  vehicleModelManual: '',
  vehicleYear: '',
  vehicleYearCode: '',
  vehicleYearManual: '',
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

// Mocked vehicle types based on Gabardo services
const vehicleTypes = [
  'Carro',
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
  'Outros'
];

// Note: Vehicle brands are now fetched from FIPE API

// Brazilian states
const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

// Note: Vehicle models are now fetched from FIPE API

const formatCurrencyFromDigits = (digits: string) => {
  const normalized = Number(digits) / 100;
  return normalized.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) {
    return '';
  }

  if (digits.length === 1) {
    return `(${digits}`;
  }

  if (digits.length === 2) {
    return `(${digits}) `;
  }

  const area = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) {
    return `(${area}) ${rest}`;
  }

  if (digits.length <= 10) {
    return `(${area}) ${rest.slice(0, rest.length - 4)}-${rest.slice(-4)}`;
  }

  return `(${area}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
};

const VehicleQuoteForm: React.FC = () => {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const effectiveVehicleCategory = vehicleTypes.includes(formData.vehicleCategory) ? formData.vehicleCategory : '';

  // FIPE API integration
  const {
    brands,
    models,
    years,
    loading: fipeLoading,
    error: fipeError,
    loadModels,
    loadYears,
    loadVehiclePrice,
  } = useFipeVehicleData(effectiveVehicleCategory);

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
        const categoryFilled = formData.vehicleCategory === 'Outros' || !vehicleTypes.includes(formData.vehicleCategory)
          ? formData.vehicleCategoryManual.trim()
          : formData.vehicleCategory.trim();
        const brandFilled = formData.vehicleBrandCode === 'outros'
          ? formData.vehicleBrandManual.trim()
          : formData.vehicleBrand.trim();
        const modelFilled = formData.vehicleBrandCode === 'outros' || formData.vehicleModelCode === 'outros'
          ? formData.vehicleModelManual.trim()
          : formData.vehicleModel.trim();
        const yearFilled = formData.vehicleBrandCode === 'outros' || formData.vehicleModelCode === 'outros'
          ? formData.vehicleYearManual.trim()
          : formData.vehicleYear.trim();

        if (!categoryFilled || !brandFilled || !modelFilled || !yearFilled || !formData.vehicleValue) {
          return 'Preencha todas as informações do veículo.';
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
    
    // Handle vehicle category change
    if (name === 'vehicleCategory') {
      const isOther = value === 'Outros';
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value, 
        vehicleCategoryManual: isOther ? '' : prev.vehicleCategoryManual,
        vehicleBrand: '',
        vehicleBrandCode: isOther ? 'outros' : '',
        vehicleBrandManual: '',
        vehicleModel: '',
        vehicleModelCode: isOther ? 'outros' : '',
        vehicleModelManual: '',
        vehicleYear: '',
        vehicleYearCode: '',
        vehicleYearManual: '',
        vehicleValue: '',
      }));
      if (isOther) {
        loadModels('');
        loadYears('', '');
      }
    }
    // Handle brand change - extract code and name
    else if (name === 'vehicleBrand') {
      if (!value) {
        setFormData((prev) => ({
          ...prev,
          vehicleBrand: '',
          vehicleBrandCode: '',
          vehicleBrandManual: '',
          vehicleModel: '',
          vehicleModelCode: '',
          vehicleModelManual: '',
          vehicleYear: '',
          vehicleYearCode: '',
          vehicleYearManual: '',
          vehicleValue: '',
        }));
        loadModels('');
        loadYears('', '');
      } else if (value === 'outros') {
        setFormData((prev) => ({
          ...prev,
          vehicleBrand: '',
          vehicleBrandCode: 'outros',
          vehicleBrandManual: '',
          vehicleModel: '',
          vehicleModelCode: 'outros',
          vehicleModelManual: '',
          vehicleYear: '',
          vehicleYearCode: '',
          vehicleYearManual: '',
          vehicleValue: '',
        }));
        loadModels('');
        loadYears('', '');
      } else {
        const selectedBrand = brands.find(b => b.code === value);
        if (selectedBrand) {
          setFormData((prev) => ({ 
            ...prev, 
            vehicleBrand: selectedBrand.name,
            vehicleBrandCode: selectedBrand.code,
            vehicleBrandManual: '',
            vehicleModel: '',
            vehicleModelCode: '',
            vehicleModelManual: '',
            vehicleYear: '',
            vehicleYearCode: '',
            vehicleYearManual: '',
            vehicleValue: '',
          }));
          loadModels(selectedBrand.code);
        }
      }
    }
    // Handle model change - now handled by the autocomplete component
    else if (name === 'vehicleModel') {
      const selectedModel = models.find(m => m.code === value);
      if (selectedModel) {
        setFormData((prev) => ({ 
          ...prev, 
          vehicleModel: selectedModel.name,
          vehicleModelCode: selectedModel.code,
          vehicleModelManual: '',
          vehicleYear: '',
          vehicleYearCode: '',
          vehicleYearManual: '',
        }));
        if (formData.vehicleBrandCode) {
          loadYears(formData.vehicleBrandCode, selectedModel.code);
        }
      }
    }
    // Handle year change and fetch price from FIPE
    else if (name === 'vehicleYear') {
      const selectedYear = years.find(y => y.code === value);
      if (selectedYear) {
        setFormData((prev) => ({ 
          ...prev, 
          vehicleYear: selectedYear.name,
          vehicleYearCode: selectedYear.code
        }));
        
        // Automatically fetch vehicle price from FIPE
        if (
          formData.vehicleBrandCode &&
          formData.vehicleBrandCode !== 'outros' &&
          formData.vehicleModelCode &&
          formData.vehicleModelCode !== 'outros'
        ) {
          loadVehiclePrice(
            formData.vehicleBrandCode,
            formData.vehicleModelCode,
            selectedYear.code
          ).then(priceData => {
            if (priceData?.price) {
              setFormData((prev) => ({
                ...prev,
                vehicleValue: priceData.price
              }));
            }
          }).catch(err => {
            console.error('Erro ao buscar preço FIPE:', err);
          });
        }
        setFormData((prev) => ({
          ...prev,
          vehicleYearManual: '',
        }));
      }
    }
    else if (name === 'vehicleCategoryManual') {
      setFormData((prev) => ({
        ...prev,
        vehicleCategoryManual: value,
        vehicleCategory: value,
        vehicleBrandCode: 'outros',
        vehicleModelCode: 'outros',
      }));
    }
    else if (name === 'vehicleBrandManual') {
      setFormData((prev) => ({
        ...prev,
        vehicleBrandManual: value,
        vehicleBrand: value,
      }));
    }
    else if (name === 'vehicleModelManual') {
      setFormData((prev) => ({
        ...prev,
        vehicleModelManual: value,
        vehicleModel: value,
      }));
    }
    else if (name === 'vehicleYearManual') {
      setFormData((prev) => ({
        ...prev,
        vehicleYearManual: value,
        vehicleYear: value,
        vehicleYearCode: value,
      }));
    }
    else if (name === 'vehicleValue') {
      const digitsOnly = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        vehicleValue: digitsOnly ? formatCurrencyFromDigits(digitsOnly) : '',
      }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Auto-fill address when CEP is complete
      if (name === 'originCep' && value.replace(/\D/g, '').length === 8) {
        fetchAddressFromCEP(value, 'origin');
      } else if (name === 'destinationCep' && value.replace(/\D/g, '').length === 8) {
        fetchAddressFromCEP(value, 'destination');
      }
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formatted = formatPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleModelChange = (code: string, name: string) => {
  setError(null);
  if (code === 'outros') {
    setFormData((prev) => ({
      ...prev,
      vehicleModel: '',
      vehicleModelCode: 'outros',
      vehicleModelManual: '',
      vehicleYear: '',
      vehicleYearCode: '',
      vehicleYearManual: '',
      vehicleValue: '',
    }));
    loadYears('', '');
  }
  else {
    setFormData((prev) => ({
      ...prev,
      vehicleModel: name,
      vehicleModelCode: code,
      vehicleModelManual: '',
      vehicleYear: '',
      vehicleYearCode: '',
      vehicleYearManual: '',
      vehicleValue: '',
    }));
  }
  if (code && code !== 'outros' && formData.vehicleBrandCode && formData.vehicleBrandCode !== 'outros') {
    loadYears(formData.vehicleBrandCode, code);
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
            className="lg:col-span-8"
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
                          inputMode="tel"
                          maxLength={16}
                          value={formData.phone}
                          onChange={handlePhoneChange}
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
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Tipo de veículo *</label>
                        <select
                          name="vehicleCategory"
                          value={vehicleTypes.includes(formData.vehicleCategory) ? formData.vehicleCategory : 'Outros'}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                        >
                          <option value="">Selecione</option>
                          {vehicleTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {(!vehicleTypes.includes(formData.vehicleCategory) || formData.vehicleCategory === 'Outros') && (
                          <input
                            type="text"
                            name="vehicleCategoryManual"
                            value={formData.vehicleCategoryManual}
                            onChange={handleInputChange}
                            required
                            className="mt-3 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="Informe o tipo de veículo"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Marca *</label>
                        <select
                          name="vehicleBrand"
                          value={formData.vehicleBrandCode}
                          onChange={handleInputChange}
                          required
                          disabled={!effectiveVehicleCategory || formData.vehicleCategory === 'Outros' || fipeLoading}
                          className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            {!effectiveVehicleCategory ? 'Selecione o tipo de veículo primeiro' : fipeLoading ? 'Carregando...' : 'Selecione'}
                          </option>
                          {brands.map((brand) => (
                            <option key={brand.code} value={brand.code}>{brand.name}</option>
                          ))}
                        </select>
                        {fipeError && <p className="mt-1 text-xs text-red-600">{fipeError}</p>}
                        {formData.vehicleBrandCode === 'outros' && (
                          <input
                            type="text"
                            name="vehicleBrandManual"
                            value={formData.vehicleBrandManual}
                            onChange={handleInputChange}
                            required
                            className="mt-3 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="Informe a marca"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Modelo *</label>
                        {formData.vehicleBrandCode === 'outros' ? (
                          <input
                            type="text"
                            name="vehicleModelManual"
                            value={formData.vehicleModelManual}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="Informe o modelo"
                          />
                        ) : (
                          <>
                            <VehicleModelAutocomplete
                              options={models}
                              value={formData.vehicleModelCode}
                              onChange={handleModelChange}
                              disabled={!formData.vehicleBrandCode || formData.vehicleBrandCode === 'outros'}
                              loading={fipeLoading}
                              placeholder={!formData.vehicleBrandCode ? 'Selecione a marca primeiro' : 'Digite ou selecione o modelo'}
                              className="mt-2"
                            />
                            {formData.vehicleModelCode === 'outros' && (
                              <input
                                type="text"
                                name="vehicleModelManual"
                                value={formData.vehicleModelManual}
                                onChange={handleInputChange}
                                required
                                className="mt-3 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                                placeholder="Informe o modelo"
                              />
                            )}
                          </>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gabardo-blue">Ano / Fabricação *</label>
                        {formData.vehicleBrandCode === 'outros' || formData.vehicleModelCode === 'outros' ? (
                          <input
                            type="text"
                            name="vehicleYearManual"
                            value={formData.vehicleYearManual}
                            onChange={handleInputChange}
                            required
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none"
                            placeholder="Informe o ano de fabricação"
                          />
                        ) : (
                          <select
                            name="vehicleYear"
                            value={formData.vehicleYearCode}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.vehicleModelCode || formData.vehicleModelCode === 'outros' || fipeLoading}
                            className="mt-2 w-full rounded border border-neutral-300 px-4 py-3 focus:border-gabardo-blue focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {!formData.vehicleModelCode ? 'Selecione o modelo primeiro' : fipeLoading ? 'Carregando...' : 'Selecione'}
                            </option>
                            {years.map((year) => (
                              <option key={year.code} value={year.code}>{year.name}</option>
                            ))}
                          </select>
                        )}
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
                          placeholder="R$ 0,00"
                          inputMode="numeric"
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
                    <h3 className="mb-8 text-2xl font-bold text-gabardo-blue">Origem e Destino</h3>
                    
                    {/* Origem */}
                    <div className="mb-8">
                      <h4 className="mb-4 text-base font-semibold text-gabardo-blue uppercase tracking-wide">Origem</h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gabardo-blue mb-2 min-h-[20px]">CEP de Origem</label>
                          <input
                            type="text"
                            name="originCep"
                            value={formData.originCep}
                            onChange={handleInputChange}
                            maxLength={9}
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue"
                            placeholder="00000-000"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gabardo-blue mb-2 min-h-[20px]">UF de Origem *</label>
                          <select
                            name="originState"
                            value={formData.originState}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue"
                          >
                            <option value="">Selecione</option>
                            {brazilianStates.map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full sm:col-span-2 lg:col-span-1">
                          <label className="block text-sm font-medium text-gabardo-blue mb-2 min-h-[20px]">Município de Origem *</label>
                          <input
                            type="text"
                            name="originCity"
                            value={formData.originCity}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue"
                            placeholder="Nome do município"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Destino */}
                    <div className="mb-8">
                      <h4 className="mb-4 text-base font-semibold text-gabardo-blue uppercase tracking-wide">Destino</h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gabardo-blue mb-2 min-h-[20px]">CEP de Destino</label>
                          <input
                            type="text"
                            name="destinationCep"
                            value={formData.destinationCep}
                            onChange={handleInputChange}
                            maxLength={9}
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue"
                            placeholder="00000-000"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gabardo-blue mb-2 min-h-[20px]">UF de Destino *</label>
                          <select
                            name="destinationState"
                            value={formData.destinationState}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue"
                          >
                            <option value="">Selecione</option>
                            {brazilianStates.map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full sm:col-span-2 lg:col-span-1">
                          <label className="block text-sm font-medium text-gabardo-blue mb-2 min-h-[20px]">Município de Destino *</label>
                          <input
                            type="text"
                            name="destinationCity"
                            value={formData.destinationCity}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue"
                            placeholder="Nome do município"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Observação */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gabardo-blue mb-2">Observação (Opcional)</label>
                      <textarea
                        name="routeObservation"
                        value={formData.routeObservation}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-gabardo-blue focus:outline-none focus:ring-1 focus:ring-gabardo-blue resize-none"
                        placeholder="Detalhes adicionais sobre o trajeto"
                      />
                    </div>

                    {/* Política de Privacidade */}
                    <div className="mb-8 rounded-lg border border-gabardo-blue/20 bg-gabardo-blue/5 p-4">
                      <label htmlFor="privacyAccepted" className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                        <input
                          id="privacyAccepted"
                          name="privacyAccepted"
                          type="checkbox"
                          checked={formData.privacyAccepted}
                          onChange={handleCheckboxChange}
                          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-gabardo-blue focus:ring-gabardo-blue cursor-pointer"
                          required
                        />
                        <span>Ao clicar em <strong>Solicitar Cotação</strong> você concorda com nossa política de privacidade.</span>
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-8 space-y-6 overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/90 p-8 shadow-[0_18px_32px_-18px_rgba(19,45,81,0.4)]">
              <h3 className="text-xl font-semibold text-gabardo-blue">Atendimento Comercial</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Nossa equipe conecta soluções logísticas no Brasil e LATAM com SLA ágil e acompanhamento consultivo.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-md">
                    <Mail className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">E-mail</h4>
                    <a href="mailto:comercial@transgabardo.com.br" className="text-gray-600 hover:text-gabardo-blue transition-colors">
                      comercial@transgabardo.com.br
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-md">
                    <Phone className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">Central</h4>
                    <a href="tel:+555121082400" className="text-gray-600 hover:text-gabardo-blue transition-colors">
                      (51) 2108-2400
                    </a>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Atendimento em horário comercial</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-md">
                    <MapPin className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">Matriz</h4>
                    <p className="text-gray-600">Av. Fernando Ferrari, 700</p>
                    <p className="text-gray-600">Anchieta - Porto Alegre/RS</p>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">15 unidades no Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VehicleQuoteForm;
