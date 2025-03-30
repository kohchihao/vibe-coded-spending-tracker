"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function ExpenseTableToolbar() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input placeholder="Filter expenses..." className="h-9 w-full sm:w-[300px]" />
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-full sm:w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="bills">Bills</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="health">Health</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-full sm:w-[150px]">
            <SelectValue placeholder="Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="credit">Credit Card</SelectItem>
            <SelectItem value="bank">Bank Account</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="h-9 px-2 lg:px-3">
          <Cross2Icon className="h-4 w-4" />
          <span className="ml-2 hidden lg:inline">Reset</span>
        </Button>
      </div>
      <Button asChild>
        <Link href="/expenses/add">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Link>
      </Button>
    </div>
  )
}

