import { Stack } from "expo-router";
import Navigation from "@/components/Navigation";
import React from "react";
import KevinAgent from "@/app/kevinAgent";
export default function RootLayout() {
  React.useEffect(() => {
    KevinAgent.initialize();
  }, []);
  return <Navigation />
}
