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
        headerShown: true,
        headerLargeTitle: true,
        title: "Home",
        animation: "slide_from_bottom",
        presentation: "modal",
        contentStyle: {backgroundColor: "white"}
      }}
    />
    <Navigation />
  </>
}
