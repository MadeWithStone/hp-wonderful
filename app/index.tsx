import { Text, ScrollView, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { getTransactions, Transaction } from "./transactions";
import Chat from "./chat";
import { Ionicons } from "@expo/vector-icons";
import KevinAgent from "./kevinAgent";

const AdviceBox = ({ advice } : { advice : string }) => {
    return (
        <View style={adviceStyles.container}>
            <View style={adviceStyles.iconBox}>
                <Ionicons name="fish" color={"orange"} size={50} />
            </View>
            <View style={adviceStyles.adviceBox}>
                <Text style={adviceStyles.adviceTitle}>Kevin's Advice</Text>
                <Text style={adviceStyles.adviceText}>{advice.trim()}</Text>
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

const TransactionCard = ({ transaction, setAdviceIdx }: { transaction: Transaction, setAdviceIdx : React.Dispatch<React.SetStateAction<number>> }) => {
    const [expanded, setExpanded] = useState(false);

    const formatPrice = (price: number) => {
        let amount = (Math.round(price * 100) / 100).toFixed(2);
        return `-$${amount}`;
    };

    const getTotalPrice = () => {
        let total = 0;
        transaction.products.forEach((product) => {
            total += product.price;
        });
        return total;
    }

    return (
        <>
            <Pressable
                style={transactionStyles.container}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={transactionStyles.iconCol}>
                    <Ionicons
                        name={transaction.merchant === "DoorDash" ? "car" : "cart"}
                        size={30}
                    />
                </View>
                <View style={transactionStyles.mainCol}>
                    <Text style={transactionStyles.merchantText}>
                        {transaction.merchant}
                    </Text>
                    <Text style={transactionStyles.dateText}>
                        {new Date(transaction.datetime).toLocaleDateString(
                            "en-US",
                            { weekday: "short", month: "short", day: "2-digit" }
                        )}
                    </Text>
                </View>
                <View style={transactionStyles.moneyCol}>
                    <Text
                        style={{
                            ...transactionStyles.amountText,
                            color: Math < 0 ? "#34c759" : "#ff3b30",
                            fontWeight: "bold",
                        }}
                    >
                        {formatPrice(getTotalPrice())}
                    </Text>
                </View>
            </Pressable>
            {expanded && transaction.products.map((product, index) => (
                <Pressable style={transactionStyles.container} key={index} onPress={() => {
                    if (transaction.recommendation && transaction.recommendation.recommendation) {
                        setAdviceIdx(index);
                        KevinAgent.speak(transaction.recommendation.recommendation.trim());
                    }
                }}>
                    <View style={transactionStyles.mainCol}>
                        <Text style={transactionStyles.merchantText}>
                            {product.name}
                        </Text>
                    </View>
                    <View style={transactionStyles.moneyCol}>
                        <Text
                            style={{
                                ...transactionStyles.amountText,
                                color: product.price < 0 ? "#34c759" : "#ff3b30",
                            }}
                        >
                            {formatPrice(product.price)}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </>
    );
};

const transactionStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c8",
        display: "flex",
        flexDirection: "row",
    },
    iconCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
    },
    mainCol: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    moneyCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    merchantText: {
        color: '#000',
        fontSize: 14,
        fontWeight: "bold",
    },
    amountText: {
        fontSize: 16
    },
    dateText: {
        color: '#3C3C4399',
        fontSize: 14,
    }
});

export default function Index() {
    const [transactions, setTransactions] = useState([] as Transaction[]);
    const [adviceIdx, setAdviceIdx] = useState(0);
    const [advice, setAdvice] = useState("Loading...");

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

    useEffect(() => {
        let filteredTransactions = transactions.filter(
            (t) =>
                t.recommendation &&
                t.recommendation.recommendation &&
                t.recommendation.recommendation.length > 0
        );
        if (filteredTransactions.length < adviceIdx + 1) {
            setAdvice("Loading...");
        } else {
            setAdvice(filteredTransactions[adviceIdx].recommendation.recommendation);
        }
    }, [adviceIdx, transactions]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <AdviceBox advice={advice} />
                <Text style={styles.subtitle}>Recent transactions</Text>
                <View style={styles.transactionList}>
                    {transactions
                        .map((transaction, index) => (
                            <TransactionCard
                                key={index}
                                transaction={transaction}
                                setAdviceIdx={() => setAdviceIdx(index)}
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
        marginTop: 45,
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
