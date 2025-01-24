import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { SaleItem } from '../../types';

type Props = {
  items: SaleItem[];
};

const currencyFormatter: Partial<Intl.NumberFormatOptions> = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
};

export default function SalesTable({ items }: Props) {
  const columnHelper = createColumnHelper<SaleItem>();

  const columns = [
    columnHelper.accessor('weekEnding', {
      header: 'Week Ending',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('retailSales', {
      header: 'Retail Sales',
      cell: (info) => info.getValue().toLocaleString('en-US', currencyFormatter),
    }),
    columnHelper.accessor('wholesaleSales', {
      header: 'Wholesale Sales',
      cell: (info) => info.getValue().toLocaleString('en-US', currencyFormatter),
    }),
    columnHelper.accessor('unitsSold', {
      header: 'Units Sold',
      cell: (info) => info.getValue().toLocaleString('en-US'),
    }),
    columnHelper.accessor('retailerMargin', {
      header: 'Retailer Margin',
      cell: (info) => info.getValue().toLocaleString('en-US', currencyFormatter),
    }),
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-center"
                  onClick={() => {
                    const currentSort = header.column.getIsSorted();
                    header.column.toggleSorting(currentSort === 'asc');
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span className="ml-1">
                    {header.column.getIsSorted() === 'asc' ? ' ^' : ''}
                    {header.column.getIsSorted() === 'desc' ? ' v' : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 justify-center">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
