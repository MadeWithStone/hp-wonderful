import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";

type KevinTabButtonProps = {
    onPress: () => void
}

export default function KevinTabButton({onPress}: KevinTabButtonProps) {
    return (
        <View>
            <Pressable style={{...styles.pressable}} onPress={onPress}>
                <Ionicons name="home"/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    pressable: {
        width: 64,
        height: 64,
        borderRadius: 360,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1f2b2e",
    },
});
