import { useQuery } from '@tanstack/react-query';
import {
  ExpenseBreakdown,
  transactionsService,
} from '../services/transactions';

export const useMonthlyExpenseBreakdown = (
  userId: string,
  targetDate: Date,
  enabled: boolean = true
) => {
  return useQuery<ExpenseBreakdown[], Error>({
    queryKey: ['monthlyExpenseBreakdown', userId, targetDate.toISOString()],
    queryFn: () =>
      transactionsService.getExpenseBreakdownWithDate(userId, targetDate),
    enabled,
  });
};
