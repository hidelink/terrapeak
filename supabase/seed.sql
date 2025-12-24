-- Seed data for Terra Peak / RunnerCoach

-- Auth users (requires service role or SQL editor)
-- Password por defecto: Password123!
do $$
declare
  v_instance uuid := (select id from auth.instances limit 1);
begin
  insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, raw_app_meta_data)
  values
    ('11111111-1111-1111-1111-111111111111', v_instance, 'authenticated', 'authenticated', 'claudia.alonso@runnercoach.test', crypt('Password123!', gen_salt('bf')), now(), jsonb_build_object('name','Claudia Alonso'), jsonb_build_object('provider','email','providers',array['email'])),
    ('22222222-2222-2222-2222-222222222222', v_instance, 'authenticated', 'authenticated', 'cristina.lopez@runnercoach.test', crypt('Password123!', gen_salt('bf')), now(), jsonb_build_object('name','Cristina López'), jsonb_build_object('provider','email','providers',array['email'])),
    ('33333333-3333-3333-3333-333333333333', v_instance, 'authenticated', 'authenticated', 'carmen.perez@runnercoach.test', crypt('Password123!', gen_salt('bf')), now(), jsonb_build_object('name','Carmen Pérez'), jsonb_build_object('provider','email','providers',array['email'])),
    ('44444444-4444-4444-4444-444444444444', v_instance, 'authenticated', 'authenticated', 'obarboza+cliente@cyborgdev.io', crypt('Password123!', gen_salt('bf')), now(), jsonb_build_object('name','Oscar Barboza'), jsonb_build_object('provider','email','providers',array['email'])),
    ('55555555-5555-5555-5555-555555555555', v_instance, 'authenticated', 'authenticated', 'sara.ortiz18@runnercoach.test', crypt('Password123!', gen_salt('bf')), now(), jsonb_build_object('name','Sara Ortiz'), jsonb_build_object('provider','email','providers',array['email'])),
    ('66666666-6666-6666-6666-666666666666', v_instance, 'authenticated', 'authenticated', 'david.alvarez16@runnercoach.test', crypt('Password123!', gen_salt('bf')), now(), jsonb_build_object('name','David Álvarez'), jsonb_build_object('provider','email','providers',array['email']))
  on conflict (id) do update
    set encrypted_password = excluded.encrypted_password,
        email_confirmed_at = excluded.email_confirmed_at,
        raw_user_meta_data = excluded.raw_user_meta_data,
        raw_app_meta_data = excluded.raw_app_meta_data,
        instance_id = excluded.instance_id;
end $$;

insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values
  ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', jsonb_build_object('sub','11111111-1111-1111-1111-111111111111','email','claudia.alonso@runnercoach.test'), 'email', 'claudia.alonso@runnercoach.test', now(), now(), now()),
  ('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', jsonb_build_object('sub','22222222-2222-2222-2222-222222222222','email','cristina.lopez@runnercoach.test'), 'email', 'cristina.lopez@runnercoach.test', now(), now(), now()),
  ('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', jsonb_build_object('sub','33333333-3333-3333-3333-333333333333','email','carmen.perez@runnercoach.test'), 'email', 'carmen.perez@runnercoach.test', now(), now(), now()),
  ('44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', jsonb_build_object('sub','44444444-4444-4444-4444-444444444444','email','obarboza+cliente@cyborgdev.io'), 'email', 'obarboza+cliente@cyborgdev.io', now(), now(), now()),
  ('55555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', jsonb_build_object('sub','55555555-5555-5555-5555-555555555555','email','sara.ortiz18@runnercoach.test'), 'email', 'sara.ortiz18@runnercoach.test', now(), now(), now()),
  ('66666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', jsonb_build_object('sub','66666666-6666-6666-6666-666666666666','email','david.alvarez16@runnercoach.test'), 'email', 'david.alvarez16@runnercoach.test', now(), now(), now())
