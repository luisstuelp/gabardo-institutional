export const TWEMOJI_BASE_URL = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg';

export type FlagIcon = {
  country: string;
  code: string;
};

export const FLAG_ICONS: FlagIcon[] = [
  { country: 'Brasil', code: '1f1e7-1f1f7' },
  { country: 'Argentina', code: '1f1e6-1f1f7' },
  { country: 'Uruguai', code: '1f1fa-1f1fe' },
  { country: 'Chile', code: '1f1e8-1f1f1' },
  { country: 'Bolívia', code: '1f1e7-1f1f4' },
  { country: 'Paraguai', code: '1f1f5-1f1fe' },
];

export const getFlagSrc = (code: string) => `${TWEMOJI_BASE_URL}/${code}.svg`;
