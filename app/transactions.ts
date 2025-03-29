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

type Transaction = {
  id: number;
  datetime: Date;
  location: number[];
  merchant: string;
  status: TransactionStatus;
  products: Product[];
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
  if (transactions.length > 0) {
    return transactions;
  }
  const response = await fetch("https://us-central1-hp-wonderful.cloudfunctions.net/get_transactions")
  if (response.ok) {
    transactions = await response.json();
    return transactions;
  } else {
    throw new Error("Error fetching transactions: " + response.statusText);
  }
}