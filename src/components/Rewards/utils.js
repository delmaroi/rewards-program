import { calculateRewardPoints } from "../../pointsCalculator";

export function getRewardsByMonth(transactions) {
  return transactions.reduce(
    (acc, { name, purchaseAmount, transactionDate }) => {
      const month = new Date(transactionDate).getMonth() + 1;
      const rewardPoints = calculateRewardPoints(purchaseAmount);

      if (!acc[name]) {
        acc[name] = {};
      }

      if (!acc[name][month]) {
        acc[name][month] = 0;
      }

      acc[name][month] += rewardPoints;
      return acc;
    },
    {}
  );
}
