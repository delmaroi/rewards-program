import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const getColumns = () => [
  columnHelper.accessor((row) => row.transactionDate, {
    id: "transactionDate",
    cell: (info) => info.getValue(),
    header: () => <span>Transaction Date</span>,
  }),
  columnHelper.accessor((row) => row.customerId, {
    id: "customerId",
    cell: (info) => <span className="hidden md:flex">{info.getValue()}</span>,
    header: () => <span className="hidden md:flex">Customer ID</span>,
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span className="md:flex">Customer Name</span>,
  }),
  columnHelper.accessor((row) => row.purchaseAmount, {
    id: "purchaseAmount",
    enableSorting: true,
    enableColumnFilter: false,
    cell: (info) => `$${info.getValue().toFixed(2)}`,
    header: () => <span className="md:flex">Purchase Amount</span>,
  }),
  columnHelper.accessor((row) => row.rewardPoints, {
    id: "rewardPoints",
    enableSorting: false,
    enableColumnFilter: false,
    cell: (info) => `${info.getValue()} points`,
    header: () => <span className="md:flex">Reward Points</span>,
  }),
];
