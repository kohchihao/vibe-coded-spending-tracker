CREATE TABLE recurring_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  frequency TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', 'yearly'
  interval_count INTEGER NOT NULL DEFAULT 1, -- e.g., every 2 weeks, every 3 months
  start_date DATE NOT NULL,
  end_date DATE,
  last_generated_date DATE,
  next_due_date DATE NOT NULL, -- Important for efficient querying
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'paused', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for efficient querying of due recurring transactions
CREATE INDEX idx_recurring_transactions_next_due_date 
ON recurring_transactions(next_due_date) 
WHERE status = 'active';

create table public.recurring_transactions (
  id bigint generated always as identity not null,
  user_id uuid not null,
  account_id bigint not null,
  category_id bigint not null,
  description text not null,
  amount numeric(12, 2) not null,
  frequency text not null,
  interval_count integer not null default 1,
  start_date date not null,
  end_date date null,
  last_generated_date date null,
  next_due_date date not null,
  status text not null default 'active'::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint recurring_transactions_pkey primary key (id),
  constraint recurring_transactions_account_id_fkey foreign KEY (account_id) references accounts (id) on delete CASCADE,
  constraint recurring_transactions_category_id_fkey foreign KEY (category_id) references categories (id) on delete RESTRICT,
  constraint recurring_transactions_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;