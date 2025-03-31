import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions';

export const useRecentTransactions = (userId: string, limit: number = 5) => {
  return useQuery({
    queryKey: ['recentTransactions', userId],
    queryFn: () => transactionsService.getRecentTransactions(userId, limit),
  });
};
