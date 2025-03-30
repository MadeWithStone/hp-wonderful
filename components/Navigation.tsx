import { View, StyleSheet } from "react-native";
import { CustomTabButton } from "@/components/CustomTabButton";
import React, { useEffect } from "react";
import { KevinButton } from "./KevinButton";
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router";

export default function Navigation() {
	const router = useRouter();
	const [isExpanded, setIsExpanded] = React.useState(false);

	function toggleExpandHandler() {
		setIsExpanded(!isExpanded);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
	}

	return (
	<View style={{display: "flex", width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "flex-end", position: "absolute"}}>
		<View style={{...styles.tabList, bottom: isExpanded ? 0 : -70}}>
			<CustomTabButton icon="chatbubble" isExpanded={isExpanded} index={1} background={"#34c759"} onPress={() => {router.push("/chat")}} />
			<CustomTabButton icon="map" isExpanded={isExpanded} index={0} background={"#007aff"} onPress={() => {router.push("/quests")}}/>
			<KevinButton
				onPress={toggleExpandHandler}
				isExpanded={isExpanded}
			/>
		</View>
	</View>
	);
}

const styles = StyleSheet.create({
	tabList: {
		position: "relative",
		right: 20,
		bottom: 0,
	}
});