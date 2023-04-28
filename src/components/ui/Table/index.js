import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";

const TableComponent = (props) => {
  const { data, columns, defaultPageSize, defaultSortColumns } = props;
  const [rowState, setRowState] = useState({ id: "" });
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([
    {
      id: defaultSortColumns || columns[0].id,
    },
  ]);
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: { pageSize: defaultPageSize },
    },
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();

      let value = row.getValue(columnId);
      if (typeof value === "number") value = String(value);

      return value?.toLowerCase().includes(search);
    },
  });

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="block w-full appearance-none border border-gray-300 p-2 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          placeholder="Search here..."
        />
      </div>

      <div className="py-4 inline-block min-w-full align-middle">
        <table className="min-w-full">
          <thead className="bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="sticky top-0 z-10 bg-opacity-75 px-3 py-4 text-left text-sm font-semibold text-primary backdrop-blur backdrop-filter lg:table-cell"
                  >
                    {header.isPlaceholder ? null : (
                      <div aria-hidden="true">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setRowState({ id: row.id })}
                    onMouseLeave={() => setRowState({ id: null })}
                    className={clsx(
                      rowState.id === row.id ? "bg-gray-100" : "bg-white",
                      "whitespace-wrap mb-1 divide-y divide-gray-200 border-t border-gray-200"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={clsx(
                            cell.column.columnDef?.meta?.classname,
                            "py-4 text-sm font-medium px-3"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
            ) : (
              <tr className="justify-center border-b border-gray-300">
                <td
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  className="w-full py-4 text-center text-sm font-medium text-primary"
                >
                  {props.noItems ? props.noItems : "No Items"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {table.getPageCount() > 1 && (
          <div className="pt-4 flex items-center justify-end gap-2">
            <button
              className="rounded-full text-xs bg-white p-2 border border-primary hover:bg-background hover:text-black focus:ring-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-full text-xs bg-white p-2 border border-primary hover:bg-background hover:text-black focus:ring-0"
            >
              Next
            </button>

            <span className="flex items-center gap-2 text-xs">
              <div>Page</div>
              <div className="font-bold">
                {`${
                  table.getState().pagination.pageIndex + 1
                } / ${table.getPageCount()}`}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