on conflict (id) do nothing;

-- Profiles
insert into public.profiles (id, email, name, role) values
  ('11111111-1111-1111-1111-111111111111', 'claudia.alonso@runnercoach.test', 'Claudia Alonso', 'coach'),
  ('22222222-2222-2222-2222-222222222222', 'cristina.lopez@runnercoach.test', 'Cristina López', 'coach'),
  ('33333333-3333-3333-3333-333333333333', 'carmen.perez@runnercoach.test', 'Carmen Pérez', 'coach'),
  ('44444444-4444-4444-4444-444444444444', 'obarboza+cliente@cyborgdev.io', 'Oscar Barboza', 'client'),
  ('55555555-5555-5555-5555-555555555555', 'sara.ortiz18@runnercoach.test', 'Sara Ortiz', 'client'),
  ('66666666-6666-6666-6666-666666666666', 'david.alvarez16@runnercoach.test', 'David Álvarez', 'client')
on conflict do nothing;

-- Coaches
insert into public.coaches (id, profile_id, status) values
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'aprobado'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '22222222-2222-2222-2222-222222222222', 'aprobado'),
  ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '33333333-3333-3333-3333-333333333333', 'aprobado')
on conflict do nothing;

-- Plans
insert into public.plans (id, name, price, currency, billing_period, features, is_featured) values
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Plan Equipo', 599.99, 'MXN', 'mensual',
   array['Seguimiento mensual','Plan de entrenamiento básico','Acceso a eventos locales','Soporte por email'], false),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'Plan Personalizado', 1199.99, 'MXN', 'mensual',
   array['Seguimiento diario','Plan ultra personalizado','Acceso VIP a eventos exclusivos','Soporte 24/7','Análisis avanzado de rendimiento','Consultas ilimitadas','Sesiones de coaching en vivo','Nutrición personalizada','Preparación para competiciones'],
   true)
on conflict do nothing;

-- Clients
insert into public.clients (id, profile_id, coach_id, plan_id, status) values
  ('ccccccc1-cccc-cccc-cccc-ccccccccccc1', '44444444-4444-4444-4444-444444444444', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'activo'),
  ('ccccccc2-cccc-cccc-cccc-ccccccccccc2', '55555555-5555-5555-5555-555555555555', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', null, 'activo'),
  ('ccccccc3-cccc-cccc-cccc-ccccccccccc3', '66666666-6666-6666-6666-666666666666', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', null, 'activo')
on conflict do nothing;

-- Payments
insert into public.payments (id, client_id, coach_id, amount, currency, method, status, paid_at) values
  ('ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 599.99, 'MXN', 'transferencia', 'pagado', '2025-11-12'),
  ('ddddddd2-dddd-dddd-dddd-ddddddddddd2', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 650.00, 'MXN', 'transferencia', 'pagado', '2025-11-12'),
  ('ddddddd3-dddd-dddd-dddd-ddddddddddd3', 'ccccccc3-cccc-cccc-cccc-ccccccccccc3', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 1199.99, 'MXN', 'transferencia', 'pendiente', '2025-11-12')
on conflict do nothing;

-- Events
insert into public.events (id, name, date, location, slots) values
  ('eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'Carrera Solidaria 06/2025', '2025-06-15', 'Playa del Este', '0'),
  ('eeeeeee2-eeee-eeee-eeee-eeeeeeeeeee2', 'Ultra Trail 50K 10/2025', '2025-10-20', 'Valle Verde', '0'),
  ('eeeeeee3-eeee-eeee-eeee-eeeeeeeeeee3', 'Carrera de Resistencia 11/2025', '2025-11-27', 'Centro Deportivo', '5'),
  ('eeeeeee4-eeee-eeee-eeee-eeeeeeeeeee4', 'Ultra Backyard 2025', '2025-12-12', 'La Soledad Bike Park, Zapopan, Jalisco', '9/250')
on conflict do nothing;

