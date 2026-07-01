/**
 * ProfilePage — User profile management.
 * Each field (name, email, phone, password) is independently editable.
 * Uses the API layer for all operations — never calls Supabase directly.
 */
import { useState, useEffect } from 'react';
import { useNavigate } from '@/lib/next-router-compat';
import { User, Mail, Phone, Lock, Save, ArrowLeft, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { profilesApi, authApi } from '@/api';
import { createLogger } from '@/lib/logger';

const logger = createLogger('ProfilePage');

/* ---------- Schemas ---------- */
const profileSchema = z.object({
    fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
});

const passwordSchema = z.object({
    newPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

/* ---------- Component ---------- */
export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, isLoading: authLoading } = useAuth();
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: { fullName: '', email: '', phone: '' },
    });

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/auth', { replace: true });
        }
    }, [user, authLoading, navigate]);

    // Load profile data
    useEffect(() => {
        async function loadProfile() {
            if (!user) return;

            const result = await profilesApi.getProfile(user.id);
            if (result.data) {
                profileForm.reset({
                    fullName: result.data.full_name || '',
                    email: result.data.email || user.email || '',
                    phone: result.data.phone || '',
                });
            } else {
                // Fallback to auth user data if no profile record
                profileForm.reset({
                    fullName: user.user_metadata?.full_name || '',
                    email: user.email || '',
                    phone: '',
                });
            }
            setIsLoadingProfile(false);
        }

        if (user) {
            loadProfile();
        }
    }, [user]);

    /* ---------- Handlers ---------- */
    const handleSaveProfile = async (data: ProfileFormData) => {
        if (!user) return;

        setIsSavingProfile(true);
        setProfileSaved(false);

        const result = await profilesApi.updateProfile(user.id, {
            full_name: data.fullName,
            email: data.email,
            phone: data.phone || undefined,
        });

        setIsSavingProfile(false);

        if (result.error) {
            logger.error('Failed to update profile', new Error(result.error.message));
            toast.error('Erro ao salvar perfil. Tente novamente.');
            return;
        }

        setProfileSaved(true);
        toast.success('Perfil atualizado com sucesso!');
        setTimeout(() => setProfileSaved(false), 3000);
    };

    const handleChangePassword = async (data: PasswordFormData) => {
        setIsSavingPassword(true);
        setPasswordChanged(false);

        const result = await authApi.changePassword(data.newPassword);

        setIsSavingPassword(false);

        if (result.error) {
            logger.error('Failed to change password', new Error(result.error.message));
            toast.error('Erro ao alterar senha. Tente novamente.');
            return;
        }

        setPasswordChanged(true);
        passwordForm.reset();
        toast.success('Senha alterada com sucesso!');
        setTimeout(() => setPasswordChanged(false), 3000);
    };

    /* ---------- Loading ---------- */
    if (authLoading || isLoadingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!user) return null;

    /* ---------- Render ---------- */
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container-gabardo py-8 max-w-2xl">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#122d54] mb-8 transition-colors text-sm font-medium group"
                >
                    <div className="p-1.5 rounded-full bg-white shadow-sm group-hover:shadow transition-all group-hover:-translate-x-1">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Voltar
                </button>

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Meu Perfil</h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        Gerencie suas informações pessoais e segurança da conta.
                    </p>
                </div>

                {/* Avatar Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#122d54] to-[#1e4b8a] flex items-center justify-center text-white text-xl font-bold">
                                {(profileForm.watch('fullName') || user.email || 'U').charAt(0).toUpperCase()}
                            </div>
                            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white shadow-md border border-slate-200 text-slate-400 hover:text-[#122d54] transition-colors">
                                <Camera className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <div>
                            <h2 className="font-semibold text-slate-800">{profileForm.watch('fullName') || 'Usuário'}</h2>
                            <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-800">Informações Pessoais</h3>
                        {profileSaved && (
                            <div className="flex items-center gap-1.5 text-green-600 text-sm">
                                <CheckCircle className="h-4 w-4" />
                                Salvo
                            </div>
                        )}
                    </div>

                    <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="profile-name" className="text-slate-600 font-medium text-sm ml-1">Nome completo</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                                    <User className="h-4 w-4" />
                                </div>
                                <Input
                                    id="profile-name"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                                    {...profileForm.register('fullName')}
                                />
                            </div>
                            {profileForm.formState.errors.fullName && (
                                <p className="text-sm text-red-500 ml-1">{profileForm.formState.errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="profile-email" className="text-slate-600 font-medium text-sm ml-1">Email</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <Input
                                    id="profile-email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                                    {...profileForm.register('email')}
                                />
                            </div>
                            {profileForm.formState.errors.email && (
                                <p className="text-sm text-red-500 ml-1">{profileForm.formState.errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="profile-phone" className="text-slate-600 font-medium text-sm ml-1">Telefone</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <Input
                                    id="profile-phone"
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                                    {...profileForm.register('phone')}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-[#122d54] to-[#1e4b8a] hover:from-[#0d1f3d] hover:to-[#122d54] text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-medium text-base"
                            disabled={isSavingProfile}
                        >
                            {isSavingProfile ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Salvando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    <span>Salvar alterações</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Password Change */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Alterar Senha</h3>
                            <p className="text-sm text-slate-500 mt-0.5">Mantenha sua conta segura com uma senha forte.</p>
                        </div>
                        {passwordChanged && (
                            <div className="flex items-center gap-1.5 text-green-600 text-sm">
                                <CheckCircle className="h-4 w-4" />
                                Alterada
                            </div>
                        )}
                    </div>

                    <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-5">
                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-slate-600 font-medium text-sm ml-1">Nova senha</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <Input
                                    id="new-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                                    {...passwordForm.register('newPassword')}
                                />
                            </div>
                            {passwordForm.formState.errors.newPassword && (
                                <p className="text-sm text-red-500 ml-1">{passwordForm.formState.errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirm-new-password" className="text-slate-600 font-medium text-sm ml-1">Confirmar nova senha</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-500 transition-colors">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <Input
                                    id="confirm-new-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 rounded-xl"
                                    {...passwordForm.register('confirmPassword')}
                                />
                            </div>
                            {passwordForm.formState.errors.confirmPassword && (
                                <p className="text-sm text-red-500 ml-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full h-12 rounded-xl font-medium text-base border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                            disabled={isSavingPassword}
                        >
                            {isSavingPassword ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-slate-400/20 border-t-slate-500 rounded-full animate-spin" />
                                    <span>Alterando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    <span>Alterar senha</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
