import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { formatPrice, calculateInstallment } from '@/lib/format';
import { cn } from '@/lib/utils';

interface FinancingSimulatorProps {
  vehiclePrice: number;
}

const INSTALLMENT_OPTIONS = [12, 24, 36, 48, 60];
const DEFAULT_INTEREST_RATE = 0.0199; // 1.99% a.m.

export function FinancingSimulator({ vehiclePrice }: FinancingSimulatorProps) {
  const [downPayment, setDownPayment] = useState(Math.round(vehiclePrice * 0.2)); // 20% default
  const [selectedInstallments, setSelectedInstallments] = useState(48);

  const minDownPayment = Math.round(vehiclePrice * 0.1); // 10% minimum
  const maxDownPayment = Math.round(vehiclePrice * 0.8); // 80% maximum

  const financedAmount = vehiclePrice - downPayment;

  const monthlyPayment = useMemo(() => {
    if (financedAmount <= 0) return 0;
    return calculateInstallment(financedAmount, DEFAULT_INTEREST_RATE, selectedInstallments);
  }, [financedAmount, selectedInstallments]);

  const totalPayment = monthlyPayment * selectedInstallments + downPayment;
  const totalInterest = totalPayment - vehiclePrice;

  const handleDownPaymentChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    const clampedValue = Math.min(Math.max(numValue, minDownPayment), maxDownPayment);
    setDownPayment(clampedValue);
  };

  const handleSliderChange = (value: number[]) => {
    setDownPayment(value[0]);
  };

  const downPaymentPercentage = Math.round((downPayment / vehiclePrice) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat">
          <Calculator className="h-5 w-5 text-accent" />
          Simulador de Financiamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vehicle Price */}
        <div className="bg-secondary rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Valor do veículo</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(vehiclePrice)}</p>
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="downPayment">Entrada ({downPaymentPercentage}%)</Label>
            <span className="text-sm text-muted-foreground">
              Mín. {formatPrice(minDownPayment)}
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
            onValueChange={handleSliderChange}
            min={minDownPayment}
            max={maxDownPayment}
            step={1000}
            className="mt-2"
          />
        </div>

        {/* Financed Amount */}
        <div className="flex items-center justify-between py-3 border-y border-border">
          <span className="text-muted-foreground">Valor a financiar</span>
          <span className="font-semibold text-lg">{formatPrice(financedAmount)}</span>
        </div>

        {/* Installments */}
        <div className="space-y-3">
          <Label>Parcelas</Label>
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
            <div className="flex items-center justify-between text-warning">
              <span>Juros total</span>
              <span className="font-medium">{formatPrice(totalInterest)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Simulação com taxas e condições sujeitas a análise de crédito. 
          Entre em contato para condições personalizadas.
        </p>
      </CardContent>
    </Card>
  );
}
