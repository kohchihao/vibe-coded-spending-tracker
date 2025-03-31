'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useSession } from '@/contexts/session-context';
import { accountsService } from '@/lib/services/accounts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Account name must be at least 2 characters.',
  }),
  balance: z.coerce.number().nonnegative({
    message: 'Balance must be a non-negative number.',
  }),
  description: z.string().optional(),
});

export function EditAccountForm() {
  const { user } = useSession();
  const router = useRouter();
  const params = useParams();
  const accountId = typeof params.id === 'string' ? parseInt(params.id) : null;

  // Fetch account data
  const { data: account, isLoading } = useQuery({
    queryKey: ['account', accountId],
    queryFn: () => (accountId ? accountsService.getById(accountId) : null),
    enabled: !!accountId,
  });

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      balance: 0,
      description: '',
    },
  });

  // Update form values when account data is loaded
  useEffect(() => {
    if (account) {
      form.reset({
        name: account.name,
        balance: account.balance,
        description: account.description || '',
      });
    }
  }, [account, form]);

  // Define form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id || !accountId) {
      toast({
        title: 'Error',
        description: 'You must be logged in to edit an account.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await accountsService.update(accountId, {
        name: values.name,
        description: values.description || null,
        balance: values.balance,
      });

      toast({
        title: 'Account updated',
        description: 'Your account has been updated successfully.',
      });

      // Navigate back to accounts page
      router.push('/accounts');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update account. Please try again.',
        variant: 'destructive',
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bank Account" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Update the current balance of this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description for this account..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/accounts')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
