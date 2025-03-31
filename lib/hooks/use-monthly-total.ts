import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions';

export const useMonthlyTotal = (userId: string, month?: Date) => {
  return useQuery({
    queryKey: ['monthlyTotal', userId, month?.toISOString()],
    queryFn: () => transactionsService.getMonthlyTotals(userId, month),
  });
};
