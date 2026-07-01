import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button_trucks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase_trucks/client';
import { COMPANY_INFO } from '@/types/database';
import { formatWhatsAppLink } from '@/lib/format';

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const branches = [
  {
    name: 'Caxias do Sul (Matriz)',
    address: 'Rua Exemplo, 123 - Bairro Industrial',
    city: 'Caxias do Sul - RS',
    phone: '(54) 3222-1234',
    whatsapp: '5554999991234',
    hours: 'Seg-Sex: 8h às 18h | Sáb: 8h às 12h',
  },
  {
    name: 'Porto Alegre',
    address: 'Av. Exemplo, 456 - Zona Norte',
    city: 'Porto Alegre - RS',
    phone: '(51) 3333-5678',
    whatsapp: '5551999995678',
    hours: 'Seg-Sex: 8h às 18h | Sáb: 8h às 12h',
  },
  {
    name: 'Passo Fundo',
    address: 'Rod. Exemplo, Km 10',
    city: 'Passo Fundo - RS',
    phone: '(54) 3311-9012',
    whatsapp: '5554999999012',
    hours: 'Seg-Sex: 8h às 18h | Sáb: 8h às 12h',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
        source: 'contact_page',
        status: 'new',
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Mensagem enviada!',
        description: 'Entraremos em contato em breve.',
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white py-10 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container-gabardo relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-1 ring-white/20">
            <MessageSquare className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-montserrat mb-4 md:mb-6 tracking-tight">
            Fale Conosco
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para atender você.
          </p>
        </div>
      </div>

      <div className="container-gabardo mt-6 md:-mt-10 pb-12 md:pb-20 relative z-20">

        {/* Mobile Quick Actions (Visible only on mobile) */}
        <div className="lg:hidden flex items-center justify-center gap-6 mb-8">
          <a
            href={formatWhatsAppLink(COMPANY_INFO.whatsapp, 'Olá! Gostaria de mais informações.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100 shadow-sm hover:scale-105 transition-transform"
            aria-label="WhatsApp"
          >
            <MessageSquare className="h-7 w-7" />
          </a>
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
            className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100 shadow-sm hover:scale-105 transition-transform"
            aria-label="Ligar"
          >
            <Phone className="h-7 w-7" />
          </a>
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100 shadow-sm hover:scale-105 transition-transform"
            aria-label="Email"
          >
            <Mail className="h-7 w-7" />
          </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Form Section (Left - 7 cols) */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden">
              <CardContent className="p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold font-montserrat text-slate-900 mb-2">Envie uma Mensagem</h2>
                  <p className="text-slate-500">Preencha o formulário e retornaremos o mais breve possível.</p>
                </div>

                {submitted ? (
                  <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Mensagem Enviada!</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                      Recebemos sua mensagem e nossa equipe entrará em contato em breve.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        form.reset();
                      }}
                      className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-white hover:text-slate-900"
                    >
                      Enviar nova mensagem
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Nome completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu nome" {...field} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium">Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(00) 00000-0000" {...field} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium">E-mail</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" type="email" {...field} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Mensagem</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Como podemos ajudá-lo?"
                                className="min-h-[150px] bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl resize-none p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Mensagem <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Section (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Cards - Hidden on Mobile to avoid duplication */}
            <div className="hidden lg:grid gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-0.5">Ligue para nós</p>
                  <p className="text-lg font-bold text-slate-900">{COMPANY_INFO.phone}</p>
                </div>
              </a>

              <a
                href={formatWhatsAppLink(COMPANY_INFO.whatsapp, 'Olá! Gostaria de mais informações.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-green-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <MessageSquare className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-0.5">WhatsApp</p>
                  <p className="text-lg font-bold text-slate-900">Iniciar conversa</p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-0.5">E-mail</p>
                  <p className="text-lg font-bold text-slate-900">{COMPANY_INFO.email}</p>
                </div>
              </a>
            </div>

            {/* Branches Section */}
            <div>
              <h3 className="text-xl font-bold font-montserrat text-slate-900 mb-5 pl-1">
                Nossas Filiais
              </h3>
              <div className="space-y-4">
                {branches.map((branch, index) => (
                  <div key={index} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      {branch.name}
                    </h4>
                    <div className="space-y-2.5 text-sm text-slate-600 ml-1">
                      <p className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0 group-hover:bg-blue-400 transition-colors" />
                        <span>{branch.address}, {branch.city}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 group-hover:bg-blue-400 transition-colors" />
                        <span>{branch.phone}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 group-hover:bg-blue-400 transition-colors" />
                        <span className="text-slate-500">{branch.hours}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
