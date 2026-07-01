import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calculator, Loader2, CheckCircle, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button_trucks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice, calculateInstallment } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase_trucks/client';

const INSTALLMENT_OPTIONS = [12, 24, 36, 48, 60];
const DEFAULT_INTEREST_RATE = 0.0199; // 1.99% a.m.

const leadSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function FinancingPage() {
  // Simulator state
  const [vehiclePrice, setVehiclePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [selectedInstallments, setSelectedInstallments] = useState(48);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const minPrice = 50000;
  const maxPrice = 2000000;
  const minDownPayment = Math.round(vehiclePrice * 0.1);
  const maxDownPayment = Math.round(vehiclePrice * 0.8);

  const financedAmount = vehiclePrice - downPayment;

  const monthlyPayment = financedAmount > 0 
    ? calculateInstallment(financedAmount, DEFAULT_INTEREST_RATE, selectedInstallments)
    : 0;

  const totalPayment = monthlyPayment * selectedInstallments + downPayment;
  const totalInterest = totalPayment - vehiclePrice;

  const downPaymentPercentage = Math.round((downPayment / vehiclePrice) * 100);

  const handlePriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    const clampedValue = Math.min(Math.max(numValue, minPrice), maxPrice);
    setVehiclePrice(clampedValue);
    // Adjust down payment if needed
    const newMinDown = Math.round(clampedValue * 0.1);
    const newMaxDown = Math.round(clampedValue * 0.8);
    if (downPayment < newMinDown) setDownPayment(newMinDown);
    if (downPayment > newMaxDown) setDownPayment(newMaxDown);
  };

  const handleDownPaymentChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    const clampedValue = Math.min(Math.max(numValue, minDownPayment), maxDownPayment);
    setDownPayment(clampedValue);
  };

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    const simulationDetails = `Simulação de Financiamento:
- Valor do veículo: ${formatPrice(vehiclePrice)}
- Entrada: ${formatPrice(downPayment)} (${downPaymentPercentage}%)
- Valor financiado: ${formatPrice(financedAmount)}
- Parcelas: ${selectedInstallments}x de ${formatPrice(monthlyPayment)}
- Taxa: 1,99% a.m.
- Total a pagar: ${formatPrice(totalPayment)}

Mensagem: ${data.message || 'Sem mensagem adicional'}`;

    try {
      const { error } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: simulationDetails,
        source: 'financing_simulator',
        status: 'new',
      });

      if (error) {
        console.error('Error creating lead:', error);
        throw error;
      }

      setSubmitted(true);
      toast({
        title: 'Solicitação enviada!',
        description: 'Um consultor entrará em contato em breve.',
      });
    } catch (error) {
      console.error('Lead submission error:', error);
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
    <div className="min-h-screen bg-secondary/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-gabardo text-center">
          <Calculator className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Simulador de Financiamento
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Calcule as parcelas do seu caminhão e solicite uma análise de crédito personalizada
          </p>
        </div>
      </div>

      <div className="container-gabardo py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Simulator Card */}
          <Card className="lg:sticky lg:top-24 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat">
                <Calculator className="h-5 w-5 text-accent" />
                Simule seu Financiamento
              </CardTitle>
              <CardDescription>
                Ajuste os valores e veja as parcelas em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vehicle Price */}
              <div className="space-y-3">
                <Label htmlFor="vehiclePrice">Valor do veículo</Label>
                <Input
                  id="vehiclePrice"
                  type="text"
                  value={formatPrice(vehiclePrice)}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="text-lg font-semibold"
                />
                <Slider
                  value={[vehiclePrice]}
                  onValueChange={(value) => {
                    setVehiclePrice(value[0]);
                    const newMinDown = Math.round(value[0] * 0.1);
                    const newMaxDown = Math.round(value[0] * 0.8);
                    if (downPayment < newMinDown) setDownPayment(newMinDown);
                    if (downPayment > newMaxDown) setDownPayment(newMaxDown);
                  }}
                  min={minPrice}
                  max={maxPrice}
                  step={5000}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatPrice(minPrice)}</span>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="downPayment">Entrada ({downPaymentPercentage}%)</Label>
                  <span className="text-sm text-muted-foreground">
                    Mín. 10% • Máx. 80%
                  </span>
                </div>
                <Input
                  id="downPayment"
                  type="text"
                  value={formatPrice(downPayment)}
                  onChange={(e) => handleDownPaymentChange(e.target.value)}
                  className="text-lg font-semibold"
                />
                <Slider
                  value={[downPayment]}
                  onValueChange={(value) => setDownPayment(value[0])}
                  min={minDownPayment}
                  max={maxDownPayment}
                  step={1000}
                />
              </div>

              {/* Financed Amount */}
              <div className="flex items-center justify-between py-3 border-y border-border">
                <span className="text-muted-foreground">Valor a financiar</span>
                <span className="font-semibold text-lg">{formatPrice(financedAmount)}</span>
              </div>

              {/* Installments */}
              <div className="space-y-3">
                <Label>Quantidade de parcelas</Label>
                <div className="flex gap-2 flex-wrap">
                  {INSTALLMENT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedInstallments(option)}
                      className={cn(
                        'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                        selectedInstallments === option
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-secondary border-border hover:border-accent'
                      )}
                    >
                      {option}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="bg-accent/10 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Parcela mensal estimada</p>
                  <p className="text-4xl font-bold text-accent font-montserrat">
                    {formatPrice(monthlyPayment)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    em {selectedInstallments}x com taxa de 1,99% a.m.
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Entrada</span>
                    <span className="font-medium">{formatPrice(downPayment)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total financiado</span>
                    <span className="font-medium">{formatPrice(financedAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total a pagar</span>
                    <span className="font-medium">{formatPrice(totalPayment)}</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-600">
                    <span>Juros total</span>
                    <span className="font-medium">{formatPrice(totalInterest)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                * Simulação com taxas e condições sujeitas a análise de crédito. 
              </p>
            </CardContent>
          </Card>

          {/* Lead Form Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat">Solicitar Análise de Crédito</CardTitle>
              <CardDescription>
                Preencha seus dados e receba uma proposta personalizada
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Solicitação Enviada!</h3>
                  <p className="text-muted-foreground mb-6">
                    Um consultor entrará em contato em breve para apresentar as melhores condições de financiamento.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}
                  >
                    Fazer nova simulação
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
                          <FormLabel className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Nome completo *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Telefone / WhatsApp *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="(51) 99999-9999" {...field} />
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
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            E-mail
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem adicional</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tem alguma dúvida ou informação adicional?" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Summary Box */}
                    <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-semibold text-base mb-3">Resumo da Simulação</p>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor do veículo:</span>
                        <span className="font-medium">{formatPrice(vehiclePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Entrada:</span>
                        <span className="font-medium">{formatPrice(downPayment)} ({downPaymentPercentage}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Parcelas:</span>
                        <span className="font-medium">{selectedInstallments}x de {formatPrice(monthlyPayment)}</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="btn-gabardo w-full text-lg py-6" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Solicitar Análise de Crédito'
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Ao enviar, você concorda com nossa{' '}
                      <a href="/politica-privacidade" className="text-accent hover:underline">
                        Política de Privacidade
                      </a>
                      .
                    </p>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Aprovação Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Análise de crédito em até 24 horas com as melhores taxas do mercado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Parcelas Flexíveis</h3>
              <p className="text-sm text-muted-foreground">
                Opções de 12 a 60 parcelas para caber no seu orçamento
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Atendimento Especializado</h3>
              <p className="text-sm text-muted-foreground">
                Consultores dedicados para encontrar a melhor solução para você
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
