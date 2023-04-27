const POINTS_PER_DOLLAR_OVER_100 = 2;
const POINTS_PER_DOLLAR_OVER_50 = 1;

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

export function calculateRewards(transactions) {
  const rewardsByMonth = {};

  transactions.forEach((transaction) => {
    const { customerId, date, amount } = transaction;
    const month = date.slice(0, 7);

    const points = calculateRewardPoints(amount);
    rewardsByMonth[customerId] = rewardsByMonth[customerId] || {};
    rewardsByMonth[customerId][month] =
      (rewardsByMonth[customerId][month] || 0) + points;
  });

  const rewardsByCustomer = {};
  Object.keys(rewardsByMonth).forEach((customerId) => {
    rewardsByCustomer[customerId] = {
      total: 0,
      byMonth: rewardsByMonth[customerId],
    };
    Object.values(rewardsByMonth[customerId]).forEach((points) => {
      rewardsByCustomer[customerId].total += points;
    });
  });

  return rewardsByCustomer;
}
