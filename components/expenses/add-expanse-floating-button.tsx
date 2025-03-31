import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const AddExpenseFloatingButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-10 md:hidden">
      <Button
        size="lg"
        className="h-12 w-12 rounded-full shadow-lg px-0"
        asChild
      >
        <Link href="/expenses/add">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Expense</span>
        </Link>
      </Button>
    </div>
  );
};
