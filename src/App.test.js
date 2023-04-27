import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import useTransactions from "./hooks/useTransactions";

jest.mock("./hooks/useTransactions");

describe("App", () => {
  it("should render loading spinner when loading is true", async () => {
    useTransactions.mockReturnValueOnce({ transactions: [], loading: true });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(useTransactions).toHaveBeenCalled();
    });
  });

  it("should render rewards by month and transactions table when loading is false", async () => {
    useTransactions.mockReturnValueOnce({
      transactions: [
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
          transactionDate: "2022-01-15T00:00:00.000Z",
          name: "Joey",
        },
        {
          id: 4,
          customerId: 2,
          purchaseAmount: 250,
          transactionDate: "2022-03-01T00:00:00.000Z",
          name: "Joey",
        },
      ],
      loading: false,
    });

    render(<App />);

    expect(screen.getByText(/rewards points calculator/i)).toBeInTheDocument();

    expect(screen.getByText(/customer Ross/i)).toBeInTheDocument();
    expect(screen.getByText(/customer Joey/i)).toBeInTheDocument();

    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/Purchase Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Transaction Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer ID/i)).toBeInTheDocument();
  });
});
