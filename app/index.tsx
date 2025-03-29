import { Text, View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { getTransactions } from "./transactions";

export default function Index() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      
      <FlatList
        data={transactions.map(t => t.products).flat()}
        keyExtractor={(item, index) => index.toString()}
        style={styles.transactionList}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.merchantText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 75,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  transactionList: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  transactionItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  merchantText: {
    color: '#fff',
    fontSize: 18,
  }
});
