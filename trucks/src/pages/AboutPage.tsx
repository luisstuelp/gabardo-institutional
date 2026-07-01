import { Building2, Target, Users, Award, Clock, MapPin, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO } from '@/types/database';

const values = [
  {
    icon: Shield,
    title: 'Confiança',
    description: 'Transparência em todas as negociações, com veículos de procedência garantida.',
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Rigoroso processo de seleção para oferecer apenas os melhores caminhões.',
  },
  {
    icon: Users,
    title: 'Atendimento',
    description: 'Consultores especializados prontos para encontrar a solução ideal para você.',
  },
  {
    icon: Clock,
    title: 'Agilidade',
    description: 'Processos rápidos e eficientes, do primeiro contato até a entrega do veículo.',
  },
];

const milestones = [
  { year: '1970', event: 'Fundação da Gabardo em Porto Alegre' },
  { year: '1985', event: 'Expansão para o interior do Rio Grande do Sul' },
  { year: '2000', event: 'Inauguração da matriz em Caxias do Sul' },
  { year: '2010', event: 'Alcance de 3.000 veículos comercializados' },
  { year: '2020', event: 'Digitalização completa e lançamento do e-commerce' },
  { year: '2024', event: 'Mais de 5.000 caminhões entregues com excelência' },
];

const team = [
  {
    name: 'Carlos Gabardo',
    role: 'Diretor Geral',
    description: 'Mais de 40 anos de experiência no mercado de caminhões.',
  },
  {
    name: 'Roberto Gabardo',
    role: 'Diretor Comercial',
    description: 'Especialista em negociações e relacionamento com clientes.',
  },
  {
    name: 'Equipe de Consultores',
    role: 'Vendas',
    description: 'Profissionais treinados para atender todas as necessidades.',
  },
  {
    name: 'Equipe Técnica',
    role: 'Avaliação',
    description: 'Mecânicos especializados em avaliação de veículos pesados.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-gabardo">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold font-montserrat mb-6">
              Sobre a Gabardo
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Há mais de 50 anos conectando empresas e transportadores aos melhores 
              caminhões seminovos do Brasil. Nossa tradição é construída sobre 
              confiança, qualidade e compromisso com cada cliente.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-secondary py-12">
        <div className="container-gabardo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-accent font-montserrat">50+</p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">Anos de mercado</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-accent font-montserrat">5.000+</p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">Veículos entregues</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-accent font-montserrat">3</p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">Filiais no RS</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-accent font-montserrat">98%</p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <section className="py-16 md:py-20">
        <div className="container-gabardo">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium text-accent uppercase tracking-wide">Nossa História</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-6">
                Tradição e Excelência no Mercado de Caminhões
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Gabardo nasceu em 1970, na cidade de Porto Alegre, com a visão de 
                  transformar o mercado de caminhões seminovos no Rio Grande do Sul. 
                  Desde o início, nosso compromisso sempre foi oferecer veículos de 
                  qualidade com transparência e honestidade.
                </p>
                <p>
                  Ao longo de mais de cinco décadas, crescemos e nos consolidamos como 
                  referência no setor. Hoje, com filiais estrategicamente localizadas, 
                  atendemos transportadores e empresas de todo o Brasil, mantendo os 
                  mesmos valores que nos trouxeram até aqui.
                </p>
                <p>
                  Nossa equipe é formada por profissionais apaixonados pelo que fazem, 
                  com conhecimento técnico e comercial para oferecer a melhor experiência 
                  na compra do seu próximo caminhão.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary rounded-xl p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Linha do Tempo
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-16 text-sm font-bold text-accent">
                      {milestone.year}
                    </div>
                    <div className="flex-1 pb-4 border-b border-border last:border-0 last:pb-0">
                      <p className="text-sm">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container-gabardo">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wide">Nossos Valores</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat">
              O que nos move
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="container-gabardo">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wide">Nossa Equipe</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat">
              Profissionais dedicados ao seu sucesso
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-accent text-center mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container-gabardo">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wide">Onde Estamos</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat">
              Filiais no Rio Grande do Sul
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <Truck className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Caxias do Sul</h3>
                <p className="text-sm text-primary-foreground/80">Matriz - Serra Gaúcha</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <Truck className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Porto Alegre</h3>
                <p className="text-sm text-primary-foreground/80">Região Metropolitana</p>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <Truck className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Passo Fundo</h3>
                <p className="text-sm text-primary-foreground/80">Norte do Estado</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container-gabardo text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
            Pronto para encontrar seu próximo caminhão?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudá-lo a encontrar o veículo ideal para o seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/caminhoes" className="btn-gabardo inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium">
              <Truck className="h-5 w-5 mr-2" />
              Ver Estoque
            </a>
            <a href="/contato" className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium border border-border bg-card hover:bg-secondary transition-colors">
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
