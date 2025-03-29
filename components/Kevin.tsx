import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { CustomTabButton } from "@/components/CustomTabButton";
import { ToggleMenuButton } from "./ToggleMenuButton";
import React, { useEffect } from "react";
import KevinAgent from "@/app/kevinAgent";

export default function Kevin() {
	const [isExpanded, setIsExpanded] = React.useState(false);

	useEffect(() => {
		testKevin();
	}, []);

	const testKevin = async () => {
		await KevinAgent.speak("I am kevin oleary!!");
	}

	function toggleExpandHandler() {
		setIsExpanded(!isExpanded);
	}

	return (
		<Tabs>
			<TabSlot />
			<TabList style={styles.tabList}>
				<TabTrigger name="home" href="/" asChild>
					<CustomTabButton icon="home" isExpanded={isExpanded} index={3}>Home</CustomTabButton>
				</TabTrigger>
				<TabTrigger name="chat" href="/chat" asChild>
					<CustomTabButton icon="chatbox" isExpanded={isExpanded} index={2}>Chat</CustomTabButton>
				</TabTrigger>
				<TabTrigger name="settings" href="/profile" asChild>
					<CustomTabButton icon="person" isExpanded={isExpanded} index={1}>Profile</CustomTabButton>
				</TabTrigger>
				<TabTrigger name="quest" href="/quests" asChild>
					<CustomTabButton icon="map" isExpanded={isExpanded} index={0}>Quests</CustomTabButton>
				</TabTrigger>
				<ToggleMenuButton
					onPress={toggleExpandHandler}
					isExpanded={isExpanded}
				/>
			</TabList>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabList: {
		display: "flex",
		position: "absolute",
		bottom: 32,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "red",
		width: "100%",
		padding: 8
	}
});