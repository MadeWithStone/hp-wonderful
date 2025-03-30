import { Stack, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Navigation from "@/components/Navigation";
import React from "react";
import KevinAgent from "@/app/kevinAgent";

import { View, Text, Modal, Pressable } from "react-native";
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
        setIsExpanded(!isExpanded);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    React.useEffect(() => {
        KevinAgent.initialize();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={
                    {
                        // headerShown: false,
                        // presentation: "modal",
                        // animation: "slide_from_bottom"
                        contentStyle: {
                          backgroundColor: "white",
                        },
                        title: "Home",
                    }
                }
            >
                <Stack.Screen
                    name="index"
                    options={{ headerLargeTitle: true }}
                />
            </Stack>

            {!!isChatOpen && <Chat setChatOpen={setChatOpen}/>}

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
                }}
            >

                <View style={{zIndex: 50}}>
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
                              onPress={() => setChatOpen(true)} 
                              icon="chatbubble"
                              color="#34c759" />
                            <KevinTabButton
                              onPress={() => router.navigate("/quests")}
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
