"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for categories
const categories = [
  {
    id: "1",
    name: "Food",
    color: "#f97316",
    icon: "utensils",
    descriptions: [
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
  },
  {
    id: "2",
    name: "Transportation",
    color: "#3b82f6",
    icon: "car",
    descriptions: ["Gas", "Uber/Lyft", "Public transit", "Parking", "Car maintenance", "Tolls", "Car wash"],
  },
  {
    id: "3",
    name: "Entertainment",
    color: "#a855f7",
    icon: "film",
    descriptions: ["Movies", "Concert", "Streaming service", "Books", "Games", "Hobbies", "Sports event"],
  },
  {
    id: "4",
    name: "Bills",
    color: "#ef4444",
    icon: "file-text",
    descriptions: ["Electricity", "Water", "Internet", "Phone", "Rent/Mortgage", "Insurance", "Subscription"],
  },
  {
    id: "5",
    name: "Shopping",
    color: "#22c55e",
    icon: "shopping-bag",
    descriptions: ["Clothing", "Electronics", "Home goods", "Gifts", "Personal care", "Office supplies"],
  },
]

// Function to get category icon
function getCategoryIcon(category: string) {
  switch (category) {
    case "Food":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-orange-500"
          >
            <path d="M17 8c0-5-4-5-4-5s-4 0-4 5" />
            <path d="M15 18H9c-1 0-1.5-.5-2-1.5" />
            <path d="M9 18h6v3H9z" />
            <path d="M9 5V3" />
            <path d="M15 5V3" />
            <path d="M12 18v3" />
            <path d="M6 13c-2 1-3 3.5-3 5.5 0 2 1 3.5 3 3.5h0" />
            <path d="M18 13c2 1 3 3.5 3 5.5 0 2-1 3.5-3 3.5h0" />
            <path d="M20 8c1 0 2 1.5 2 3" />
            <path d="M4 8c-1 0-2 1.5-2 3" />
            <path d="M20.5 11c.83 1 1.5 2.4 1.5 4" />
            <path d="M3.5 11c-.83 1-1.5 2.4-1.5 4" />
          </svg>
        </div>
      )
    case "Transportation":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
      )
    case "Entertainment":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-500"
          >
            <path d="m4 8 2-2m0 0 2-2M6 6 4 4m2 2 2 2" />
            <rect width="12" height="12" x="8" y="8" rx="2" />
            <path d="m15 13-2 2 4 4" />
          </svg>
        </div>
      )
    case "Bills":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <path d="M8 10h8" />
            <path d="M8 14h4" />
            <path d="M16 18h.01" />
          </svg>
        </div>
      )
    case "Shopping":
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <path d="M2 10h20" />
            <path d="M6 14h2" />
            <path d="M16 14h2" />
            <path d="M10 14h4" />
            <path d="M10 6h4" />
            <path d="M6 22V6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v16" />
          </svg>
        </div>
      )
    default:
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
      )
  }
}

export function CategoriesList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="flex flex-row items-start gap-4">
            {getCategoryIcon(category.name)}
            <div>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.descriptions.length} quick descriptions</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.descriptions.slice(0, 5).map((description, index) => (
                <Badge key={index} variant="outline">
                  {description}
                </Badge>
              ))}
              {category.descriptions.length > 5 && (
                <Badge variant="outline">+{category.descriptions.length - 5} more</Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

