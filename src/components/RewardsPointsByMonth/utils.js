const POINTS_PER_DOLLAR_OVER_100 = 2;
const POINTS_PER_DOLLAR_OVER_50 = 1;

export function getRewardsByMonth(transactions) {
  return transactions.reduce(
    (acc, { name, purchaseAmount, transactionDate }) => {
      // in the specification there is no specific situation what we should display as a month,
      // whether it is to be the full name of the month or its numerical value.
      // So I leave the numerical value but in the comment there is a variable that returns the name of the month
      // const month = new Date(transactionDate).toLocaleString("default", {
      //   month: "long",
      // });
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

export function calculateRewardPoints(amount) {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * POINTS_PER_DOLLAR_OVER_100;
  }

  if (amount > 50) {
    points += 50 * POINTS_PER_DOLLAR_OVER_50;
  }

  return points;
}

export const calculateRewards = (transactions) => {
  const rewardsByMonth = transactions.reduce((acc, transaction) => {
    const { customerId, date, amount } = transaction;
    const month = date.slice(0, 7);
    const points = calculateRewardPoints(amount);
    const customerRewards = acc[customerId] || {};
    return {
      ...acc,
      [customerId]: {
        ...customerRewards,
        [month]: (customerRewards[month] || 0) + points,
      },
    };
  }, {});

  const rewardsByCustomer = Object.keys(rewardsByMonth).reduce(
    (acc, customerId) => {
      const customerRewards = rewardsByMonth[customerId];
      const totalPoints = Object.values(customerRewards).reduce(
        (sum, points) => sum + points,
        0
      );
      return {
        ...acc,
        [customerId]: {
          total: totalPoints,
          byMonth: customerRewards,
        },
      };
    },
    {}
  );

  return rewardsByCustomer;
};
