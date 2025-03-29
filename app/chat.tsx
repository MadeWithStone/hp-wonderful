import { Text, View } from "react-native";

export default function Chat() {
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
      }}>CHAT</Text>
    </View>
  );
}
