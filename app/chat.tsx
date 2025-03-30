import {
    Text,
    TextInput,
    View,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    Keyboard,
    Pressable,
} from "react-native";
import { getCritique } from "./transactions";
import { useFocusEffect } from "expo-router";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import KevinAgent from "./kevinAgent";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type ChatProps = {
    setChatOpen: Dispatch<SetStateAction<boolean>>
};

export default function Chat({ setChatOpen }: ChatProps) {
    const insets = useSafeAreaInsets();

    const [critique, setCritique] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const fetchCritique = async () => {
                try {
                    const result = "";
                    // const result = await getCritique();
                    if (isActive) {
                        setCritique(result);
                        console.log(result);
                        // KevinAgent.speak(result);
                    }
                } catch (error) {
                    console.error("Error fetching critique:", error);
                }
            };

            fetchCritique();
            return () => {
                isActive = false;
            };
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={{position: 'absolute', top: 0, right: 0, paddingTop: insets.top}} onPress={() => setChatOpen(false)}>
                <Ionicons name="close-outline" size={64}/>
            </Pressable>

            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="Say something"
                    placeholderTextColor={"gray"}
                    value={inputText}
                    onChangeText={(e) => {
                        if (e.includes("\n")) {
                            Keyboard.dismiss();
                        } else {
                            setInputText(e);
                        }
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ff0000",
        opacity: 0.5,
        width: "100%",
        height: "100%",
        flex: 1,
        zIndex: 10,
        position: 'absolute',
        // position: "absolute",
        // width: "100%",
        // height: "100%",
        // left: 0,
        // bottom: 0,
        // zIndex: 20,
        // display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    input: {
        backgroundColor: "#fff",
        color: "fff",
        textAlignVertical: "center",
        borderRadius: 25,
        marginHorizontal: 20,
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 50,
    },
});
