import { render, screen } from "@testing-library/react";
import RewardsByMonth from "./RewardsByMonth";

describe("RewardsByMonth", () => {
  it("renders rewards points by month for each customer", () => {
    const transactions = [
      {
        id: 1,
        customerId: 1,
        purchaseAmount: 100,
        transactionDate: "2022-01-01T00:00:00.000Z",
        name: "Ross",
      },
      {
        id: 2,
        customerId: 1,
        purchaseAmount: 200,
        transactionDate: "2022-02-01T00:00:00.000Z",
        name: "Ross",
      },
      {
        id: 3,
        customerId: 2,
        purchaseAmount: 150,
        transactionDate: "2022-03-15T00:00:00.000Z",
        name: "Joey",
      },
      {
        id: 4,
        customerId: 2,
        purchaseAmount: 250,
        transactionDate: "2022-04-01T00:00:00.000Z",
        name: "Joey",
      },
    ];
    render(<RewardsByMonth transactions={transactions} />);

    expect(screen.getByText("Customer Ross")).toBeInTheDocument();
    expect(screen.getByText("Month 1:")).toBeInTheDocument();
    expect(screen.getByText("Month 2:")).toBeInTheDocument();
    expect(screen.getByText("50 points")).toBeInTheDocument();
    expect(screen.getByText("250 points")).toBeInTheDocument();

    expect(screen.getByText("Customer Joey")).toBeInTheDocument();
    expect(screen.getByText("Month 3:")).toBeInTheDocument();
    expect(screen.getByText("Month 4:")).toBeInTheDocument();
    expect(screen.getByText("150 points")).toBeInTheDocument();
    expect(screen.getByText("250 points")).toBeInTheDocument();
  });
});
