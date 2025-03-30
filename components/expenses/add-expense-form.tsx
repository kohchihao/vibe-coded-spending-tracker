"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

// Mock data for category-specific descriptions
const categoryDescriptions = {
  food: [
    "Grocery shopping",
    "Restaurant",
    "Coffee shop",
    "Fast food",
    "Takeout",
    "Lunch",
    "Dinner",
    "Breakfast",
    "Snacks",
  ],
  transportation: ["Gas", "Uber/Lyft", "Public transit", "Parking", "Car maintenance", "Tolls", "Car wash"],
  entertainment: ["Movies", "Concert", "Streaming service", "Books", "Games", "Hobbies", "Sports event"],
  bills: ["Electricity", "Water", "Internet", "Phone", "Rent/Mortgage", "Insurance", "Subscription"],
  shopping: ["Clothing", "Electronics", "Home goods", "Gifts", "Personal care", "Office supplies"],
  health: ["Doctor visit", "Medication", "Gym membership", "Fitness equipment", "Vitamins/Supplements"],
  other: ["Miscellaneous", "Donation", "Education", "Pet expenses", "Travel"],
}

// Define the form schema
const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  account: z.string({
    required_error: "Please select an account.",
  }),
  notes: z.string().optional(),
})

export function AddExpenseForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: undefined,
      date: new Date(),
      notes: "",
    },
  })

  // Define form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send data to your backend
    console.log(values)
    toast({
      title: "Expense added",
      description: "Your expense has been recorded successfully.",
    })
    form.reset()
    setSelectedCategory(null)
  }

  // Handle quick description selection
  const handleDescriptionSelect = (description: string) => {
    form.setValue("description", description)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedCategory(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="bills">Bills</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Grocery shopping" {...field} />
                    </FormControl>
                    {selectedCategory && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-2">Quick select:</p>
                        <div className="flex flex-wrap gap-2">
                          {categoryDescriptions[selectedCategory as keyof typeof categoryDescriptions]?.map(
                            (description, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => handleDescriptionSelect(description)}
                              >
                                {description}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional details here..." className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>You can add any additional information about this expense.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto">
              Add Expense
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

