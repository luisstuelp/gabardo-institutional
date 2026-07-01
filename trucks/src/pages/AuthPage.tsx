import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Truck, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, signIn, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (user && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, from]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const { error } = await signIn(data.email, data.password);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email ou senha incorretos');
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }
      return;
    }

    toast.success('Login realizado com sucesso!');
    navigate(from, { replace: true });
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes('already registered')) {
        toast.error('Este email já está cadastrado');
      } else {
        toast.error('Erro ao criar conta. Tente novamente.');
      }
      return;
    }

    toast.success('Conta criada com sucesso!');
    navigate(from, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
      {/* Abstract Background */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-amber-400 opacity-20 blur-[100px]"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#122d54] mb-8 transition-colors text-sm font-medium group"
        >
          <div className="p-1.5 rounded-full bg-white shadow-sm group-hover:shadow transition-all group-hover:-translate-x-1">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Voltar ao início
        </Link>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 ring-1 ring-slate-900/5">
          {/* Header */}
          <div className="text-center mb-8">

            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Acesse sua conta para gerenciar favoritos e acompanhar propostas
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <div className="relative mb-8">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100/50 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#122d54] data-[state=active]:shadow-sm transition-all duration-300"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#122d54] data-[state=active]:shadow-sm transition-all duration-300"
                >
                  Cadastrar
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Login Tab */}
            <TabsContent value="login" className="focus-visible:outline-none focus-visible:ring-0">
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-600 font-medium text-sm ml-1">Email</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                      {...loginForm.register('email')}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500 ml-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="login-password" className="text-slate-600 font-medium text-sm">Senha</Label>
                    <Link to="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                      {...loginForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500 ml-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#122d54] to-[#1e4b8a] hover:from-[#0d1f3d] hover:to-[#122d54] text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-medium text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Entrando...</span>
                    </div>
                  ) : 'Entrar na conta'}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="focus-visible:outline-none focus-visible:ring-0">
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-slate-600 font-medium text-sm ml-1">Nome completo</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome"
                      className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                      {...signupForm.register('fullName')}
                    />
                  </div>
                  {signupForm.formState.errors.fullName && (
                    <p className="text-sm text-red-500 ml-1">{signupForm.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-600 font-medium text-sm ml-1">Email</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                      {...signupForm.register('email')}
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-red-500 ml-1">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-slate-600 font-medium text-sm ml-1">Senha</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                      {...signupForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-red-500 ml-1">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="text-slate-600 font-medium text-sm ml-1">Confirmar senha</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="signup-confirm"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                      {...signupForm.register('confirmPassword')}
                    />
                  </div>
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500 ml-1">{signupForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#122d54] to-[#1e4b8a] hover:from-[#0d1f3d] hover:to-[#122d54] text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-medium text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Criando conta...</span>
                    </div>
                  ) : 'Criar conta'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
