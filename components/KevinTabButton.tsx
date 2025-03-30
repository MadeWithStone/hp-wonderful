import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";

type KevinTabButtonProps = {
    onPress: () => void,
    icon: keyof typeof Ionicons.glyphMap,
    color: string,
}

export default function KevinTabButton(props: KevinTabButtonProps) {
    return (
        <View>
            <Pressable style={{...styles.pressable, backgroundColor: props.color}} onPress={props.onPress}>
                <Ionicons name={props.icon} size={30} color="white"/>
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
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width:0, height: 4},
        shadowRadius: 16
    },
});