'use client';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from '@/lib/next-router-compat';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Informe seu nome completo.'),
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  confirmation: z.string(),
}).refine((value) => value.password === value.confirmation, {
  message: 'As senhas não coincidem.',
  path: ['confirmation'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { user, isLoading, signUp } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', password: '', confirmation: '' },
  });

  useEffect(() => {
    if (user && !isLoading) navigate('/veiculos', { replace: true });
  }, [user, isLoading, navigate]);

  const onSubmit = async ({ fullName, email, password }: FormData) => {
    setSubmitting(true);
    const { error } = await signUp(fullName, email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Conta criada. Boas-vindas!');
    navigate('/veiculos', { replace: true });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" /></div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <Link to="/auth" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#122d54] mb-6 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" /> Voltar ao login
        </Link>
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900">Criar conta</h1>
          <p className="text-slate-500 mt-2 mb-6 text-sm">Cadastre-se para acompanhar propostas e salvar seus anúncios favoritos.</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">Nome completo</Label>
              <div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input id="register-name" className="pl-10" autoComplete="name" {...form.register('fullName')} /></div>
              {form.formState.errors.fullName && <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">E-mail</Label>
              <div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input id="register-email" type="email" className="pl-10" autoComplete="email" {...form.register('email')} /></div>
              {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Senha</Label>
              <div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input id="register-password" type="password" className="pl-10" autoComplete="new-password" {...form.register('password')} /></div>
              {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirmation">Confirme a senha</Label>
              <Input id="register-confirmation" type="password" autoComplete="new-password" {...form.register('confirmation')} />
              {form.formState.errors.confirmation && <p className="text-sm text-red-500">{form.formState.errors.confirmation.message}</p>}
            </div>
            <Button type="submit" className="w-full h-12 bg-[#122d54] hover:bg-[#0d1f3d]" disabled={submitting}>
              {submitting ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
