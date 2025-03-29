import { Text, TextInput, View, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard } from "react-native";
import { getCritique } from "./transactions";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import KevinAgent from "./kevinAgent";
import { KeyboardAvoidingView } from "react-native";

export default function Chat() {
  const [critique, setCritique] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  useFocusEffect(useCallback(() => {
    let isActive = true;

    const fetchCritique = async () => {
      try {
        const result = "";
        // const result = await getCritique();
        if (isActive) {
          setCritique(result);
          console.log(result);
          // KevinAgent.speak(result);
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}
    >
      <TextInput 
        style={styles.input}
        multiline={true}
        placeholder="Say something"
        placeholderTextColor={"gray"}
        value={inputText}
        onChangeText={(e) => {
          if (e.includes("\n")) {
            Keyboard.dismiss();
          } else {
            setInputText(e);
          }
        }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "#fff",
    color: "fff",
    textAlignVertical: "center",
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 50,
  }
});