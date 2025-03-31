'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useSession } from '@/contexts/session-context';
import { categoriesService } from '@/lib/services/categories';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const colors = [
  // { name: 'slate', value: 'slate' },
  // { name: 'gray', value: 'gray' },
  // { name: 'zinc', value: 'zinc' },
  // { name: 'neutral', value: 'neutral' },
  // { name: 'stone', value: 'stone' },
  { name: 'red', value: 'red' },
  { name: 'orange', value: 'orange' },
  { name: 'amber', value: 'amber' },
  { name: 'yellow', value: 'yellow' },
  { name: 'lime', value: 'lime' },
  { name: 'green', value: 'green' },
  { name: 'emerald', value: 'emerald' },
  { name: 'teal', value: 'teal' },
  { name: 'cyan', value: 'cyan' },
  { name: 'sky', value: 'sky' },
  { name: 'blue', value: 'blue' },
  { name: 'indigo', value: 'indigo' },
  { name: 'violet', value: 'violet' },
  { name: 'purple', value: 'purple' },
  { name: 'fuchsia', value: 'fuchsia' },
  { name: 'pink', value: 'pink' },
  { name: 'rose', value: 'rose' },
] as const;

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  color: z
    .string()
    .refine((value) => colors.some((color) => color.value === value), {
      message: 'Please select a valid color.',
    }),
  icon: z.string().min(1, {
    message: 'Icon name is required.',
  }),
});

export function AddCategoryForm() {
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const { user } = useSession();
  const router = useRouter();
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: colors[16].value, // Default to indigo
      icon: '',
    },
  });

  // Define form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await categoriesService.create({
        name: values.name,
        color: values.color,
        icon: values.icon,
        type: 'expense', // Default to expense type
        user_id: user?.id ?? null,
        is_system: false,
        budget_limit: null,
        tags: descriptions.length > 0 ? descriptions : null,
      });

      toast({
        title: 'Category added',
        description: 'Your category has been created successfully.',
      });

      form.reset();
      setDescriptions([]);
      router.push('/categories');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create category. Please try again.',
        variant: 'destructive',
      });
    }
  }

  // Add a new description
  const addDescription = () => {
    if (
      newDescription.trim() &&
      !descriptions.includes(newDescription.trim())
    ) {
      setDescriptions([...descriptions, newDescription.trim()]);
      setNewDescription('');
    }
  };

  // Remove a description
  const removeDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  // Handle key press in the description input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDescription();
    }
  };

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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Food" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shopping-cart" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the Lucide icon (e.g., shopping-cart,
                    coffee, car)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full border',
                        `bg-${field.value}-900`
                      )}
                    />
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem key={color.name} value={color.value}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={cn(
                                    'w-4 h-4 rounded-full',
                                    `bg-${color.value}-900`
                                  )}
                                />
                                <span className="capitalize">{color.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Choose a color for this category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Quick Descriptions</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {descriptions.map((description, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {description}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeDescription(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a quick description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDescription}
                  disabled={!newDescription.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <FormDescription>
                Add common descriptions that will appear as quick options when
                adding expenses.
              </FormDescription>
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Add Category
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
