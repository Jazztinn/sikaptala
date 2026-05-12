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

alter table public.profiles
  add column if not exists full_name text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists role text not null default 'parent_guardian',
  add column if not exists discoverable boolean not null default true,
  add column if not exists email text;

update public.profiles
set full_name = coalesce(nullif(full_name, ''), display_name, '')
where coalesce(nullif(full_name, ''), '') = '';

update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and p.email is null;

create index if not exists profiles_email_lower_idx
  on public.profiles (lower(email));

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  primary_guardian_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  date_of_birth date not null,
  gender text not null check (gender in ('male', 'female', 'other')),
  weight text,
  blood_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caregiver_invites (
  id uuid primary key default gen_random_uuid(),
  inviter_profile_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  invitee_email text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists caregiver_invites_unique_pending
  on public.caregiver_invites (inviter_profile_id, lower(invitee_email))
  where status = 'pending';

create table if not exists public.hmo_coverage (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  has_hmo boolean not null default false,
  provider_name text,
  benefits_tier text,
  benefits_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_chat_conversations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'New Chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_chat_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null default '',
  attachments jsonb not null default '[]'::jsonb,
  questions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ai_chat_conversations_profile_updated_idx
  on public.ai_chat_conversations (profile_id, updated_at desc);

create index if not exists ai_chat_messages_conversation_created_idx
  on public.ai_chat_messages (conversation_id, created_at asc);

create table if not exists public.symptom_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  conversation_id uuid references public.ai_chat_conversations(id) on delete set null,
  status text not null default 'in_progress' check (status in ('in_progress', 'complete', 'abandoned')),
  summary jsonb,
  summary_text text,
  chief_complaint text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists symptom_logs_profile_child_idx
  on public.symptom_logs (profile_id, child_id, updated_at desc);

drop trigger if exists children_updated_at on public.children;
create trigger children_updated_at
before update on public.children
for each row execute function public.handle_updated_at();

drop trigger if exists caregiver_invites_updated_at on public.caregiver_invites;
create trigger caregiver_invites_updated_at
before update on public.caregiver_invites
for each row execute function public.handle_updated_at();

drop trigger if exists hmo_coverage_updated_at on public.hmo_coverage;
create trigger hmo_coverage_updated_at
before update on public.hmo_coverage
for each row execute function public.handle_updated_at();

drop trigger if exists ai_chat_conversations_updated_at on public.ai_chat_conversations;
create trigger ai_chat_conversations_updated_at
before update on public.ai_chat_conversations
for each row execute function public.handle_updated_at();

drop trigger if exists symptom_logs_updated_at on public.symptom_logs;
create trigger symptom_logs_updated_at
before update on public.symptom_logs
for each row execute function public.handle_updated_at();

alter table public.children enable row level security;
alter table public.caregiver_invites enable row level security;
alter table public.hmo_coverage enable row level security;
alter table public.ai_chat_conversations enable row level security;
alter table public.ai_chat_messages enable row level security;
alter table public.symptom_logs enable row level security;

drop policy if exists "users_manage_own_children" on public.children;
create policy "users_manage_own_children"
on public.children
for all
using (auth.uid() = primary_guardian_id)
with check (auth.uid() = primary_guardian_id);

drop policy if exists "users_manage_own_caregiver_invites" on public.caregiver_invites;
create policy "users_manage_own_caregiver_invites"
on public.caregiver_invites
for all
using (auth.uid() = inviter_profile_id)
with check (auth.uid() = inviter_profile_id);

drop policy if exists "users_manage_own_hmo_coverage" on public.hmo_coverage;
create policy "users_manage_own_hmo_coverage"
on public.hmo_coverage
for all
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

drop policy if exists "users_manage_own_ai_chat_conversations" on public.ai_chat_conversations;
create policy "users_manage_own_ai_chat_conversations"
on public.ai_chat_conversations
for all
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

drop policy if exists "users_manage_own_ai_chat_messages" on public.ai_chat_messages;
create policy "users_manage_own_ai_chat_messages"
on public.ai_chat_messages
for all
using (
  exists (
    select 1
    from public.ai_chat_conversations c
    where c.id = ai_chat_messages.conversation_id
      and c.profile_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.ai_chat_conversations c
    where c.id = ai_chat_messages.conversation_id
      and c.profile_id = auth.uid()
  )
);

drop policy if exists "users_manage_own_symptom_logs" on public.symptom_logs;
create policy "users_manage_own_symptom_logs"
on public.symptom_logs
for all
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);
