import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Quests() {
    return (
        <>
            <Stack.Screen name="quests" options={{headerLargeTitle: true}}/>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    QUESTS
                </Text>
            </View>
        </>
    );
}
