import { useSession } from '@/contexts/session-context';
import {
  ExpenseBreakdown,
  transactionsService,
} from '@/lib/services/transactions';
import { useQuery } from '@tanstack/react-query';

export const useExpenseBreakdown = () => {
  const { user } = useSession();

  return useQuery<ExpenseBreakdown[]>({
    queryKey: ['expense-breakdown'],
    queryFn: () => transactionsService.getExpenseBreakdown(user?.id || ''),
    enabled: !!user?.id,
  });
};
