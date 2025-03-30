import { Stack } from "expo-router";
import Navigation from "@/components/Navigation";
import React from "react";
import KevinAgent from "@/app/kevinAgent";
import { Text } from "react-native";

export default function RootLayout() {
  React.useEffect(() => {
    KevinAgent.initialize();
  }, []);
  
  return <>
    <Stack 
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
        presentation: "modal",
        contentStyle: { backgroundColor: "#000" }
      }}
    />
    <Navigation />
  </>
}
