-- Public customer registration writes to trucks.users via the server API.
-- These catalog tables extend the truck inventory without mixing item types.

CREATE OR REPLACE FUNCTION trucks.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS trucks.generic_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Veículo',
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year_manufacture INTEGER NOT NULL DEFAULT 0,
  year_model INTEGER NOT NULL DEFAULT 0,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  mileage BIGINT NOT NULL DEFAULT 0 CHECK (mileage >= 0),
  fuel trucks.fuel_type NOT NULL DEFAULT 'gas',
  transmission trucks.transmission_type NOT NULL DEFAULT 'manual',
  axle_config TEXT,
  power TEXT,
  color TEXT,
  description TEXT,
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  fipe_code TEXT,
  fipe_value NUMERIC(12, 2),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_special_offer BOOLEAN NOT NULL DEFAULT FALSE,
  is_semi_new BOOLEAN NOT NULL DEFAULT FALSE,
  is_single_owner BOOLEAN NOT NULL DEFAULT FALSE,
  status trucks.vehicle_status NOT NULL DEFAULT 'available',
  branch_id UUID REFERENCES trucks.branches(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trucks.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Equipamento',
  brand TEXT,
  model TEXT,
  condition TEXT,
  year_manufacture INTEGER NOT NULL DEFAULT 0,
  year_model INTEGER NOT NULL DEFAULT 0,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  description TEXT,
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status trucks.vehicle_status NOT NULL DEFAULT 'available',
  branch_id UUID REFERENCES trucks.branches(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trucks.generic_vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES trucks.generic_vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trucks.equipment_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES trucks.equipment(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS generic_vehicles_status_created_idx ON trucks.generic_vehicles (status, created_at DESC);
CREATE INDEX IF NOT EXISTS generic_vehicles_brand_model_idx ON trucks.generic_vehicles (brand, model);
CREATE INDEX IF NOT EXISTS generic_vehicles_price_idx ON trucks.generic_vehicles (price);
CREATE INDEX IF NOT EXISTS equipment_status_created_idx ON trucks.equipment (status, created_at DESC);
CREATE INDEX IF NOT EXISTS equipment_category_idx ON trucks.equipment (category);
CREATE INDEX IF NOT EXISTS generic_vehicle_images_order_idx ON trucks.generic_vehicle_images (vehicle_id, display_order);
CREATE INDEX IF NOT EXISTS equipment_images_order_idx ON trucks.equipment_images (vehicle_id, display_order);
CREATE UNIQUE INDEX IF NOT EXISTS generic_vehicle_images_one_primary_idx ON trucks.generic_vehicle_images (vehicle_id) WHERE is_primary;
CREATE UNIQUE INDEX IF NOT EXISTS equipment_images_one_primary_idx ON trucks.equipment_images (vehicle_id) WHERE is_primary;

DROP TRIGGER IF EXISTS generic_vehicles_set_updated_at ON trucks.generic_vehicles;
CREATE TRIGGER generic_vehicles_set_updated_at BEFORE UPDATE ON trucks.generic_vehicles
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();
DROP TRIGGER IF EXISTS equipment_set_updated_at ON trucks.equipment;
CREATE TRIGGER equipment_set_updated_at BEFORE UPDATE ON trucks.equipment
  FOR EACH ROW EXECUTE FUNCTION trucks.set_updated_at();

ALTER TABLE trucks.favorites ALTER COLUMN vehicle_id DROP NOT NULL;
ALTER TABLE trucks.favorites ADD COLUMN IF NOT EXISTS listing_type TEXT NOT NULL DEFAULT 'truck';
ALTER TABLE trucks.favorites ADD COLUMN IF NOT EXISTS generic_vehicle_id UUID REFERENCES trucks.generic_vehicles(id) ON DELETE CASCADE;
ALTER TABLE trucks.favorites ADD COLUMN IF NOT EXISTS equipment_id UUID REFERENCES trucks.equipment(id) ON DELETE CASCADE;
CREATE UNIQUE INDEX IF NOT EXISTS favorites_generic_vehicle_unique_idx
  ON trucks.favorites (user_id, generic_vehicle_id) WHERE generic_vehicle_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS favorites_equipment_unique_idx
  ON trucks.favorites (user_id, equipment_id) WHERE equipment_id IS NOT NULL;

ALTER TABLE trucks.leads ADD COLUMN IF NOT EXISTS listing_type TEXT NOT NULL DEFAULT 'truck';
ALTER TABLE trucks.leads ADD COLUMN IF NOT EXISTS generic_vehicle_id UUID REFERENCES trucks.generic_vehicles(id) ON DELETE SET NULL;
ALTER TABLE trucks.leads ADD COLUMN IF NOT EXISTS equipment_id UUID REFERENCES trucks.equipment(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS leads_generic_vehicle_id_idx ON trucks.leads (generic_vehicle_id);
CREATE INDEX IF NOT EXISTS leads_equipment_id_idx ON trucks.leads (equipment_id);

ALTER TABLE trucks.generic_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.generic_vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.equipment_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view available generic vehicles" ON trucks.generic_vehicles;
CREATE POLICY "Public can view available generic vehicles" ON trucks.generic_vehicles
  FOR SELECT TO anon, authenticated USING (status = 'available');
DROP POLICY IF EXISTS "Admins manage generic vehicles" ON trucks.generic_vehicles;
CREATE POLICY "Admins manage generic vehicles" ON trucks.generic_vehicles
  FOR ALL TO authenticated USING (trucks.has_role(auth.uid(), 'admin'))
  WITH CHECK (trucks.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view available equipment" ON trucks.equipment;
CREATE POLICY "Public can view available equipment" ON trucks.equipment
  FOR SELECT TO anon, authenticated USING (status = 'available');
DROP POLICY IF EXISTS "Admins manage equipment" ON trucks.equipment;
CREATE POLICY "Admins manage equipment" ON trucks.equipment
  FOR ALL TO authenticated USING (trucks.has_role(auth.uid(), 'admin'))
  WITH CHECK (trucks.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view generic vehicle images" ON trucks.generic_vehicle_images;
CREATE POLICY "Public can view generic vehicle images" ON trucks.generic_vehicle_images
  FOR SELECT TO anon, authenticated USING (EXISTS (
    SELECT 1 FROM trucks.generic_vehicles v WHERE v.id = vehicle_id AND v.status = 'available'
  ));
DROP POLICY IF EXISTS "Admins manage generic vehicle images" ON trucks.generic_vehicle_images;
CREATE POLICY "Admins manage generic vehicle images" ON trucks.generic_vehicle_images
  FOR ALL TO authenticated USING (trucks.has_role(auth.uid(), 'admin'))
  WITH CHECK (trucks.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view equipment images" ON trucks.equipment_images;
CREATE POLICY "Public can view equipment images" ON trucks.equipment_images
  FOR SELECT TO anon, authenticated USING (EXISTS (
    SELECT 1 FROM trucks.equipment e WHERE e.id = vehicle_id AND e.status = 'available'
  ));
DROP POLICY IF EXISTS "Admins manage equipment images" ON trucks.equipment_images;
CREATE POLICY "Admins manage equipment images" ON trucks.equipment_images
  FOR ALL TO authenticated USING (trucks.has_role(auth.uid(), 'admin'))
  WITH CHECK (trucks.has_role(auth.uid(), 'admin'));

GRANT SELECT ON trucks.generic_vehicles, trucks.equipment,
  trucks.generic_vehicle_images, trucks.equipment_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON trucks.generic_vehicles, trucks.equipment,
  trucks.generic_vehicle_images, trucks.equipment_images TO authenticated;

COMMENT ON TABLE trucks.generic_vehicles IS 'Anúncios de veículos genéricos, como carros, motos, vans e tratores.';
COMMENT ON TABLE trucks.equipment IS 'Anúncios de equipamentos à venda.';

