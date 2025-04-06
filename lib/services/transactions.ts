import { supabase } from '../supabase';

// Types
export type Transaction = {
  id: number;
  user_id: string;
  account_id: number;
  category_id: number;
  recurring_id: number | null;
  type: 'expense' | 'income' | 'transfer';
  description: string;
  amount: number;
  date: string;
  notes: string | null;
  tags: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};

export type TransactionWithDetails = Transaction & {
  account_name: string;
  category_name: string;
  category_color: string | null;
  category_icon: string | null;
};

export type MonthlyTotals = {
  total_expenses: number;
  total_income: number;
  total_transfers: number;
  account_expenses: AccountExpense[];
};

type AccountExpense = {
  id: number;
  name: string;
  total: number;
};

export type TransactionInsert = Omit<
  Transaction,
  'id' | 'created_at' | 'updated_at'
>;
export type TransactionUpdate = Partial<
  Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>
>;

export type ExpenseBreakdown = {
  category_name: string;
  amount: number;
  percentage: number;
  category_color: string;
  category_icon: string;
  category_id: number;
};

// Helper function to get first and last day of current month
const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    startDate: firstDay.toISOString().split('T')[0],
    endDate: lastDay.toISOString().split('T')[0],
  };
};

// CRUD Functions
export const transactionsService = {
  // Create a new transaction
  create: async (transaction: TransactionInsert): Promise<Transaction> => {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single<Transaction>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all transactions for a user
  getAll: async (userId: string): Promise<Transaction[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .overrideTypes<Transaction[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get a single transaction by ID
  getById: async (id: number): Promise<Transaction> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single<Transaction>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update a transaction
  update: async (
    id: number,
    transaction: TransactionUpdate
  ): Promise<Transaction> => {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single<Transaction>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a transaction
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);

    if (error) throw new Error(error.message);
  },

  // Get transactions by date range
  getByDateRange: async (
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<TransactionWithDetails[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        account:accounts(name),
        category:categories(name, color, icon)
      `
      )
      .eq('user_id', userId)
      .gt('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map((transaction) => ({
      ...transaction,
      account_name: transaction.account.name,
      category_name: transaction.category.name,
      category_color: transaction.category.color,
      category_icon: transaction.category.icon,
    }));
  },

  // Get transactions by account
  getByAccount: async (accountId: number): Promise<Transaction[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('account_id', accountId)
      .order('date', { ascending: false })
      .overrideTypes<Transaction[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get transactions by category
  getByCategory: async (categoryId: number): Promise<Transaction[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('category_id', categoryId)
      .order('date', { ascending: false })
      .overrideTypes<Transaction[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get transactions by type
  getByType: async (
    userId: string,
    type: 'expense' | 'income' | 'transfer'
  ): Promise<Transaction[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('date', { ascending: false })
      .overrideTypes<Transaction[], { merge: false }>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get recent transactions with details
  getRecentTransactions: async (
    userId: string,
    limit: number = 10
  ): Promise<TransactionWithDetails[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        account:accounts(name),
        category:categories(name, color, icon)
      `
      )
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    // Transform the data to match our TransactionWithDetails type
    return data.map((transaction) => ({
      ...transaction,
      account_name: transaction.account.name,
      category_name: transaction.category.name,
      category_color: transaction.category.color,
      category_icon: transaction.category.icon,
    }));
  },

  // Get monthly totals
  getMonthlyTotals: async (
    userId: string,
    month?: Date
  ): Promise<MonthlyTotals> => {
    const { data, error } = await supabase
      .rpc('get_monthly_totals', {
        p_user_id: userId,
        p_month: month?.toISOString(),
      })
      .single<MonthlyTotals>();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get current month totals (convenience method)
  getCurrentMonthTotals: async (userId: string): Promise<MonthlyTotals> => {
    return transactionsService.getMonthlyTotals(userId);
  },

  // Get expense breakdown by category for current month
  getExpenseBreakdown: async (userId: string): Promise<ExpenseBreakdown[]> => {
    const { data, error } = await supabase.rpc('get_expense_breakdown', {
      p_user_id: userId,
    });

    if (error) throw new Error(error.message);
    return (data as ExpenseBreakdown[]) || [];
  },

  // Get expense breakdown by category for a specific month
  getExpenseBreakdownWithDate: async (
    userId: string,
    targetDate: Date
  ): Promise<ExpenseBreakdown[]> => {
    const { data, error } = await supabase.rpc(
      'get_expense_breakdown_with_date',
      {
        p_user_id: userId,
        p_target_date: targetDate.toISOString(),
      }
    );

    if (error) throw new Error(error.message);
    return (data as ExpenseBreakdown[]) || [];
  },
};
