import { supabase } from '../supabase';

// Types
export type Category = {
  id: number;
  user_id: string | null;
  name: string;
  type: string;
  color: string | null;
  icon: string | null;
  budget_limit: number | null;
  is_system: boolean | null;
  created_at: string | null;
  tags: string[] | null;
};

export type CategoryInsert = Omit<Category, 'id' | 'created_at'>;
export type CategoryUpdate = Partial<
  Omit<Category, 'id' | 'user_id' | 'created_at'>
>;

// CRUD Functions
export const categoriesService = {
  // Create a new category
  create: async (category: CategoryInsert): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single<Category>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all categories for a user
  getAll: async (userId: string): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name')
      .overrideTypes<Category[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get a single category by ID
  getById: async (id: number): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single<Category>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update a category
  update: async (id: number, category: CategoryUpdate): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single<Category>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a category
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) throw new Error(error.message);
  },

  // Get categories by type (expense/income)
  getByType: async (
    userId: string,
    type: 'expense' | 'income'
  ): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('name')
      .overrideTypes<Category[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },
};
