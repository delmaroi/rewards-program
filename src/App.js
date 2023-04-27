import { RewardsPointsByMonth, TransactionsTable, Spinner } from "./components";
import useTransactions from "./hooks/useTransactions";

function App() {
  const { transactions, isLoading } = useTransactions();

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 p-4">
      {isLoading ? (
        <div data-testid="spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-primary">
            Reward Points Calculator
          </h1>

          <RewardsPointsByMonth transactions={transactions} />

          <TransactionsTable transactions={transactions} />
        </>
      )}
    </div>
  );
}

export default App;
