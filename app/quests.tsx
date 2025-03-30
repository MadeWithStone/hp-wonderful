import { Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

type Quest = {
    name: string;
    description: string;
    max: number;
    current: number;
    unit?: string;
}

const quests = [
    {
        name: "Caffeine Free",
        description: "Spend less than $10 this week on coffee",
        max: 10,
        current: 7.3,
        unit: "$"
    },
    {
        name: "Dashed Out",
        description: "Order DoorDash less than 3 times this week",
        max: 3,
        current: 1,
    },
    {
        name: "Ride Light",
        description: "Take fewer than 5 Uber rides this week",
        max: 5,
        current: 3
    },
    {
        name: "Grocery Guru",
        description: "Spend less than $50 on Instacart this week",
        max: 50,
        current: 37.8,
        unit: "$"
    }
]

const QuestCard = ( { quest } : { quest : Quest } ) => {
    return (
        <View style={questStyles.container}>
            <Text style={questStyles.title}>{quest.name}</Text>
            <Text style={questStyles.description}>{quest.description}</Text>
            <View style={questStyles.progressBarOuter}>
                <View style={{...questStyles.progressBarInner, width: `${100 * quest.current / quest.max}%`}} />
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={questStyles.questText}>{`      ${quest.current}/${quest.unit ?? ""}${quest.max}      `}</Text>
                </View>
            </View>
        </View>
    )
}

const questStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c8",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20
    },
    description: {
        color: '#3C3C4399',
        fontSize: 14,
        marginTop: 1,
    },
    progressBarOuter: {
        width: "100%",
        marginTop: 6,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#e3e3e8",
        position: "relative",
    },
    progressBarInner: {
        height: "100%",
        borderRadius: 12,
        backgroundColor: "#34c759",
    },
    questText: {
        color: "#fff",
        textShadowColor: "#00000060",
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 4,
        fontWeight: "bold",
    }
})

export default function Quests() {
    return (
        <>
            <Stack.Screen name="quests" options={{ headerLargeTitle: true, title: 'Quests' }} />
            <View style={styles.container}>
                <Text style={styles.title}>Make Kevin happy!</Text>
                <Text style={styles.subtitle}>You've completed 5 quests so far. Keep going!</Text>
                <Text style={styles.sectionTitle}>Quests</Text>
                <View style={styles.questBox}>
                    {quests.map((quest, index) => (
                        <QuestCard key={index} quest={quest} />
                    ))}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 135,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        paddingRight: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    questBox: {
        width: "100%",
        marginTop: 5,
        gap: 0,
        borderRadius: 16,
        backgroundColor: "#f2f2f7",
        padding: 16,
        paddingTop: 0,
        marginBottom: 20,
    }
});
