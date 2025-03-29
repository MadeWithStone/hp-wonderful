import { Text, View } from "react-native";
import { getCritique } from "./transactions"; 
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import KevinAgent from "./kevinAgent";

export default function Chat() {
  const [critique, setCritique] = useState<string | null>(null);

  useFocusEffect(useCallback(() => {
      let isActive = true;

      const fetchCritique = async () => {
        try {
          const result = await getCritique();
          if (isActive) {
            setCritique(result);
            console.log(result);
            KevinAgent.speak(result.substring(0, 100));
          }
        } catch (error) {
          console.error("Error fetching critique:", error);
        }
      }

      fetchCritique();
      return () => {
        isActive = false;
      }
    }, []));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Text style={{
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
      }}>{critique}</Text>
    </View>
  );
}
