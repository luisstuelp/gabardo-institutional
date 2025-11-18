import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminPostForm from '@/components/admin/AdminPostForm';
import type { Tables } from '@/integrations/supabase/type';

import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminBlogNewPostPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  const defaultData = {
    title: 'BNDES Gabardo',
    slug: 'bndes-gabardo',
    excerpt:
      'Em um ano desafiador, a parceria estratégica entre Gabardo e BNDES acelerou a retomada após as enchentes de 2024 e impulsionou novos investimentos em infraestrutura sustentável.',
    cover_image: '/images/Trans Gabardo - Framers produtora -5313.JPG',
    content: JSON.stringify([
      {
        type: 'paragraph',
        content:
          '2024 exigiu resiliência máxima da Gabardo. Após as enchentes de maio, reorganizamos operações, cuidamos das pessoas e mantivemos clientes informados enquanto buscávamos formas de acelerar a retomada com responsabilidade.',
      },
      {
        type: 'video',
        content: '/images/WhatsApp Video 2025-11-18 at 10.37.18 (1).mp4',
        caption: 'Vídeo institucional sobre a parceria BNDES Gabardo',
        autoplay: true,
        loop: true,
        muted: true,
        controls: true,
        linkLabel: 'Certificado de Verificação de Carbono',
        linkUrl: 'https://drive.google.com/file/d/1J4ItTI0_6yYVohR_V8UwPqOcxCw62Ay_/view',
      },
      {
        type: 'heading',
        content: 'BNDES como catalisador da retomada',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'A parceria com o BNDES foi decisiva para garantir liquidez e planejar investimentos de longo prazo. As linhas de crédito habilitaram modernização de frota, reforço da infraestrutura logística e aceleração de programas de sustentabilidade.',
      },
      {
        type: 'list',
        content: 'Investimentos prioritários viabilizados pelo BNDES:',
        items: [
          'Reforço dos centros logísticos estratégicos no Sul e Sudeste',
          'Renovação de frota com foco em padrões Euro 6 e eficiência energética',
          'Ampliação de tecnologias embarcadas para monitoramento em tempo real',
          'Expansão de painéis fotovoltaicos nas unidades operacionais',
        ],
      },
      {
        type: 'heading',
        content: 'Operar com responsabilidade é inegociável',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Seguimos transportando com segurança e responsabilidade ambiental. Como a primeira transportadora do mundo certificada como Carbono Negativo, consolidamos medições alinhadas ao GHG Protocol, ampliamos o uso de energia fotovoltaica e fortalecemos o programa Carbono Negativo Gabardo para compensação de emissões residuais.',
      },
      {
        type: 'quote',
        content:
          'A crise testou nossa estrutura, mas reforçou a convicção de que inovação, gestão de risco e sustentabilidade caminham juntas na Gabardo.',
        author: 'Diretoria Gabardo',
      },
      {
        type: 'heading',
        content: 'Próximos passos para 2026',
        level: 2,
      },
      {
        type: 'list',
        content: 'Focos estratégicos definidos após a parceria:',
        items: [
          'Dobrar a capacidade de armazenagem integrada com monitoramento inteligente',
          'Expandir a cobertura da malha sustentável no Nordeste',
          'Intensificar treinamentos de segurança viária e ESG para toda a equipe',
          'Compartilhar indicadores de carbono com clientes em tempo real',
        ],
      },
      {
        type: 'highlight',
        content:
          'Com apoio do BNDES, transformamos um período adverso em plataforma de crescimento sustentável, reforçando nosso compromisso de transportar com coragem, inovação e respeito ao meio ambiente.',
      },
    ]),
    published: true,
    category: 'Sustentabilidade',
    tags: ['BNDES', 'investimentos', 'sustentabilidade', 'retomada'],
    author: 'Equipe Gabardo',
    read_time: '4 min',
    featured: true,
    seo_description:
      'Confira como a parceria entre BNDES e Gabardo acelerou a retomada pós-enchente e fortaleceu investimentos sustentáveis na operação logística.',
    seo_keywords: ['BNDES', 'Gabardo', 'investimentos sustentáveis', 'logística automotiva'],
  } satisfies Partial<Tables<'posts'>>;

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminPostForm initialData={defaultData as Tables<'posts'>} />
    </AdminDashboardShell>
  );
}
