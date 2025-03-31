import { supabase } from '../supabase';

// Types
export type Account = {
  id: number;
  user_id: string;
  name: string;
  description: string | null;
  currency: string;
  balance: number;
  icon: string | null;
  archived: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type AccountInsert = Omit<Account, 'id' | 'created_at' | 'updated_at'>;
export type AccountUpdate = Partial<
  Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at'>
>;

// CRUD Functions
export const accountsService = {
  // Create a new account
  create: async (account: AccountInsert): Promise<Account> => {
    const { data, error } = await supabase
      .from('accounts')
      .insert(account)
      .select()
      .single<Account>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all accounts for a user
  getAll: async (userId: string): Promise<Account[]> => {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .order('name')
      .overrideTypes<Account[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get a single account by ID
  getById: async (id: number): Promise<Account> => {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single<Account>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update an account
  update: async (id: number, account: AccountUpdate): Promise<Account> => {
    const { data, error } = await supabase
      .from('accounts')
      .update(account)
      .eq('id', id)
      .select()
      .single<Account>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete an account
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('accounts').delete().eq('id', id);

    if (error) throw new Error(error.message);
  },

  // Get active accounts (not archived)
  getActive: async (userId: string): Promise<Account[]> => {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('archived', false)
      .order('name')
      .overrideTypes<Account[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },
};
