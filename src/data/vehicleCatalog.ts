export type VehicleCatalog = Record<string, Record<string, string[]>>;

export const vehicleCatalog = {
  Automóvel: {
    Chevrolet: ['Onix', 'Onix Plus', 'Cruze', 'Tracker'],
    Fiat: ['Argo', 'Cronos', 'Pulse', 'Mobi'],
    Volkswagen: ['Gol', 'Polo', 'Virtus', 'Nivus'],
    Toyota: ['Corolla', 'Yaris Hatch', 'Yaris Sedan', 'GR Corolla'],
    Hyundai: ['HB20', 'HB20S', 'Creta', 'Azera'],
  },
  SUV: {
    Jeep: ['Renegade', 'Compass', 'Commander', 'Grand Cherokee'],
    Toyota: ['SW4', 'Corolla Cross', 'RAV4', 'Hilux SW4'],
    Hyundai: ['Creta', 'Santa Fe', 'Tucson', 'ix35'],
    Volkswagen: ['Tiguan Allspace', 'Taos', 'T-Cross Highline'],
    Chevrolet: ['Trailblazer', 'Equinox', 'Tracker Premier'],
  },
  Pickup: {
    Chevrolet: ['S10', 'Montana', 'Silverado'],
    Ford: ['Ranger', 'Maverick', 'F-150'],
    Toyota: ['Hilux', 'Hilux GR-Sport'],
    Fiat: ['Toro', 'Strada Ranch'],
    Volkswagen: ['Amarok', 'Saveiro Cross'],
  },
  'Utilitário leve': {
    'Mercedes-Benz': ['Sprinter Furgão', 'Sprinter Street', 'Vito Tourer'],
    Fiat: ['Ducato Cargo', 'Ducato Multi', 'Fiorino Hard Working'],
    Renault: ['Master Chassi', 'Kangoo Express', 'Master Furgão'],
    Peugeot: ['Boxer Cargo', 'Expert', 'Partner Rapid'],
    'Citroën': ['Jumper Cargo', 'Jumpy Minibus'],
  },
  Caminhão: {
    Volvo: ['FH 540', 'VM 270', 'FMX 500'],
    Scania: ['R 500', 'G 410', 'P 360'],
    'Mercedes-Benz': ['Actros 2651', 'Atego 2430', 'Accelo 1316'],
    Iveco: ['Hi-Way 490', 'Tector 240E30', 'Daily City'],
    Volkswagen: ['Constellation 25.390', 'Delivery 11.180', 'Meteor 29.520'],
  },
  Motocicleta: {
    Honda: ['CG 160', 'Biz 125', 'CB 500X', 'Africa Twin'],
    Yamaha: ['Fazer 250', 'MT-07', 'Tracer 900', 'Factor 150'],
    BMW: ['G 310 GS', 'F 850 GS', 'R 1250 GS'],
    Ducati: ['Monster 797', 'Multistrada V4'],
    Kawasaki: ['Ninja 400', 'Versys 650', 'Z900'],
  },
  'Maquinaria agrícola': {
    'John Deere': ['6M 125', '7J 290', '8R 370'],
    Massey: ['MF 4707', 'MF 7726 Dyna-VT', 'MF 8690'],
    Valtra: ['BH 194 HiTech', 'A144 HiTech', 'T CVT 250'],
    Case: ['Puma 200', 'Magnum 340', 'Farmall 110'],
    'New Holland': ['T7.260', 'T8.380', 'TC5090'],
  },
  Outro: {
    Especial: ['Veículo customizado', 'Protótipo', 'Colecionável'],
  },
} satisfies VehicleCatalog;
