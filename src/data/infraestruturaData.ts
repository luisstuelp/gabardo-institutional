export interface Location {
  name: string;
  state: string;
  capacity: string;
  coordinates: [number, number];
  address: string;
  phone: string;
  type: 'matriz' | 'filial' | 'sede';
  region: 'Sul' | 'Centro Oeste/Sudeste' | 'Nordeste';
}

export const locations: Location[] = [
  {
    name: 'Anápolis',
    state: 'Goiás (GO)',
    capacity: '10.000 veículos',
    coordinates: [-48.953, -16.3266],
    address: 'Anápolis - GO',
    phone: '+55 62 4014-3000',
    type: 'filial',
    region: 'Centro Oeste/Sudeste',
  },
  {
    name: 'Piracicaba',
    state: 'São Paulo (SP)',
    capacity: '6.000 veículos',
    coordinates: [-47.6498, -22.7253],
    address: 'Piracicaba - SP',
    phone: '+55 19 2105-3000',
    type: 'filial',
    region: 'Centro Oeste/Sudeste',
  },
  {
    name: 'Pátio Jaraguá',
    state: 'São Paulo (SP)',
    capacity: '2.000 veículos',
    coordinates: [-46.7644, -23.4567],
    address: 'Pátios Jaragua - SP',
    phone: '+55 11 3906-3000',
    type: 'filial',
    region: 'Centro Oeste/Sudeste',
  },
  {
    name: 'São Paulo',
    state: 'São Paulo (SP)',
    capacity: '200 veículos',
    coordinates: [-46.5447, -23.6914],
    address: 'SBC - SP',
    phone: '+55 11 4341-3000',
    type: 'filial',
    region: 'Centro Oeste/Sudeste',
  },
  {
    name: 'Porto Real',
    state: 'Rio de Janeiro (RJ)',
    capacity: '4.000 veículos',
    coordinates: [-44.2917, -22.424],
    address: 'Porto Real - RJ',
    phone: '+55 24 3354-3000',
    type: 'filial',
    region: 'Centro Oeste/Sudeste',
  },
  {
    name: 'Rio de Janeiro',
    state: 'Rio de Janeiro (RJ)',
    capacity: '1.500 veículos',
    coordinates: [-43.3117, -22.7856],
    address: 'Duque de Caxias - RJ',
    phone: '+55 21 2674-3000',
    type: 'filial',
    region: 'Centro Oeste/Sudeste',
  },
  {
    name: 'Itajaí',
    state: 'Santa Catarina (SC)',
    capacity: '2.000 + 1.000 veículos',
    coordinates: [-48.663, -26.9078],
    address: 'Itajaí - SC',
    phone: '', // Not available in the provided data
    type: 'filial',
    region: 'Sul',
  },
  {
    name: 'Florianópolis',
    state: 'Santa Catarina (SC)',
    capacity: '150 veículos',
    coordinates: [-48.67, -27.6384],
    address: 'Palhoça - SC',
    phone: '+55 48 3259-3000',
    type: 'filial',
    region: 'Sul',
  },
  {
    name: 'Porto Alegre',
    state: 'Rio Grande do Sul (RS)',
    capacity: '400 veículos',
    coordinates: [-51.2177, -30.0346],
    address: 'Porto Alegre - RS',
    phone: '+55 51 3373-3000',
    type: 'matriz',
    region: 'Sul',
  },
  {
    name: 'Curitiba',
    state: 'Paraná (PR)',
    capacity: '400 veículos',
    coordinates: [-49.2063, -25.5335],
    address: 'S. J. Pinhais - PR',
    phone: '+55 41 3384-3000',
    type: 'filial',
    region: 'Sul',
  },
  {
    name: 'Fortaleza',
    state: 'Ceará (CE)',
    capacity: '200 veículos',
    coordinates: [-38.4507, -3.89],
    address: 'Eusébio - CE',
    phone: '+55 85 3257-6363',
    type: 'filial',
    region: 'Nordeste',
  },
];
