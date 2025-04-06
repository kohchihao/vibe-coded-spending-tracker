'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSession } from '@/contexts/session-context';
import { useCategories } from '@/lib/hooks/useCategories';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import CategoryIcon from './CategoryIcon';

export function CategoriesList() {
  const { user } = useSession();
  const router = useRouter();
  const { data: categories, isLoading } = useCategories(user?.id ?? '');

  const handleEdit = (id: number) => {
    router.push(`/categories/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories?.map((category) => (
        <Card key={category.id}>
          <CardHeader className="flex flex-row  items-center gap-4">
            <CategoryIcon color={category.color} icon={category.icon} />
            <div>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>
                {category?.tags?.length} quick descriptions
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category?.tags?.slice(0, 5).map((description, index) => (
                <Badge key={index} variant="outline">
                  {description}
                </Badge>
              ))}
              {category?.tags?.length && category?.tags?.length > 5 && (
                <Badge variant="outline">
                  +{category?.tags?.length - 5} more
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(category.id)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
