import * as React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";

interface CustomTabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
    icon: keyof typeof Ionicons.glyphMap;
    isExpanded: boolean;
    index: number;
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
    (props, ref) => {
        function getExpandedStyles() {
            const bottom = props.index == 1 ? "100%": "90%"
            const right = props.index * 70 - 10
            return {bottom: bottom, right: right, opacity: 1} as ViewStyle;
        }

        return (
            <Pressable
                ref={ref}
                {...props}
                style={[
                    styles.button,
                    props.isFocused && styles.focusedButton,
                    props.isExpanded && getExpandedStyles(),
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
        );
    }
);

CustomTabButton.displayName = "CustomTabButton";

const styles = StyleSheet.create({
    button: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.06)",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 60,
        bottom: 0,
        opacity: 0,
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