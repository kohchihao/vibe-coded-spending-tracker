'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePrivacy } from '@/contexts/privacy-context';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { formatCurrency } from '@/lib/utils';

// Define the expense data type
export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  account: string;
  notes?: string;
};

// Mock data for expenses
const expenses: Expense[] = [
  {
    id: '1',
    description: 'Grocery Shopping',
    amount: 78.45,
    date: '2025-04-15',
    category: 'Food',
    account: 'Credit Card',
    notes: 'Weekly grocery run',
  },
  {
    id: '2',
    description: 'Coffee Shop',
    amount: 4.5,
    date: '2025-04-14',
    category: 'Food',
    account: 'Cash',
  },
  {
    id: '3',
    description: 'Gas Station',
    amount: 45.67,
    date: '2025-04-13',
    category: 'Transportation',
    account: 'Credit Card',
  },
  {
    id: '4',
    description: 'Movie Tickets',
    amount: 24.99,
    date: '2025-04-12',
    category: 'Entertainment',
    account: 'Bank Account',
    notes: 'Date night',
  },
  {
    id: '5',
    description: 'Phone Bill',
    amount: 65.0,
    date: '2025-04-10',
    category: 'Bills',
    account: 'Bank Account',
  },
  {
    id: '6',
    description: 'Dinner',
    amount: 89.75,
    date: '2025-04-09',
    category: 'Food',
    account: 'Credit Card',
    notes: 'Anniversary dinner',
  },
  {
    id: '7',
    description: 'Clothing',
    amount: 136.0,
    date: '2025-04-08',
    category: 'Shopping',
    account: 'Credit Card',
  },
  {
    id: '8',
    description: 'Uber Ride',
    amount: 18.5,
    date: '2025-04-07',
    category: 'Transportation',
    account: 'Credit Card',
  },
  {
    id: '9',
    description: 'Internet Bill',
    amount: 75.99,
    date: '2025-04-05',
    category: 'Bills',
    account: 'Bank Account',
  },
  {
    id: '10',
    description: 'Gym Membership',
    amount: 49.99,
    date: '2025-04-01',
    category: 'Health',
    account: 'Bank Account',
  },
];

export function ExpenseDataTable() {
  const { privacyMode, isLoading } = usePrivacy();
  const isMobile = useIsMobile();
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'date',
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Define the columns for the expense table
  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        // Format the date for display
        const date = new Date(row.getValue('date'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="capitalize">
            {row.getValue('category')}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'account',
      header: 'Account',
      cell: ({ row }) => <div>{row.getValue('account')}</div>,
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-right"
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue('amount'));
        return (
          <div className="text-right font-medium">
            {formatCurrency(amount, privacyMode)}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const expense = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(expense.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: expenses,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // Hide less important columns on mobile
                if (
                  isMobile &&
                  (header.id === 'account' || header.id === 'category')
                ) {
                  return null;
                }
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  // Hide less important columns on mobile
                  if (
                    isMobile &&
                    (cell.column.id === 'account' ||
                      cell.column.id === 'category')
                  ) {
                    return null;
                  }
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
