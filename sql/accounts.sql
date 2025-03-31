CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  currency TEXT NOT NULL DEFAULT 'SGD',
  balance DECIMAL(12,2) NOT NULL DEFAULT 0,
  icon TEXT,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, name)
);

create table public.accounts (
  id bigint generated always as identity not null,
  user_id uuid not null,
  name text not null,
  description text null,
  currency text not null default 'SGD'::text,
  balance numeric(12, 2) not null default 0,
  icon text null,
  archived boolean null default false,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint accounts_pkey primary key (id),
  constraint accounts_user_id_name_key unique (user_id, name),
  constraint accounts_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;