import { transactionsService } from '@/lib/services/transactions';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export const useMonthlyTransactions = (userId: string, date: Date) => {
  // Get the first and last day of the selected month
  const firstDay = dayjs(date).startOf('month');
  const lastDay = dayjs(date).endOf('month');

  return useQuery({
    queryKey: ['transactions', userId, date.getFullYear(), date.getMonth()],
    queryFn: async () => {
      const transactions = await transactionsService.getByDateRange(
        userId,
        firstDay.format('YYYY-MM-DD'),
        lastDay.format('YYYY-MM-DD')
      );
      return transactions;
    },
  });
};
