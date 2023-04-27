import {
  calculateRewardPoints,
  getRewardsByMonth,
  calculateRewards,
} from "./utils";

describe("calculateRewardPoints", () => {
  it("should return 0 points for purchases less than or equal to 50", () => {
    expect(calculateRewardPoints(50)).toEqual(0);
    expect(calculateRewardPoints(10)).toEqual(0);
  });

  it("should return correct points for purchases between 50 and 100", () => {
    expect(calculateRewardPoints(60)).toEqual(50);
    expect(calculateRewardPoints(75)).toEqual(50);
  });

  it("should return correct points for purchases over 100", () => {
    expect(calculateRewardPoints(110)).toEqual(70);
    expect(calculateRewardPoints(200)).toEqual(250);
  });
});

describe("getRewardsByMonth", () => {
  it("should return correct rewards by customer and month", () => {
    const transactions = [
      {
        name: "Alice",
        purchaseAmount: 75,
        transactionDate: "2022-01-01T00:00:00.000Z",
      },
      {
        name: "Bob",
        purchaseAmount: 125,
        transactionDate: "2022-02-01T00:00:00.000Z",
      },
      {
        name: "Alice",
        purchaseAmount: 25,
        transactionDate: "2022-01-15T00:00:00.000Z",
      },
      {
        name: "Bob",
        purchaseAmount: 250,
        transactionDate: "2022-03-01T00:00:00.000Z",
      },
    ];

    const expectedRewardsByMonth = {
      Alice: {
        1: 50,
      },
      Bob: {
        2: 100,
        3: 350,
      },
    };

    expect(getRewardsByMonth(transactions)).toEqual(expectedRewardsByMonth);
  });
});

describe("calculateRewards", () => {
  it("should return correct rewards by customer and month", () => {
    const transactions = [
      { customerId: 1, date: "2022-01-01", amount: 75 },
      { customerId: 1, date: "2022-01-15", amount: 25 },
      { customerId: 2, date: "2022-02-01", amount: 125 },
      { customerId: 2, date: "2022-03-01", amount: 250 },
    ];

    const expectedRewards = {
      1: {
        total: 50,
        byMonth: {
          "2022-01": 50,
        },
      },
      2: {
        total: 450,
        byMonth: {
          "2022-02": 100,
          "2022-03": 350,
        },
      },
    };

    expect(calculateRewards(transactions)).toEqual(expectedRewards);
  });
});
