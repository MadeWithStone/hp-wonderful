import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { CustomTabButton } from "@/components/CustomTabButton";
import React, { useEffect } from "react";
import KevinAgent from "@/app/kevinAgent";
import { KevinButton } from "./KevinButton";
import * as Haptics from "expo-haptics"

export default function Navigation() {
	const [isExpanded, setIsExpanded] = React.useState(false);

	function toggleExpandHandler() {
		setIsExpanded(!isExpanded);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
	}

	return (
		<Tabs style={{display: "flex", width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "flex-end"}}>
			<TabSlot style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000" }} />
			<TabList style={{...styles.tabList, bottom: isExpanded ? 0 : -70}}>
				<TabTrigger name="home" href="/" asChild onPress={() => setIsExpanded(false)}>
					<CustomTabButton icon="chatbubble" isExpanded={isExpanded} index={1} background={"#34c759"}>Home</CustomTabButton>
				</TabTrigger>
				<TabTrigger name="quest" href="/quests" asChild onPress={() => setIsExpanded(false)}>
					<CustomTabButton icon="map" isExpanded={isExpanded} index={0} background={"#007aff"}>Quests</CustomTabButton>
				</TabTrigger>
				<KevinButton
					onPress={toggleExpandHandler}
					isExpanded={isExpanded}
				/>
			</TabList>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabList: {
		position: "relative",
		right: 20,
		bottom: 0,
	}
});