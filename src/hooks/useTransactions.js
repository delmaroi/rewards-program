import { useState, useEffect } from "react";
import { getTransactions } from "../api/dataService";
import { calculateRewardPoints } from "../components/Rewards/utils";

function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getTransactions();

      const updatedData = data.map((transaction) => {
        const { purchaseAmount } = transaction;
        const rewardPoints = calculateRewardPoints(purchaseAmount);

        return { ...transaction, rewardPoints };
      });

      setTransactions(updatedData);
      setLoading(false);
    }

    fetchTransactions();
  }, []);

  return { transactions, loading };
}

export default useTransactions;
