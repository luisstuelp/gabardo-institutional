import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button_trucks';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase_trucks/client';
import { Vehicle, Branch } from '@/types/database';
import { formatPrice, formatYear } from '@/lib/format';
import { useAuth } from '@/contexts/AuthContext';

const leadSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle;
  branch?: Branch | null;
}

export function LeadModal({ open, onOpenChange, vehicle, branch }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { user } = useAuth();
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: vehicle
        ? `Olá! Tenho interesse no caminhão ${vehicle.title} (${formatYear(vehicle.year_manufacture, vehicle.year_model)}) - ${formatPrice(vehicle.price)}.`
        : '',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message || null,
        vehicle_id: vehicle?.id || null,
        branch_id: branch?.id || vehicle?.branch_id || null,
        user_id: user?.id || null,
        source: 'website',
        status: 'new',
      });

      if (error) {
        console.error('Error creating lead:', error);
        throw error;
      }

      toast({
        title: 'Interesse registrado!',
        description: 'Em breve um consultor entrará em contato.',
      });

      form.reset();
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-montserrat">Tenho Interesse</DialogTitle>
          <DialogDescription>
            Preencha seus dados e um consultor entrará em contato em breve.
          </DialogDescription>
        </DialogHeader>

        {vehicle && (
          <div className="bg-secondary rounded-lg p-4 mb-4">
            <p className="font-semibold text-sm">{vehicle.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatYear(vehicle.year_manufacture, vehicle.year_model)} • {formatPrice(vehicle.price)}
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
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
                  <FormLabel>Telefone *</FormLabel>
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
                  <FormLabel>E-mail</FormLabel>
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
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deixe uma mensagem (opcional)"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="btn-gabardo w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Interesse'
              )}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Ao enviar, você concorda com nossa{' '}
          <a href="/politica-privacidade" className="text-accent hover:underline">
            Política de Privacidade
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
