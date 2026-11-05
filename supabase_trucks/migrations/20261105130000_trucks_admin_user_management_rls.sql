-- Keep self-service profile and role reads while allowing admins to manage
-- users through the trucks admin panel.

DROP POLICY IF EXISTS "Admins can view all user profiles" ON trucks.user_profiles;
CREATE POLICY "Admins can view all user profiles"
  ON trucks.user_profiles
  FOR SELECT
  TO authenticated
  USING (trucks.has_role(auth.uid(), 'admin'::trucks.app_role));

DROP POLICY IF EXISTS "Admins can manage user roles" ON trucks.user_roles;
CREATE POLICY "Admins can manage user roles"
  ON trucks.user_roles
  FOR ALL
  TO authenticated
  USING (trucks.has_role(auth.uid(), 'admin'::trucks.app_role))
  WITH CHECK (trucks.has_role(auth.uid(), 'admin'::trucks.app_role));
