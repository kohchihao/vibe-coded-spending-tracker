-- CREATE TABLE categories (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--   name TEXT NOT NULL,
--   type TEXT NOT NULL DEFAULT 'expense', -- 'expense' or 'income'
--   color TEXT,
--   icon TEXT,
--   budget_limit DECIMAL(12,2),
--   is_system BOOLEAN DEFAULT FALSE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   tags TEXT[],
--   UNIQUE(user_id, name)
-- );

create table public.categories (
  id bigint generated always as identity not null,
  user_id uuid null,
  name text not null,
  type text not null default 'expense'::text,
  color text null,
  icon text null,
  budget_limit numeric(12, 2) null,
  is_system boolean null default false,
  created_at timestamp with time zone null default now(),
  tags text[] null,
  constraint categories_pkey primary key (id),
  constraint categories_user_id_name_key unique (user_id, name),
  constraint categories_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;
