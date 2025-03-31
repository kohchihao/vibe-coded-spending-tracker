import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../services/categories';

export const useCategories = (userId: string) => {
  return useQuery({
    queryKey: ['categories', userId],
    queryFn: () => categoriesService.getAll(userId),
  });
};
