import { Link } from '@/lib/next-router-compat';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '@/types/database';
import gabardoLogo from '@/assets/gabardo-logo-white.png';

const footerLinks = {
  institutional: [
    { name: 'Sobre a Gabardo', href: 'https://www.transgabardo.com.br/sobre/secao-institucional', external: true },
    { name: 'Nossa História', href: 'https://www.transgabardo.com.br/sobre/historia', external: true },
    { name: 'Unidades', href: 'https://www.transgabardo.com.br/infraestrutura', external: true },
  ],
  vehicles: [
    { name: 'Todos os Caminhões', href: '/caminhoes', external: false },
    { name: 'Ofertas Especiais', href: '/caminhoes?ofertas=true', external: false },
    { name: 'Seminovos Selecionados', href: '/caminhoes?seminovos=true', external: false },
  ],
  support: [
    { name: 'Fale Conosco', href: 'https://www.transgabardo.com.br/contato', external: true },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: COMPANY_INFO.social.facebook },
  { name: 'Instagram', icon: Instagram, href: COMPANY_INFO.social.instagram },
  { name: 'LinkedIn', icon: Linkedin, href: COMPANY_INFO.social.linkedin },
  { name: 'YouTube', icon: Youtube, href: COMPANY_INFO.social.youtube },
];

// Helper component for internal/external links
function FooterLink({ href, external, children }: { href: string; external: boolean; children: React.ReactNode }) {
  const className = "text-slate-300 hover:text-white text-sm flex items-center gap-1 group transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#122d54] relative z-50 border-t-0" style={{ backgroundImage: 'none' }}>
      {/* Background blocker to ensure no underlying patterns show through */}
      <div className="absolute inset-0 bg-[#122d54] pointer-events-none -z-10" />

      {/* Main Footer */}
      <div className="container-gabardo py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={gabardoLogo.src}
                alt="Gabardo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Referência em venda de caminhões seminovos com procedência garantida.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2">
              {footerLinks.institutional.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href} external={link.external}>
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Veículos */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Veículos
            </h4>
            <ul className="space-y-2">
              {footerLinks.vehicles.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href} external={link.external}>
                    <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </FooterLink>
                </li>
              ))}
              {/* Contato link */}
              <li>
                <FooterLink href={footerLinks.support[0].href} external={true}>
                  <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {footerLinks.support[0].name}
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href={COMPANY_INFO.phoneLink}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Seg a Sex: 8h às 18h</span>
              </div>

              <a
                href={COMPANY_INFO.headquarters.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{COMPANY_INFO.headquarters.address}, {COMPANY_INFO.headquarters.city}/{COMPANY_INFO.headquarters.state}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0d1f3d] relative z-10">
        <div className="container-gabardo py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} {COMPANY_INFO.legalName}
            </p>
            <p className="text-slate-500 text-xs">
              CNPJ: {COMPANY_INFO.cnpj}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
