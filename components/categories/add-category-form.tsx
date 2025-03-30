"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useState } from "react"

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  icon: z.string().optional(),
})

export function AddCategoryForm() {
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [newDescription, setNewDescription] = useState("")

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#6366f1", // Default color
      icon: "",
    },
  })

  // Define form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send data to your backend
    console.log({ ...values, descriptions })
    toast({
      title: "Category added",
      description: "Your category has been created successfully.",
    })
    form.reset()
    setDescriptions([])
  }

  // Add a new description
  const addDescription = () => {
    if (newDescription.trim() && !descriptions.includes(newDescription.trim())) {
      setDescriptions([...descriptions, newDescription.trim()])
      setNewDescription("")
    }
  }

  // Remove a description
  const removeDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index))
  }

  // Handle key press in the description input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addDescription()
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: field.value }} />
                    <FormControl>
                      <Input type="color" {...field} className="w-20 h-10 p-1" />
                    </FormControl>
                  </div>
                  <FormDescription>Choose a color for this category.</FormDescription>
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
                Add common descriptions that will appear as quick options when adding expenses.
              </FormDescription>
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Add Category
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

