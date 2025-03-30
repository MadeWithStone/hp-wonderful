import KevinAgent from "@/app/kevinAgent";
import { useEffect, useState } from "react";
import { StyleSheet, Image, Pressable, View } from "react-native";

interface KevinButtonProps {
    onPress: () => void;
    isExpanded: boolean;
}

export function KevinButton(props: KevinButtonProps) {
    const audioCallback = (amplitude: number) => {
        setHeadRotation(amplitude);
    };

    const [headRotation, setHeadRotation] = useState<number>(0);

    useEffect(() => {
        KevinAgent.addAmplitudeCallback(audioCallback);
    }, []);

    return (
        <Pressable style={styles.mainButton} onPress={props.onPress}>
            <View>
                <Image
                    source={require("@/assets/images/kevin_top.png")}
                    style={{
                        width: 180, height: 102,
                        transform: [
                            {
                                rotate: `${Math.min(
                                    Math.max(headRotation * 100, 0),
                                    20
                                )}deg`,
                            },
                        ],
                        transformOrigin: "bottom right"
                    }}
                />
                <Image
                    source={require("@/assets/images/kevin_bottom.png")}
                    style={{width: 180, height: 77}}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    mainButton: {
        width: 180,
        height: 180,
        justifyContent: "center",
        alignItems: "center",
    },
});
