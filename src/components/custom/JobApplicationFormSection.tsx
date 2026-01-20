'use client';

import React, { useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader, ArrowRight, Upload, X, FileText } from 'lucide-react';
import InternationalPhoneInput from '@/components/custom/InternationalPhoneInput';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormData {
  name: string;
  email: string;
  phone: string;
  positionInterest: string;
  message: string;
  privacyAccepted: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function JobApplicationFormSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const positionOptions = useMemo(() => [
    'Motorista',
    'Administrativo',
    'Operacional',
    'Outro'
  ], []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== 'application/pdf') {
      setFileError('Apenas arquivos PDF são aceitos');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Arquivo muito grande (máximo 10MB)');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formElement = event.currentTarget;
    const formDataElement = new window.FormData(formElement);

    const data: FormData = {
      name: formDataElement.get('name') as string,
      email: formDataElement.get('email') as string,
      phone: phone,
      positionInterest: selectedPosition,
      message: formDataElement.get('message') as string,
      privacyAccepted,
    };

    if (!privacyAccepted) {
      setLoading(false);
      setError('Você precisa aceitar a política de privacidade para enviar sua candidatura.');
      return;
    }

    if (!selectedFile) {
      setLoading(false);
      setError('Por favor, anexe seu currículo em formato PDF.');
      return;
    }

    try {
      const submitFormData = new window.FormData();
      submitFormData.append('name', data.name);
      submitFormData.append('email', data.email);
      submitFormData.append('phone', data.phone);
      submitFormData.append('positionInterest', data.positionInterest);
      submitFormData.append('message', data.message);
      submitFormData.append('privacyAccepted', String(data.privacyAccepted));
      submitFormData.append('resume', selectedFile);

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: submitFormData,
      });

      if (response.ok) {
        setSubmitted(true);
        formElement.reset();
        setPhone('');
        setSelectedPosition('');
        setPrivacyAccepted(false);
        setSelectedFile(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao enviar candidatura. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id="job-application-form" className="section-shell bg-white relative overflow-hidden">
        <div className="section-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-10" />
            <h2 className="section-heading mt-6">Candidatura enviada com sucesso</h2>
            <p className="section-subheading mt-6">
              Obrigado pelo seu interesse em fazer parte do time Gabardo! Nossa equipe de RH analisará seu currículo e entrará em contato caso haja oportunidades alinhadas com seu perfil.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-3 rounded-full bg-gabardo-blue px-10 py-4 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_30px_70px_-40px_rgba(19,45,81,0.7)] transition-all duration-300 hover:bg-gabardo-blue/90"
            >
              Enviar nova candidatura
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="job-application-form" className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-medium tracking-[0.16em] text-neutral-500 mb-6 uppercase"
          >
            Envie seu Currículo
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight font-primary"
          >
            Venha Fazer Parte
            <br />
            <span className="text-gabardo-light-blue">do Nosso Time</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-lg text-gray-600 mb-8"
          >
            Preencha o formulário abaixo com seus dados e anexe seu currículo. Nossa equipe de RH entrará em contato caso surjam oportunidades.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-neutral-200 bg-white/90 p-6 sm:p-8 md:p-10 shadow-[0_35px_90px_-60px_rgba(19,45,81,0.45)] backdrop-blur"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-400 p-6 flex items-center space-x-3 text-red-700"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3"
              >
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Nome Completo *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={3}
                  maxLength={100}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="Seu nome completo"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3"
              >
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  E-mail *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={150}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="seu@email.com"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Telefone *
                </label>
                <InternationalPhoneInput
                  value={phone}
                  onChange={setPhone}
                  name="phone"
                  className="w-full border-b-2 border-neutral-200 pb-3"
                  inputClassName="px-0 py-0 text-base sm:text-lg"
                  placeholder="Seu telefone com código internacional"
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="tel"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'phone' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-3"
              >
                <label htmlFor="positionInterest" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Área de Interesse
                </label>
                <motion.select
                  id="positionInterest"
                  name="positionInterest"
                  value={selectedPosition}
                  onChange={(event) => setSelectedPosition(event.target.value)}
                  onFocus={() => setFocusedField('positionInterest')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent"
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="">Selecione (opcional)</option>
                  {positionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </motion.select>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'positionInterest' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>
            </div>

            <div className="space-y-8">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-3"
              >
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Mensagem / Carta de Apresentação *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={6}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400 resize-none"
                  placeholder="Conte um pouco sobre você, sua experiência e por que gostaria de trabalhar na Gabardo..."
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Currículo (PDF) *
                </label>
                <div className="relative">
                  {!selectedFile ? (
                    <label
                      htmlFor="resume"
                      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                        fileError
                          ? 'border-red-400 bg-red-50'
                          : 'border-neutral-300 bg-neutral-50 hover:border-gabardo-light-blue hover:bg-gabardo-light-blue/5'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className={`w-10 h-10 mb-3 ${fileError ? 'text-red-400' : 'text-neutral-400'}`} />
                        <p className="mb-2 text-sm text-neutral-600">
                          <span className="font-semibold">Clique para selecionar</span> ou arraste o arquivo
                        </p>
                        <p className="text-xs text-neutral-500">PDF (máximo 10MB)</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between w-full p-4 border-2 border-emerald-400 bg-emerald-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl">
                          <FileText className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-800 truncate max-w-[200px] sm:max-w-[300px]">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-red-100 transition-colors"
                      >
                        <X className="w-5 h-5 text-neutral-600 hover:text-red-600" />
                      </button>
                    </div>
                  )}
                  {fileError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {fileError}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 text-sm text-neutral-700"
            >
              <label className="flex items-start gap-3 text-left">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-neutral-300 text-gabardo-blue focus:ring-gabardo-light-blue"
                  required
                />
                <span>
                  Estou ciente e concordo com a{' '}
                  <a
                    href="/politica-de-privacidade"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-gabardo-blue underline-offset-4 hover:underline"
                  >
                    Política de Privacidade
                  </a>{' '}
                  da Gabardo Transportes.
                </span>
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center pt-6 md:pt-8"
            >
              <motion.button
                type="submit"
                disabled={loading}
                className="group bg-gabardo-blue text-white px-10 py-4 text-base sm:text-lg font-bold uppercase tracking-[0.25em] hover:bg-gabardo-blue/90 hover:shadow-lg hover:shadow-gabardo-blue/30 transition-all duration-300 flex items-center space-x-4 touch-manipulation rounded-full disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Candidatura</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
