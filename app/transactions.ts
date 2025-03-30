enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

type Product = {
  id: number;
  name: string;
  price: number;
}

type Recommendation = {
  address: string;
  recommendation: string;
}

export type Transaction = {
  id: number;
  datetime: Date;
  location: number[];
  merchant: string;
  status: TransactionStatus;
  products: Product[];
  recommendation?: Recommendation;
}

let transactions: Transaction[] = [];

export const getCritique = async (): Promise<string> => {
  const response = await fetch("https://us-central1-hp-wonderful.cloudfunctions.net/get_critique")
  if (response.ok) {
    return response.text();
  } else {
    throw new Error("Error fetching critique: " + await response.text());
  }
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch("https://us-central1-hp-wonderful.cloudfunctions.net/get_transactions")
  if (response.ok) {
    transactions = await response.json();
    transactions = transactions.sort((a: Transaction, b: Transaction) => {
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    });
    return transactions;
  } else {
    throw new Error("Error fetching transactions: " + response.statusText);
  }
}