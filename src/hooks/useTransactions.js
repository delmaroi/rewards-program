import { useState, useEffect } from "react";
import { getTransactions } from "../api/dataService";
import { calculateRewardPoints } from "../components";

function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getTransactions();

      const updatedData = data.map((transaction) => {
        const { purchaseAmount } = transaction;
        const rewardPoints = calculateRewardPoints(purchaseAmount);

        return { ...transaction, rewardPoints };
      });

      setTransactions(updatedData);
      setIsLoading(false);
    }

    fetchTransactions();
  }, []);

  return { transactions, isLoading };
}

export default useTransactions;
