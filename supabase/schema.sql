-- Supabase schema for Terra Peak / RunnerCoach
-- Run with: supabase db push (if using Supabase CLI) or apply via SQL editor.

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Profiles (Supabase Auth user metadata mirror)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  name text,
  role text default 'user',
  created_at timestamptz default now()
);

-- Coaches
create table if not exists public.coaches (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles on delete cascade,
  status text default 'aprobado',
  created_at timestamptz default now()
);

-- Plans
create table if not exists public.plans (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric(10,2) not null,
  currency text default 'MXN',
  billing_period text default 'mensual',
  features text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Clients
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles on delete cascade,
  coach_id uuid references public.coaches on delete set null,
  plan_id uuid references public.plans on delete set null,
  status text default 'activo',
  created_at timestamptz default now()
);

-- Payments
create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients on delete cascade,
  coach_id uuid references public.coaches on delete set null,
  amount numeric(10,2) not null,
  currency text default 'MXN',
  method text default 'transferencia',
  status text default 'pagado',
  paid_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Events
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  date date not null,
  location text,
  slots text,
  created_at timestamptz default now()
);

-- Basic indexes
create index if not exists idx_coaches_profile on public.coaches(profile_id);
create index if not exists idx_clients_profile on public.clients(profile_id);
create index if not exists idx_clients_coach on public.clients(coach_id);
create index if not exists idx_payments_client on public.payments(client_id);
create index if not exists idx_payments_coach on public.payments(coach_id);
create index if not exists idx_payments_status on public.payments(status);

-- RLS
alter table public.profiles enable row level security;
alter table public.coaches enable row level security;
alter table public.clients enable row level security;
alter table public.payments enable row level security;
alter table public.events enable row level security;
alter table public.plans enable row level security;

-- Make policies idempotent: drop then create
drop policy if exists "profiles_select_auth" on public.profiles;
drop policy if exists "profiles_update_self" on public.profiles;
drop policy if exists "coaches_select_auth" on public.coaches;
drop policy if exists "coaches_insert_auth" on public.coaches;
drop policy if exists "coaches_update_auth" on public.coaches;
drop policy if exists "coaches_delete_auth" on public.coaches;
drop policy if exists "clients_select_auth" on public.clients;
drop policy if exists "clients_insert_auth" on public.clients;
drop policy if exists "clients_update_auth" on public.clients;
drop policy if exists "clients_delete_auth" on public.clients;
drop policy if exists "payments_select_auth" on public.payments;
drop policy if exists "payments_insert_auth" on public.payments;
drop policy if exists "payments_update_auth" on public.payments;
drop policy if exists "payments_delete_auth" on public.payments;
drop policy if exists "events_select_auth" on public.events;
drop policy if exists "plans_select_auth" on public.plans;
drop policy if exists "plans_insert_auth" on public.plans;
drop policy if exists "plans_update_auth" on public.plans;
drop policy if exists "plans_delete_auth" on public.plans;
drop policy if exists "events_insert_auth" on public.events;
drop policy if exists "events_update_auth" on public.events;
drop policy if exists "events_delete_auth" on public.events;

-- Policies (simple: authenticated can read; users manage own profile; admin role full)
create policy "profiles_select_auth" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id);

create policy "coaches_select_auth" on public.coaches
  for select using (auth.role() = 'authenticated');

create policy "coaches_insert_auth" on public.coaches
  for insert with check (auth.role() = 'authenticated');

create policy "coaches_update_auth" on public.coaches
  for update using (auth.role() = 'authenticated');

create policy "coaches_delete_auth" on public.coaches
  for delete using (auth.role() = 'authenticated');

create policy "clients_select_auth" on public.clients
  for select using (auth.role() = 'authenticated');

create policy "clients_insert_auth" on public.clients
  for insert with check (auth.role() = 'authenticated');

create policy "clients_update_auth" on public.clients
  for update using (auth.role() = 'authenticated');

create policy "clients_delete_auth" on public.clients
  for delete using (auth.role() = 'authenticated');

create policy "payments_select_auth" on public.payments
  for select using (auth.role() = 'authenticated');

create policy "payments_insert_auth" on public.payments
  for insert with check (auth.role() = 'authenticated');

create policy "payments_update_auth" on public.payments
  for update using (auth.role() = 'authenticated');

create policy "payments_delete_auth" on public.payments
  for delete using (auth.role() = 'authenticated');

create policy "events_select_auth" on public.events
  for select using (auth.role() = 'authenticated');

create policy "plans_select_auth" on public.plans
  for select using (auth.role() = 'authenticated');

-- Allow authenticated inserts/updates for plans and events (adjust as needed)
create policy "plans_insert_auth" on public.plans
  for insert with check (auth.role() = 'authenticated');

create policy "plans_update_auth" on public.plans
  for update using (auth.role() = 'authenticated');

create policy "plans_delete_auth" on public.plans
  for delete using (auth.role() = 'authenticated');

create policy "events_insert_auth" on public.events
  for insert with check (auth.role() = 'authenticated');

create policy "events_update_auth" on public.events
  for update using (auth.role() = 'authenticated');

create policy "events_delete_auth" on public.events
  for delete using (auth.role() = 'authenticated');

-- Admin bypass (optional): allow service role all
-- In Supabase, service role bypasses RLS by default.

