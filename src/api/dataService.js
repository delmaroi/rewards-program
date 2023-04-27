import { mockTransactions } from "./mockData";

export function getTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // simulate a random error half the time
      // if (Math.random() < 0.5) {
      //   reject(new Error("Failed to fetch transactions"));
      // } else {

      resolve(mockTransactions);
      // }
    }, 1000); // simulate a 1s delay in API response
  });
}
