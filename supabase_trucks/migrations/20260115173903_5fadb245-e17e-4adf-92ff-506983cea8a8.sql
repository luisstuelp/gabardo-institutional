CREATE SCHEMA IF NOT EXISTS trucks;

-- Create enum for vehicle status
CREATE TYPE trucks.vehicle_status AS ENUM ('available', 'reserved', 'sold');

-- Create enum for fuel type
CREATE TYPE trucks.fuel_type AS ENUM ('diesel', 'gas', 'electric', 'hybrid');

-- Create enum for transmission type
CREATE TYPE trucks.transmission_type AS ENUM ('manual', 'automatic', 'automated');

-- Create branches table (filiais)
CREATE TABLE trucks.branches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  region TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  is_headquarters BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicles table
CREATE TABLE trucks.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year_manufacture INTEGER NOT NULL,
  year_model INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  mileage INTEGER NOT NULL,
  fuel trucks.fuel_type NOT NULL DEFAULT 'diesel',
  transmission trucks.transmission_type NOT NULL DEFAULT 'manual',
  axle_config TEXT,
  power TEXT,
  color TEXT,
  description TEXT,
  specs JSONB,
  fipe_code TEXT,
  fipe_value DECIMAL(12,2),
  is_featured BOOLEAN DEFAULT false,
  is_special_offer BOOLEAN DEFAULT false,
  is_semi_new BOOLEAN DEFAULT false,
  is_single_owner BOOLEAN DEFAULT false,
  status trucks.vehicle_status NOT NULL DEFAULT 'available',
  branch_id UUID REFERENCES trucks.branches(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicle_images table
CREATE TABLE trucks.vehicle_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES trucks.vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE trucks.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create app_role enum for user roles
CREATE TYPE trucks.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE trucks.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role trucks.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create favorites table
CREATE TABLE trucks.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES trucks.vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, vehicle_id)
);

-- Create leads table
CREATE TABLE trucks.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES trucks.vehicles(id) ON DELETE SET NULL,
  branch_id UUID REFERENCES trucks.branches(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chats table for AI assistant
CREATE TABLE trucks.chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE trucks.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID NOT NULL REFERENCES trucks.chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE trucks.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE trucks.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for branches (public read)
CREATE POLICY "Branches are viewable by everyone" ON trucks.branches FOR SELECT USING (true);

-- RLS Policies for vehicles (public read for available)
CREATE POLICY "Available vehicles are viewable by everyone" ON trucks.vehicles FOR SELECT USING (status = 'available');

-- RLS Policies for vehicle_images (public read)
CREATE POLICY "Vehicle images are viewable by everyone" ON trucks.vehicle_images FOR SELECT USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON trucks.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON trucks.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON trucks.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON trucks.user_roles FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for favorites
CREATE POLICY "Users can view their own favorites" ON trucks.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON trucks.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON trucks.favorites FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for leads (anyone can create, only owner can view)
CREATE POLICY "Anyone can create leads" ON trucks.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own leads" ON trucks.leads FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for chats
CREATE POLICY "Users can view their own chats" ON trucks.chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own chats" ON trucks.chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own chats" ON trucks.chats FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages in their chats" ON trucks.chat_messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM trucks.chats WHERE chats.id = chat_messages.chat_id AND chats.user_id = auth.uid()));
CREATE POLICY "Users can insert messages in their chats" ON trucks.chat_messages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM trucks.chats WHERE chats.id = chat_messages.chat_id AND chats.user_id = auth.uid()));

-- Create indexes for performance
CREATE INDEX idx_vehicles_brand ON trucks.vehicles(brand);
CREATE INDEX idx_vehicles_status ON trucks.vehicles(status);
CREATE INDEX idx_vehicles_featured ON trucks.vehicles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_vehicles_special_offer ON trucks.vehicles(is_special_offer) WHERE is_special_offer = true;
CREATE INDEX idx_vehicles_semi_new ON trucks.vehicles(is_semi_new) WHERE is_semi_new = true;
CREATE INDEX idx_vehicles_slug ON trucks.vehicles(slug);
CREATE INDEX idx_vehicle_images_vehicle_id ON trucks.vehicle_images(vehicle_id);
CREATE INDEX idx_favorites_user_id ON trucks.favorites(user_id);
CREATE INDEX idx_favorites_vehicle_id ON trucks.favorites(vehicle_id);
CREATE INDEX idx_leads_vehicle_id ON trucks.leads(vehicle_id);
CREATE INDEX idx_chats_user_id ON trucks.chats(user_id);
CREATE INDEX idx_chat_messages_chat_id ON trucks.chat_messages(chat_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION trucks.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = trucks, public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON trucks.vehicles FOR EACH ROW EXECUTE FUNCTION trucks.update_updated_at_column();
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON trucks.branches FOR EACH ROW EXECUTE FUNCTION trucks.update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON trucks.user_profiles FOR EACH ROW EXECUTE FUNCTION trucks.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON trucks.leads FOR EACH ROW EXECUTE FUNCTION trucks.update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON trucks.chats FOR EACH ROW EXECUTE FUNCTION trucks.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION trucks.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = trucks, public
AS $$
BEGIN
  INSERT INTO trucks.user_profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO trucks.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION trucks.handle_new_user();

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION trucks.has_role(_user_id UUID, _role trucks.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = trucks, public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM trucks.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
GRANT USAGE ON SCHEMA trucks TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA trucks TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA trucks TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA trucks GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA trucks GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
