import { Text, ScrollView, View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { getTransactions, Transaction } from "./transactions";
import Chat from "./chat";
import { Ionicons } from "@expo/vector-icons";

const AdviceBox = ({ advice }) => {
    return (
        <View style={adviceStyles.container}>
            <View style={adviceStyles.iconBox}>
                <Ionicons name="alert-circle" color={"orange"} size={50} />
            </View>
            <View style={adviceStyles.adviceBox}>
                <Text style={adviceStyles.adviceTitle}>Kevin's Advice</Text>
                <Text style={adviceStyles.adviceText}>{advice}</Text>
            </View>
        </View>
    );
};

const adviceStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f7",
        padding: 16,
        borderRadius: 16,
        gap: 16,
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    iconBox: {
        display: "flex",
        flexDirection: "column",
    },
    adviceBox: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    adviceTitle: {
        color: "#000",
        fontSize: 17,
        fontWeight: "bold",
    },
    adviceText: {
        color: "#3C3C4399",
        fontSize: 16,
    },
});

const TransactionCard = ({ transaction }) => {
  const formatPrice = (price) => {
    let amount = (Math.round(price * 100) / 100).toFixed(2);
    return `-$${amount}`;
  }
  return (
    <View style={transactionStyles.container}>
      <View style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginRight: 20}}>
        <Ionicons name={transaction.merchant === "DoorDash" ? "car" : "cart"} size={30} />
      </View>
      <View style={{display: "flex", flexDirection: "column", flex: 1}}>
        <Text style={transactionStyles.merchantText}>{transaction.name}</Text>
        <Text style={transactionStyles.dateText}>{new Date(transaction.datetime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit" })}</Text>
      </View>
      <View style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Text style={{...transactionStyles.amountText, color: transaction.price < 0 ? "#34c759" : "#ff3b30"}}>
          {formatPrice(transaction.price)}
        </Text>
      </View>
    </View>
  );
}

const transactionStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#c6c6c8",
    display: "flex",
    flexDirection: "row",
  },
  merchantText: {
    color: '#000',
    fontSize: 14,
    fontWeight: "bold",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  dateText: {
    color: '#3C3C4399',
    fontSize: 14,
  }
});

export default function Index() {
    const [transactions, setTransactions] = useState([]);

    useFocusEffect(
      useCallback(() => {
          const loadTransactions = async () => {
              try {
                  const data = await getTransactions();
                  setTransactions(data);
              } catch (error) {
                  console.error("Failed to load transactions:", error);
              }
          };
  
          loadTransactions();
      }, [])
  );

    const getAdvice = (currTransactions: Transaction[]) => {
        let filteredTransactions = currTransactions.filter(
            (t) =>
                t.recommendation &&
                t.recommendation.recommendation &&
                t.recommendation.recommendation.length > 0
        );
        if (filteredTransactions.length == 0) {
            return "Loading...";
        } else {
            return filteredTransactions[0].recommendation.recommendation;
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <AdviceBox advice={getAdvice(transactions)} />
                <Text style={styles.subtitle}>Recent transactions</Text>
                <View style={styles.transactionList}>
                    {transactions
                        .map((t) => t.products.map((p) => ({ ...p, datetime: t.datetime, merchant: t.merchant })))
                        .flat()
                        .map((product, index) => (
                            <TransactionCard
                                key={index}
                                transaction={product}
                            />
                        ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 160,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        color: "#000",
        fontSize: 41,
        textAlign: "left",
        width: "100%",
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        color: "#000",
        fontSize: 25,
        textAlign: "left",
        width: "100%",
        fontWeight: "bold",
        marginTop: 15,
    },
    transactionList: {
        width: "100%",
        marginTop: 20,
        gap: 0,
        borderRadius: 16,
        backgroundColor: "#f2f2f7",
        padding: 16,
        paddingTop: 0,
        marginBottom: 20,
    },
});
