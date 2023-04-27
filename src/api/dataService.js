import { mockTransactions } from "./mockData";

export function getTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (Math.random() < 0.5) {
      //   // simulate a random error half the time
      //   reject(new Error("Failed to fetch transactions"));
      // } else {
      resolve(mockTransactions);
      // }
    }, 1000); // simulate a 1s delay in API response
  });
}
