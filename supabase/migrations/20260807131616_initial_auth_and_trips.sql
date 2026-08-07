create extension if not exists "pgcrypto";

create type public.trip_member_role as enum (
  'owner',
  'editor',
  'viewer'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null,
  destination_country text not null default 'Japan',
  start_date date,
  end_date date,
  base_currency text not null default 'BRL',
  target_currency text not null default 'JPY',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint trips_slug_unique unique (slug),
  constraint trips_dates_valid check (
    start_date is null
    or end_date is null
    or end_date >= start_date
  )
);

create table public.trip_members (
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.trip_member_role not null default 'viewer',
  joined_at timestamptz not null default now(),

  primary key (trip_id, user_id)
);

create index trip_members_user_id_idx
  on public.trip_members(user_id);

create index trips_owner_id_idx
  on public.trips(owner_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    avatar_url
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.handle_new_trip()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.trip_members (
    trip_id,
    user_id,
    role
  )
  values (
    new.id,
    new.owner_id,
    'owner'
  );

  return new;
end;
$$;

create trigger on_trip_created
  after insert on public.trips
  for each row execute procedure public.handle_new_trip();


alter table public.profiles enable row level security;
alter table public.trips enable row level security;
alter table public.trip_members enable row level security;


create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);

create policy "trip_members_select_own"
on public.trip_members
for select
to authenticated
using (
  user_id = auth.uid()
);

create policy "trips_select_member"
on public.trips
for select
to authenticated
using (
  exists (
    select 1
    from public.trip_members
    where trip_members.trip_id = trips.id
      and trip_members.user_id = auth.uid()
  )
);

create policy "trips_insert_owner"
on public.trips
for insert
to authenticated
with check (
  owner_id = auth.uid()
);

create policy "trips_update_editor"
on public.trips
for update
to authenticated
using (
  exists (
    select 1
    from public.trip_members
    where trip_members.trip_id = trips.id
      and trip_members.user_id = auth.uid()
      and trip_members.role in ('owner', 'editor')
  )
);

