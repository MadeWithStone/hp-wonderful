import { Stack, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Navigation from "@/components/Navigation";
import React from "react";
import KevinAgent from "@/app/kevinAgent";

import { View, Text, Modal, Pressable, Button } from "react-native";
import { KevinButton } from "@/components/KevinButton";
import KevinTabButton from "@/components/KevinTabButton";
import Chat from "./chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isChatOpen, setChatOpen] = React.useState(false);

    const toggleExpandHandler = () => {
        if (isChatOpen) return;
        setIsExpanded(!isExpanded);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    React.useEffect(() => {
        KevinAgent.initialize();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    contentStyle: {
                        backgroundColor: "white",
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerLargeTitle: true,
                        headerShadowVisible: false,
                        title: "Expenses",
                        headerRight: () => <Ionicons name="person" size={24} color="rgb(0, 122, 255)"/>
                    }}
                />
            </Stack>

            {!!isChatOpen && <Chat setChatOpen={setChatOpen} />}

            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    marginTop: isExpanded ? 48 : isChatOpen ? 0 : 100
                }}
            >
                <View style={{ zIndex: 50 }}>
                    {!!isExpanded && (
                        <View
                            style={{
                                flex: 0,
                                gap: 24,
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <KevinTabButton
                                onPress={() => {
                                    setChatOpen(true);
                                    setIsExpanded(false);
                                }}
                                icon="chatbubble"
                                color="#34c759"
                            />
                            <KevinTabButton
                                onPress={() => {
                                    router.navigate("/quests");
                                    setIsExpanded(false);
                                }}
                                icon="map"
                                color="#007aff"
                            />
                        </View>
                    )}

                    <KevinButton
                        onPress={toggleExpandHandler}
                        isExpanded={isExpanded}
                    />
                </View>
            </View>
        </View>
    );
}
