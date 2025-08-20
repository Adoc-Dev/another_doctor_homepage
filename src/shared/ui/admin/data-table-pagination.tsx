import { Table } from '@tanstack/react-table'

import { cn } from '@/src/shared/lib/utils'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import * as React from 'react'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  renderSelected?: (count: number, total: number) => React.ReactNode
  renderPageSize?: (count: number) => React.ReactNode
}
export function DataTablePagination<TData>({
  table,
  className,
  renderSelected,
  renderPageSize,
  ...props
}: React.ComponentProps<'div'> & DataTablePaginationProps<TData>) {
  function renderSelectedView() {
    const count = table.getFilteredSelectedRowModel().rows.length
    const total = table.getFilteredRowModel().rows.length
    if (count === 0) return null
    if (renderSelected) {
      return renderSelected(count, total)
    }
    return `${count}개 선택`
  }

  function renderPageSizeView(pageSize: number) {
    if (renderPageSize) {
      return renderPageSize(table.getState().pagination.pageSize)
    }
    return `${pageSize} / 페이지`
  }

  return (
    <div
      className={cn('flex items-center justify-between px-2', className)}
      {...props}
    >
      <div className="text-muted-foreground flex-1 text-sm">
        {renderSelectedView()}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 border-gray-200 hover:bg-gray-100 hover:text-gray-900">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="border-gray-200">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="hover:bg-gray-100 hover:text-gray-900 focus-visible:bg-gray-100 focus-visible:text-gray-900"
                >
                  {renderPageSizeView(pageSize)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 border-gray-200 p-0 hover:bg-gray-100 hover:text-gray-900 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 border-gray-200 p-0 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <div>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 border-gray-200 p-0 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 border-gray-200 p-0 hover:bg-gray-100 hover:text-gray-900 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
