/**
 * ForgotPasswordPage — Allows users to request a password reset email.
 * Accessible from the login page's "Esqueceu a senha?" link.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authApi } from '@/api';

const resetSchema = z.object({
    email: z.string().email('Email inválido'),
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<ResetFormData>({
        resolver: zodResolver(resetSchema),
        defaultValues: { email: '' },
    });

    const handleSubmit = async (data: ResetFormData) => {
        setIsSubmitting(true);
        const result = await authApi.resetPasswordForEmail(data.email);
        setIsSubmitting(false);

        if (result.error) {
            toast.error('Erro ao enviar email de recuperação. Tente novamente.');
            return;
        }

        setEmailSent(true);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
            {/* Abstract Background */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to auth */}
                <Link
                    to="/auth"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#122d54] mb-8 transition-colors text-sm font-medium group"
                >
                    <div className="p-1.5 rounded-full bg-white shadow-sm group-hover:shadow transition-all group-hover:-translate-x-1">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Voltar ao login
                </Link>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 ring-1 ring-slate-900/5">
                    {emailSent ? (
                        /* Success state */
                        <div className="text-center py-4">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-green-50">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Email enviado!</h2>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                Se existe uma conta com esse email, você receberá um link para redefinir sua senha.
                                Verifique sua caixa de entrada e spam.
                            </p>
                            <Link to="/auth">
                                <Button
                                    variant="outline"
                                    className="w-full h-12 rounded-xl font-medium"
                                >
                                    Voltar ao login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        /* Form state */
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-slate-800">Recuperar senha</h1>
                                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                                    Digite seu email e enviaremos um link para redefinir sua senha.
                                </p>
                            </div>

                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="reset-email" className="text-slate-600 font-medium text-sm ml-1">Email</Label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="reset-email"
                                            type="email"
                                            placeholder="seu@email.com"
                                            className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                                            {...form.register('email')}
                                        />
                                    </div>
                                    {form.formState.errors.email && (
                                        <p className="text-sm text-red-500 ml-1">{form.formState.errors.email.message}</p>
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
                                            <span>Enviando...</span>
                                        </div>
                                    ) : 'Enviar link de recuperação'}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
