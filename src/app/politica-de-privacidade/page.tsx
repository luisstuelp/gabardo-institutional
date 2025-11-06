import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Transportes Gabardo Ltda',
  description:
    'Conheça a Política de Privacidade da Transportes Gabardo Ltda e saiba como tratamos dados pessoais em conformidade com a LGPD.',
  alternates: {
    canonical: 'https://www.transgabardo.com.br/politica-de-privacidade',
  },
};

const LAST_UPDATE = '05 de outubro de 2024';

const sections: Array<{
  id: string;
  title: string;
  content: React.ReactNode;
}> = [
  {
    id: 'politica',
    title: 'POLÍTICA DE PRIVACIDADE DA TRANSPORTES GABARDO LTDA',
    content: (
      <>
        <p>
          A empresa Transportes Gabardo Ltda leva a privacidade de seus clientes, colaboradores e usuários muito a sério. Por essa razão,
          esclarecemos neste documento (POLÍTICA) a forma como são utilizados, armazenados, compartilhados e protegidos os dados pessoais
          tratados, para que você possa conhecer a cultura de proteção de dados desenvolvida e adotada pela empresa.
        </p>
      </>
    ),
  },
  {
    id: 'objetivo',
    title: 'OBJETIVO',
    content: (
      <>
        <p>
          A presente POLÍTICA visa informar aos clientes e usuários da Transportes Gabardo Ltda, titulares dos dados coletados e tratados, os
          meios a serem utilizados para o exercício dos direitos previstos na legislação aplicável, principalmente em relação à LEI GERAL
          DE PROTEÇÃO DE DADOS (LGPD) Lei Federal nº 13.709, de 14 de agosto de 2018, que rege as atividades que envolvem o tratamento de
          dados pessoais, tanto em meio físico quanto digital, por pessoa natural ou pessoa jurídica de direito público ou privado, com o
          objetivo de proteger a liberdade e a privacidade da pessoa humana.
        </p>
      </>
    ),
  },
  {
    id: 'dados-coletados',
    title: 'DADOS COLETADOS E TRATADOS',
    content: (
      <>
        <p>
          quando você visita ou utiliza o site ou os sistemas da Transportes Gabardo Ltda, os dados pessoais coletados podem ser divididos em
          três categorias:
        </p>
        <div className="space-y-2 pl-6">
          <p>a) DADOS QUE VOCÊ FORNECE: quando você interage com nossos serviços, você fornece alguns dados, que podem incluir nome completo, CPF, número de telefone, endereço de e-mail, data de nascimento, localização, dentre outros.</p>
          <p>b) DADOS COLETADOS AUTOMATICAMENTE: ao utilizar nosso site ou nossos sistemas, podem ser automaticamente coletados e armazenados alguns dados, tais como dados do dispositivo utilizado para acessar nossos serviços, endereço de IP, sistema operacional, geolocalização e identificador do dispositivo. Podem ainda ser coletados automaticamente dados de registros, como endereço de IP e suas atividades, como a data e a hora associadas ao seu uso, páginas e arquivos visualizados, pesquisas e outras ações realizadas, como as funcionalidades usadas.</p>
          <p>c) DADOS COLETADOS DE OUTRAS FONTES: para a segurança de nossas operações, poderemos coletar dados junto a bases de dados públicas, perfis públicos em redes sociais e junto a entidades de proteção ao crédito.</p>
        </div>
      </>
    ),
  },
  {
    id: 'utilizacao-dos-dados',
    title: 'UTILIZAÇÃO DOS DADOS COLETADOS',
    content: (
      <>
        <p>
          os dados coletados são utilizados pela Transportes Gabardo Ltda para as seguintes finalidades principais:
        </p>
        <div className="space-y-2 pl-6">
          <p>a) Cumprir as obrigações contratualmente assumidas com nossos clientes e usuários, verificação da sua respectiva identidade, cobrança de valores devidos, personalizar e aprimorar os serviços disponibilizados;</p>
          <p>b) Comunicar a clientes e usuários eventuais alterações ou novidades nos nossos produtos e serviços;</p>
          <p>c) Reforçar os procedimentos de segurança e proteção, para a prestação de serviços de forma mais segura e eficaz;</p>
          <p>d) Realização de operações internas, suporte, solução de problemas, análise de dados, testes, pesquisas e estatística;</p>
          <p>e) Avaliação da eficácia da publicidade veiculada, visando oferecer publicidades relevantes para o usuário;</p>
          <p>f) Gerenciamento de riscos, detecção, prevenção e remediação de fraudes ou outras atividades ilegais ou proibidas, além da violação de políticas, contratos ou termos de uso aplicáveis;</p>
          <p>g) Defender direitos em processos judiciais ou administrativos;</p>
          <p>h) Cumprir obrigações legais ou regulatórias, bem como cumprir determinações judiciais;</p>
          <p>i) Para outras finalidades em relação as quais será fornecido um aviso específico no momento da coleta, conforme autorizado ou exigido por lei.</p>
        </div>
      </>
    ),
  },
  {
    id: 'compartilhamento',
    title: 'COMPARTILHAMENTO DOS DADOS PESSOAIS',
    content: (
      <>
        <p>
          para a realização das nossas operações, nós poderemos compartilhar dados pessoais coletados com outras empresas e parceiros de
          negócio. Esse compartilhamento pode se dar com prestadores de serviço terceirizado, com entidades de proteção ao crédito, com
          órgãos reguladores autoridades judiciais ou administrativas, ou ainda com a sua expressa autorização, mediante consentimento e
          para uma finalidade determinada.
        </p>
      </>
    ),
  },
  {
    id: 'responsabilidade-terceiros',
    title: 'RESPONSABILIDADE PELO TRATAMENTO DE DADOS PESSOAIS REALIZADO POR TERCEIROS',
    content: (
      <>
        <p>
          a empresa Transportes Gabardo Ltda não é responsável pelas práticas de privacidade ou de segurança de dados pessoais adotadas pelos
          seus parceiros de negócios. Por esse motivo, recomendamos que o usuário ou cliente consulte as respectivas políticas de
          privacidade de dados dos nossos parceiros de negócios.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'COOKIES E TECNOLOGIAS DE RASTREAMENTO DE DADOS',
    content: (
      <>
        <p>
          a Transportes Gabardo Ltda e seus parceiros de negócios podem utilizar diversas tecnologias para coleta e armazenamento automático
          sobre o uso dos serviços disponibilizados. Essas tecnologias incluem cookies. As informações coletadas através do uso dessas
          tecnologias visam otimizar e personalizar a sua experiência de navegação, direcionar publicidade, desenvolver e aplicar
          funcionalidades de segurança e procedimentos de prevenção à fraude, sem prejuízo de outras utilizações legalmente possíveis.
        </p>
      </>
    ),
  },
  {
    id: 'transferencias',
    title: 'TRANSFERÊNCIAS INTERNACIONAIS DE DADOS PESSOAIS',
    content: (
      <>
        <p>
          no caso de transferência de dados pessoais para prestadores de serviços localizados fora do Brasil, tais como prestadores de
          serviços em nuvem, a Transportes Gabardo Ltda adotará medidas apropriadas para a garantia da adequada proteção dos seus dados
          pessoais, em atenção à legislação aplicável, inclusive mediante celebração de contratos de transferência de dados pessoais com
          terceiros, quando exigidos.
        </p>
      </>
    ),
  },
  {
    id: 'interacao-terceiros',
    title: 'INTERAÇÃO COM SITES DE TERCEIROS',
    content: (
      <>
        <p>
          ainda que possa disponibilizar links para sites de terceiros, a Transportes Gabardo Ltda não se responsabiliza pelo conteúdo destes
          sites e, portanto, não compartilha, subscreve, monitora, valida ou aceita a forma como estes sites ou ferramentas de
          armazenamento de conteúdo coletam, processam e transferem suas informações pessoais e privadas. Por isso é recomendável que você
          consulte as respectivas políticas de privacidade destes sites, para que possa estar informado do uso de suas informações e dados
          pessoais por terceiros.
        </p>
      </>
    ),
  },
  {
    id: 'seguranca',
    title: 'SEGURANÇA DOS DADOS PESSOAIS TRATADOS',
    content: (
      <>
        <p>
          a Transportes Gabardo Ltda zela pela segurança dos dados pessoais coletados e tratados através da utilização de ferramentas e
          soluções físicas e de TI que visam minimizar riscos de perda, mau uso, acesso não autorizado, invasão, divulgação e alteração,
          tais como firewalls e criptografia, controle de acesso físico e estabelecimento de níveis de autorização de acesso à
          informação.
        </p>
      </>
    ),
  },
  {
    id: 'direitos',
    title: 'DIREITOS DO TITULAR DE DADOS',
    content: (
      <>
        <p>
          conforme preconizado na LGPD, os titulares de dados pessoais podem exercer alguns direitos específicos, tais como:
        </p>
        <div className="space-y-2 pl-6">
          <p>a) Confirmar a existência do tratamento de dados pessoais;</p>
          <p>b) Acessar os dados pessoais, nos termos da lei;</p>
          <p>c) Correção dos dados incompletos, inexatos ou desatualizados;</p>
          <p>d) Portabilidade de dados;</p>
          <p>e) Exclusão dos dados, quando estes forem tratados com base no consentimento ou quando forem desnecessários, excessivos ou tratados em desconformidade com a lei;</p>
          <p>f) Solicitar informações sobre o uso compartilhado de dados;</p>
          <p>g) Revogar o consentimento, quando for o caso.</p>
        </div>
      </>
    ),
  },
  {
    id: 'exercicio-direitos',
    title: 'EXERCÍCIO DOS DIREITOS DO TITULAR',
    content: (
      <>
        <p>
          em caso de dúvida quanto à presente POLÍTICA ou para a solicitação do exercício de direitos, o titular poderá fazer contato com
          a Transportes Gabardo Ltda pelo e-mail: <a href="mailto:lgpd@transgabardo.com.br" className="text-gabardo-blue underline">lgpd@transgabardo.com.br</a>.
        </p>
        <p>
          Por motivos de segurança, o atendimento da solicitação dependerá da confirmação da autenticidade da identidade do titular, para
          o que poderão ser solicitados dados ou informações adicionais de comprovação.
        </p>
      </>
    ),
  },
  {
    id: 'termino',
    title: 'TÉRMINO DO TRATAMENTO DE DADOS',
    content: (
      <>
        <p>
          a presente POLÍTICA se aplica no decorrer de todo o tempo em que a Transportes Gabardo Ltda tratar os seus dados pessoais. Nós
          armazenamos as suas informações: a) pelo tempo exigido em lei; b) até o término do tratamento dos dados pessoais; ou c) pelo
          tempo necessário à preservação do legítimo interesse da Transportes Gabardo Ltda.
        </p>
      </>
    ),
  },
  {
    id: 'alteracoes',
    title: 'ALTERAÇÕES DESTA POLÍTICA DE PRIVACIDADE',
    content: (
      <>
        <p>
          a Transportes Gabardo Ltda reserva-se o direito de promover alterações na sua Política de Privacidade de Dados a qualquer tempo,
          mediante divulgação da versão atualizada em seu site, sempre que assim for necessário, seja em decorrência de evoluções no seu
          modelo de negócio, seja para melhor adequá-la ao cumprimento de disposições legais.
        </p>
      </>
    ),
  },
  {
    id: 'versao',
    title: 'VERSÃO',
    content: (
      <>
        <p>Versão atualizada em 05 de outubro de 2024.</p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <div className="section-container py-12 lg:py-16">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gabardo-light-blue">Transparência e Proteção de Dados</p>
          <h1 className="text-3xl font-semibold text-gabardo-blue md:text-4xl">Política de Privacidade</h1>
          <p className="text-sm text-neutral-600 md:text-base">
            Nesta página você encontra informações detalhadas sobre como a Transportes Gabardo Ltda trata dados pessoais e garante a
            conformidade com a LGPD. Leia atentamente e, em caso de dúvidas, fale com nosso time de privacidade.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Versão atualizada em {LAST_UPDATE}</p>
        </header>

        <nav className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-700">Sumário</h2>
          <ul className="mt-4 grid gap-2 text-sm text-gabardo-blue md:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="inline-flex items-center gap-2 rounded-full px-3 py-1 transition-colors hover:bg-gabardo-light-blue/10">
                  <span className="text-gabardo-blue/70">{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gabardo-blue">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base md:leading-loose">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 rounded-2xl border border-gabardo-light-blue/40 bg-gabardo-light-blue/10 p-6 text-sm text-neutral-700">
          <p>
            Caso tenha dúvidas adicionais sobre esta Política ou queira exercer seus direitos, envie um e-mail para{' '}
            <a href="mailto:lgpd@transgabardo.com.br" className="text-gabardo-blue underline">
              lgpd@transgabardo.com.br
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
