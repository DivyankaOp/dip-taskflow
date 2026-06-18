-- =====================================================================
-- TaskFlow / DIP Projects schema
-- Run this whole file once in Supabase → SQL Editor → New query → Run.
-- (Reflects the live, reset schema as of this version — includes the
-- verification + tickets feature additions.)
-- =====================================================================

create extension if not exists pgcrypto;

-- ============ USERS (login + role) ============
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  full_name text not null,
  department text,
  designation text,
  role text not null check (role in ('admin', 'employee')),
  is_active boolean not null default true,
  can_verify boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ MASTER DATA (used to fill dropdowns) ============
create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  client_name text,
  project_type text,
  location text,
  start_date date,
  expected_end_date date,
  status text default 'Planning',
  description text,
  created_at timestamptz not null default now(),
  team_leader_id uuid references users(id),
  coordinator_id uuid references users(id),
  site_incharge_id uuid references users(id)
);

create table if not exists task_types (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

-- ============ TASKS ============
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  department_id uuid references departments(id),
  project_id uuid references projects(id),
  task_type_id uuid references task_types(id),
  assigned_to uuid not null references users(id) on delete cascade,
  assigned_by uuid not null references users(id),
  description text not null,
  hours_to_complete numeric,
  target_date timestamptz not null,
  priority text not null default 'Medium' check (priority in ('Low', 'Medium', 'High')),
  rescheduling_possible boolean not null default false,
  attachment_url text,
  voice_note_url text,
  status text not null default 'Pending' check (status in ('Pending', 'In Progress', 'Completed', 'Rejected')),
  status_note text,
  verifier_id uuid references users(id),
  verification_status text check (verification_status in ('Pending Verification', 'Verified', 'Verification Rejected')),
  verification_note text,
  created_at timestamptz not null default now()
);

-- Postgres auto-names these constraints "tasks_assigned_to_fkey",
-- "tasks_assigned_by_fkey" and "tasks_verifier_id_fkey" — the backend's
-- nested-select query (routes/tasks.js → TASK_SELECT) relies on exactly
-- those names, so don't rename them.

create index if not exists idx_tasks_assigned_to on tasks(assigned_to);
create index if not exists idx_tasks_status on tasks(status);

-- ============ TICKETS ============
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete set null,
  raised_by uuid not null references users(id),
  description text not null,
  status text not null default 'Open' check (status in ('Open', 'Resolved')),
  created_at timestamptz not null default now()
);

-- ============ STORAGE BUCKET (for attachments + voice notes) ============
-- Public bucket so the file links the frontend renders just work.
insert into storage.buckets (id, name, public)
values ('task-files', 'task-files', true)
on conflict (id) do nothing;

-- ============ ROW LEVEL SECURITY ============
-- The backend talks to Supabase using the service_role key, which bypasses
-- RLS entirely — so the app works fine without any policies. We still turn
-- RLS on as a safety net in case the anon/public key is ever used directly
-- from a browser; with RLS on and no policies, that key gets zero access.
alter table users enable row level security;
alter table departments enable row level security;
alter table projects enable row level security;
alter table task_types enable row level security;
alter table tasks enable row level security;
alter table tickets enable row level security;
