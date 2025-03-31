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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Account name must be at least 2 characters.',
  }),
  balance: z.coerce.number().nonnegative({
    message: 'Initial balance must be a non-negative number.',
  }),
  description: z.string().optional(),
});

export function AddAccountForm() {
  const { user } = useSession();
  const router = useRouter();

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      balance: 0,
      description: '',
    },
  });

  // Define form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add an account.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await accountsService.create({
        user_id: user.id,
        name: values.name,
        description: values.description || null,
        balance: values.balance,
        currency: 'SGD',
        icon: null,
        archived: false,
      });

      toast({
        title: 'Account added',
        description: 'Your account has been created successfully.',
      });

      // Reset form and navigate back to accounts page
      form.reset();
      router.push('/accounts');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add account. Please try again.',
        variant: 'destructive',
      });
    }
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
                  <FormLabel>Initial Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the current balance of this account.
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
            <Button type="submit" className="w-full sm:w-auto">
              Add Account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
