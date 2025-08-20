import { TableHead, TableHeader, TableRow } from '@/src/shared/ui'
import { Table, flexRender } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader className="">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const title = flexRender(
              header.column.columnDef.header,
              header.getContext()
            )
            return (
              <TableHead
                key={header.id}
                className={`w-${header.getSize()} border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800`}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder ? null : (
                  <DataTableColumnHeader column={header.column} title={title} />
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
