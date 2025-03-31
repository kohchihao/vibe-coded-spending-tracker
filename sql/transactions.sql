CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  recurring_id UUID,
  type TEXT NOT NULL, -- 'expense', 'income', 'transfer'
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  tags TEXT[], -- Array of tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


create table public.transactions (
  id bigint generated always as identity not null,
  user_id uuid not null,
  account_id bigint not null,
  category_id bigint not null,
  recurring_id bigint null,
  type text not null,
  description text not null,
  amount numeric(12, 2) not null,
  date date not null,
  notes text null,
  tags text[] null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint transactions_pkey primary key (id),
  constraint transactions_account_id_fkey foreign KEY (account_id) references accounts (id) on delete CASCADE,
  constraint transactions_category_id_fkey foreign KEY (category_id) references categories (id) on delete RESTRICT,
  constraint transactions_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;