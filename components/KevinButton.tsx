import { StyleSheet, Image, Pressable } from "react-native";

interface KevinButtonProps {
    onPress: () => void;
    isExpanded: boolean;
}

export function KevinButton(props: KevinButtonProps) {
    return (
        <Pressable style={styles.mainButton} onPress={props.onPress}>
            <Image source={require("@/assets/images/kevin.png")} style={styles.mainButton} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    mainButton: {
        width: 180,
        height: 180,
        justifyContent: "center",
        alignItems: "center"
    }
});