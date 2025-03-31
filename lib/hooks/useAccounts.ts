import { useQuery } from '@tanstack/react-query';
import { accountsService } from '../services/accounts';

export const useAccounts = (userId: string) => {
  return useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => accountsService.getAll(userId),
  });
};
