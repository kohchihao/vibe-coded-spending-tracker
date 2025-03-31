import { useSession } from '@/contexts/session-context';
import { transactionsService } from '@/lib/services/transactions';
import { useQuery } from '@tanstack/react-query';

export const useMonthlyTotals = () => {
  const { user } = useSession();

  return useQuery({
    queryKey: ['monthlyTotals', user?.id],
    queryFn: () => transactionsService.getCurrentMonthTotals(user?.id ?? ''),
    enabled: !!user,
  });
};
