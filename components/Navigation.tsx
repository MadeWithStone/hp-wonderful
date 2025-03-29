import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { CustomTabButton } from "@/components/CustomTabButton";
import { ToggleMenuButton } from "./ToggleMenuButton";
import React, { useEffect } from "react";
import KevinAgent from "@/app/kevinAgent";
import { KevinButton } from "./KevinButton";

export default function Navigation() {
	const [isExpanded, setIsExpanded] = React.useState(false);

	function toggleExpandHandler() {
		setIsExpanded(!isExpanded);
	}

	return (
		<Tabs>
			<TabSlot />
			<TabList style={styles.tabList}>
				<TabTrigger name="home" href="/" asChild>
					<CustomTabButton icon="home" isExpanded={isExpanded} index={2}>Home</CustomTabButton>
				</TabTrigger>
				<TabTrigger name="chat" href="/chat" asChild>
					<CustomTabButton icon="chatbox" isExpanded={isExpanded} index={1}>Chat</CustomTabButton>
				</TabTrigger>
				<TabTrigger name="quest" href="/quests" asChild>
					<CustomTabButton icon="map" isExpanded={isExpanded} index={0}>Quests</CustomTabButton>
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
		alignSelf: "flex-end",
		position: "relative",
		right: 20,
	}
});