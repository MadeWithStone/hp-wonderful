import * as React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";

interface CustomTabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
    icon: keyof typeof Ionicons.glyphMap;
    isExpanded: boolean;
    index: number;
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
    (props, ref) => {
        const rightAnim = React.useRef(new Animated.Value(15)).current;
        const bottomAnim = React.useRef(new Animated.Value(50)).current;
        
        function getExpandedPosition() {
            const bottom = props.index == 1 ? 100 : 90;
            const right = props.index * 18 - 3;
            return { bottom, right };
        }
        
        React.useEffect(() => {
            const { bottom, right } = props.isExpanded ? getExpandedPosition() : { bottom: 50, right: 15 };
            
            Animated.parallel([
                Animated.timing(rightAnim, {
                    toValue: right,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(bottomAnim, {
                    toValue: bottom,
                    duration: 100,
                    useNativeDriver: false,
                })
            ]).start();
        }, [props.isExpanded, props.index]);

        return (
            <Animated.View
                style={[
                    styles.button,
                    {
                        right: rightAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']
                        }),
                        bottom: bottomAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']
                        })
                    }
                ]}
            >
                <Pressable
                    ref={ref}
                    {...props}
                    style={[
                        styles.pressable,
                        props.isFocused && styles.focusedButton,
                    ]}
                >
                    <Ionicons
                        name={props.icon}
                        size={24}
                        color={props.isFocused ? "#fff" : "#64748B"}
                    />
                    <Text style={[styles.text, props.isFocused && styles.focusedText]}>
                        {props.children}
                    </Text>
                </Pressable>
            </Animated.View>
        );
    }
);

CustomTabButton.displayName = "CustomTabButton";

const styles = StyleSheet.create({
    button: {
        width: 65,
        height: 65,
        position: "absolute",
        opacity: 1,
    },
    pressable: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.06)",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    focusedButton: {
        backgroundColor: "#6366F1"
    },
    focusedText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "500"
    },
    text: {
        color: "#64748B",
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500"
    }
});