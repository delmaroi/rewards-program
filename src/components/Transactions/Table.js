import React from "react";
import Table from "../ui/Table";
import { getColumns } from "./columns";

function TransactionsTable({ transactions }) {
  const columns = React.useMemo(getColumns, []);

  return (
    <>
      <div className="sm:flex sm:items-center">
        <h1 className="text-base font-semibold leading-6 text-primary">
          Transactions History
        </h1>
      </div>

      <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <Table columns={columns} data={transactions} defaultPageSize={10} />
        </div>
      </div>
    </>
  );
}

export default TransactionsTable;
