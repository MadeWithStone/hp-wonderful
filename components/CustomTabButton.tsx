import * as React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";

interface CustomTabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
    icon: keyof typeof Ionicons.glyphMap;
    isExpanded: boolean;
    index: number;
    background: string;
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
    (props, ref) => {
        const rightAnim = React.useRef(new Animated.Value(15)).current;
        const bottomAnim = React.useRef(new Animated.Value(50)).current;
        const opacityAnim = React.useRef(new Animated.Value(1)).current;
        
        function getExpandedPosition() {
            const bottom = 100;
            const right = props.index * 23 + 3;
            return { bottom, right, opacity: 1 };
        }
        
        React.useEffect(() => {
            const { bottom, right, opacity } = props.isExpanded ? getExpandedPosition() : { bottom: 50, right: 15, opacity: 0 };
            
            Animated.parallel([
                Animated.timing(rightAnim, {
                    toValue: right,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(bottomAnim, {
                    toValue: bottom,
                    duration: 150,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: opacity,
                    duration: 150,
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
                        }),
                        opacity: opacityAnim
                    }
                ]}
            >
                <Pressable
                    ref={ref}
                    {...props}
                    style={{
                        ...styles.pressable, backgroundColor: "props.background",
                    }}
                >
                    <Ionicons
                        name={props.icon}
                        size={32}
                        color={"#fff"}
                    />
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
        position: "absolute"
    },
    pressable: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1f2b2e"
    },
    focusedText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "500"
    }
});