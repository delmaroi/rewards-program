import { renderHook } from "@testing-library/react-hooks";
import useTransactions from "./useTransactions";
import { getTransactions } from "../api/dataService";

jest.mock("../api/dataService", () => ({
  getTransactions: jest.fn(),
}));

describe("useTransactions", () => {
  it("should fetch and return transactions", async () => {
    const mockTransactions = [
      {
        id: 1,
        customerId: 1,
        purchaseAmount: 100,
        transactionDate: "2022-01-01",
      },
      {
        id: 2,
        customerId: 2,
        purchaseAmount: 200,
        transactionDate: "2022-01-02",
      },
    ];

    getTransactions.mockResolvedValueOnce(mockTransactions);

    const { result, waitForNextUpdate } = renderHook(() => useTransactions());

    expect(result.current.transactions).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.transactions).toEqual(
      mockTransactions.map((transaction) => ({
        ...transaction,
        rewardPoints: expect.any(Number),
      }))
    );
    expect(result.current.isLoading).toBe(false);
  });
});
