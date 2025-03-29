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

const mockTransactions: Transaction[] = [
    {
      id: 1,
      datetime: new Date('2025-03-22T08:15:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Starbucks",
      status: TransactionStatus.COMPLETED,
      products: [{ id: 101, name: "Latte", price: 4.50 }]
    },
    {
      id: 2,
      datetime: new Date('2025-03-23T10:30:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Dunkin'",
      status: TransactionStatus.COMPLETED,
      products: [{ id: 102, name: "Cold Brew", price: 3.75 }]
    },
    {
      id: 3,
      datetime: new Date('2025-03-24T07:45:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Blue Bottle Coffee",
      status: TransactionStatus.PENDING,
      products: [{ id: 103, name: "Cappuccino", price: 5.00 }]
    },
    {
      id: 4,
      datetime: new Date('2025-03-25T09:00:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Starbucks",
      status: TransactionStatus.COMPLETED,
      products: [{ id: 104, name: "Espresso", price: 3.00 }]
    },
    {
      id: 5,
      datetime: new Date('2025-03-26T11:15:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Peet's Coffee",
      status: TransactionStatus.FAILED,
      products: [{ id: 105, name: "Americano", price: 3.25 }]
    },
    {
      id: 6,
      datetime: new Date('2025-03-22T13:45:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Whole Foods",
      status: TransactionStatus.COMPLETED,
      products: [
        { id: 106, name: "Organic Bananas", price: 2.99 },
        { id: 107, name: "Almond Milk", price: 3.49 }
      ]
    },
    {
      id: 7,
      datetime: new Date('2025-03-23T16:20:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Amazon",
      status: TransactionStatus.COMPLETED,
      products: [{ id: 108, name: "Wireless Mouse", price: 25.99 }]
    },
    {
      id: 8,
      datetime: new Date('2025-03-24T18:05:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Target",
      status: TransactionStatus.PENDING,
      products: [
        { id: 109, name: "Shampoo", price: 6.99 },
        { id: 110, name: "Conditioner", price: 6.99 }
      ]
    },
    {
      id: 9,
      datetime: new Date('2025-03-25T19:30:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Best Buy",
      status: TransactionStatus.COMPLETED,
      products: [{ id: 111, name: "USB-C Charger", price: 19.99 }]
    },
    {
      id: 10,
      datetime: new Date('2025-03-26T20:45:00Z'),
      location: [47.6061, 122.3328],
      merchant: "Walmart",
      status: TransactionStatus.FAILED,
      products: [{ id: 112, name: "Desk Lamp", price: 15.49 }]
    }
];

export const getTransactions = async (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
        resolve(mockTransactions);
    })
}