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
import { getChat, getCritique } from "./transactions";
import { useFocusEffect } from "expo-router";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import KevinAgent from "./kevinAgent";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Rect, G, Path, Defs, ClipPath, ForeignObject, Mask } from "react-native-svg";

type ChatProps = {
    setChatOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Chat({ setChatOpen }: ChatProps) {
    const insets = useSafeAreaInsets();

    const [kevin, setKevin] = useState<string | null>(null);
    const [query, setQuery] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");
    const [showTextBubble, setTextBubbleVis] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const fetchCritique = async () => {
                try {
                    const result = await getCritique();
                    if (isActive) {
                        setKevin(result.trim());
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

    useEffect(() => {
        if (kevin && kevin.length > 0) {
            setTextBubbleVis(false);
            KevinAgent.speak(kevin).then(() => {
                setTextBubbleVis(true);
            })
        }
    }, [kevin])

    useEffect(() => {
        const fetchChatResponse = async () => {
            console.log(query)
            if (query && query.length > 0) {
                try {
                    const response = await getChat(query);
                    setKevin(response.trim());
                } catch (error) {
                    console.error("Error fetching chat response:", error);
                }
            }
        }
        fetchChatResponse();
    }, [query])

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    marginTop: insets.top,
                    marginRight: 16,
                }}
                onPress={() => setChatOpen(false)}
            >
                <Ionicons
                    name="close-outline"
                    size={32}
                    color={"rgb(142, 142, 147)"}
                    style={{
                        backgroundColor: "rgb(44, 44, 46)",
                        borderRadius: 360,
                    }}
                />
            </Pressable>
            
            {!!showTextBubble && 
            <View
                style={{
                    backgroundColor: "white",
                    alignSelf: "flex-start",
                    width: 283,
                    marginLeft: 16,
                    marginRight: 16,
                    marginBottom: 128,
                    padding: 16,
                    borderRadius: 14,
                }}
            >
                <Text>{kevin}</Text>

                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={393}
                    height={501}
                    style={{position: "absolute", bottom: -123, right: -94}}
                    fill="none"
                >
                    <G filter="url(#a)">
                        <G clipPath="url(#b)">
                            <G clipPath="url(#c)">
                            </G>
                        </G>
                        <Mask
                            id="e"
                            width={47}
                            height={13}
                            x={242}
                            y={378}
                            maskUnits="userSpaceOnUse"
                            style={{
                                maskType: "alpha",
                            }}
                        >
                            <ForeignObject
                                width={383}
                                height={388}
                                x={-34}
                                y={40}
                            ></ForeignObject>
                            <Path
                                fill="red"
                                fillRule="evenodd"
                                d="M242 378.003c1.712 0 3.424-.008 5.137.01 1.639.018 3.473.044 5.068.645 1.723.65 2.864 1.787 4.012 3.124.826.962 2.449 3.015 3.239 4.006.647.812 1.913 2.418 2.605 3.195.87.978 1.945 2.017 3.439 2.017 1.495 0 2.57-1.039 3.439-2.016.692-.776 1.958-2.383 2.605-3.195.789-.991 2.412-3.044 3.239-4.006 1.15-1.337 2.289-2.474 4.011-3.124 1.596-.6 3.431-.627 5.069-.645 1.713-.018 3.425-.01 5.137-.01"
                                clipRule="evenodd"
                                data-figma-bg-blur-radius={130}
                            />
                        </Mask>
                        <G clipPath="url(#f)" mask="url(#e)">
                            <Path
                                fill="#ffffff"
                                fillOpacity={0.97}
                                d="M242 378h47v13h-47z"
                            />
                            <Path
                                fill="#ffffff"
                                d="M0 0h47v13H0z"
                                style={{
                                    mixBlendMode: "color-dodge",
                                }}
                                transform="translate(242 378)"
                            />
                        </G>
                    </G>
                    <Defs>
                        <ClipPath id="d" transform={"translate(34 -40)"}>
                            <Path
                                fillRule="evenodd"
                                d="M242 378.003c1.712 0 3.424-.008 5.137.01 1.639.018 3.473.044 5.068.645 1.723.65 2.864 1.787 4.012 3.124.826.962 2.449 3.015 3.239 4.006.647.812 1.913 2.418 2.605 3.195.87.978 1.945 2.017 3.439 2.017 1.495 0 2.57-1.039 3.439-2.016.692-.776 1.958-2.383 2.605-3.195.789-.991 2.412-3.044 3.239-4.006 1.15-1.337 2.289-2.474 4.011-3.124 1.596-.6 3.431-.627 5.069-.645 1.713-.018 3.425-.01 5.137-.01"
                                clipRule="evenodd"
                            />
                        </ClipPath>
                        <ClipPath id="b">
                            <Rect
                                width={283}
                                height={288}
                                x={16}
                                y={90}
                                fill="#fff"
                                rx={13}
                            />
                        </ClipPath>
                        <ClipPath id="c">
                            <Path fill="#fff" d="M16 90h283v288H16z" />
                        </ClipPath>
                        <ClipPath id="f">
                            <Path fill="#fff" d="M242 378h47v13h-47z" />
                        </ClipPath>
                    </Defs>
                </Svg>
            </View>}

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
                            setInputText("");
                            setQuery(e);
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
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        width: "100%",
        height: "100%",
        flex: 1,
        zIndex: 40,
        position: "absolute",
        paddingBottom: 12,
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
        marginRight: 144,
    },
});
