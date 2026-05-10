create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  username text unique,
  avatar_url text,
  outcome text,
  intent text,
  personalization text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  id uuid primary key references auth.users(id) on delete cascade,
  email_notifications boolean not null default true,
  in_app_notifications boolean not null default true,
  product_tips boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('info', 'success', 'warning')),
  title text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  subject text not null,
  category text not null check (category in ('bug', 'account', 'feedback', 'other')),
  message text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

drop trigger if exists settings_updated_at on public.user_settings;
create trigger settings_updated_at
before update on public.user_settings
for each row execute function public.handle_updated_at();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.notifications enable row level security;
alter table public.support_requests enable row level security;

create policy "users_manage_own_profile"
on public.profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "users_manage_own_settings"
on public.user_settings
for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "users_read_own_notifications"
on public.notifications
for select
using (auth.uid() = user_id);

create policy "users_update_own_notifications"
on public.notifications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_insert_own_notifications"
on public.notifications
for insert
with check (auth.uid() = user_id);

create policy "users_manage_own_support"
on public.support_requests
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
