import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ToggleMenuButtonProps {
	onPress: () => void;
	isExpanded: boolean;
}

export function ToggleMenuButton(props: ToggleMenuButtonProps) {
	return (
		<TouchableOpacity style={styles.mainButton} onPress={props.onPress} activeOpacity={1}>
			<View>
				<Ionicons name="menu" size={24} color="#fff" />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	mainButton: {
		width: 65,
		height: 65,
		borderRadius: 32.5,
		backgroundColor: "#007AFF",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
		position: "absolute",
		bottom: 0,
		right: 0
	}
});