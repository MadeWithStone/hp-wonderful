import { Stack } from "expo-router";
import Kevin from "@/components/Kevin";
import React from "react";
import KevinAgent from "@/app/kevinAgent";
export default function RootLayout() {
  React.useEffect(() => {
    KevinAgent.initialize();
  }, []);
  return <Kevin />;
}
