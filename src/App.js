import TransactionsTable from "./components/Transactions/Table";
import RewardsByMonth from "./components/Rewards/RewardsByMonth";
import useTransactions from "./hooks/useTransactions";
import { Spinner } from "./components/ui/Spinner";

function App() {
  const { transactions, loading } = useTransactions();

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 p-4">
      {loading ? (
        <div
          className="flex items-center justify-center h-screen"
          data-testid="spinner"
        >
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold text-primary">
            Rewards Points Calculator
          </h1>
          <RewardsByMonth transactions={transactions} />
          <TransactionsTable transactions={transactions} />
        </>
      )}
    </div>
  );
}

export default App;
