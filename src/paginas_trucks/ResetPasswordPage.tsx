'use client';

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from '@/lib/next-router-compat';
import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/api';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      toast.error('Link de redefinição inválido ou expirado.');
      return;
    }
    if (password.length < 6 || password !== confirmPassword) {
      toast.error(password !== confirmPassword ? 'As senhas não conferem.' : 'A senha deve ter ao menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);
    const result = await authApi.resetPassword(token, password);
    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    toast.success('Senha atualizada. Entre com sua nova senha.');
    navigate('/auth', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
        <Link to="/auth" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#122d54]">
          <ArrowLeft className="h-4 w-4" /> Voltar ao login
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Criar nova senha</h1>
        <p className="mt-2 mb-6 text-sm text-slate-500">Escolha uma nova senha para sua conta de caminhões.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input id="new-password" type="password" autoComplete="new-password" className="pl-10" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar senha</Label>
            <Input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-[#122d54] text-white hover:bg-[#0d1f3d]" disabled={isSubmitting || !token}>
            {isSubmitting ? 'Salvando...' : 'Atualizar senha'}
          </Button>
        </form>
      </div>
    </div>
  );
}
