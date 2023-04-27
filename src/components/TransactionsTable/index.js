import { useMemo } from "react";
import Table from "../ui/Table";
import { getColumns } from "./columns";

export const TransactionsTable = ({ transactions }) => {
  const columns = useMemo(getColumns, []);

  return (
    <>
      <h1 className="py-4 text-base font-semibold leading-6 text-primary">
        Transactions History
      </h1>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 pb-8">
        <div className="inline-block md:min-w-full align-middle sm:px-6 lg:px-8">
          <Table columns={columns} data={transactions} defaultPageSize={10} />
        </div>
      </div>
    </>
  );
};
