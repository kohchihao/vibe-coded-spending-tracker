import { useSession } from '@/contexts/session-context';
import { transactionsService } from '@/lib/services/transactions';
import { useQuery } from '@tanstack/react-query';

export const useCurrentMonthTotals = () => {
  const { user } = useSession();

  return useQuery({
    queryKey: ['currentMonthTotals', user?.id],
    queryFn: () => transactionsService.getCurrentMonthTotals(user?.id ?? ''),
    enabled: !!user,
  });
};
