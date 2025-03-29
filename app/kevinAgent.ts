import { ElevenLabsClient, play } from "elevenlabs";
import { Audio } from "expo-av";

const ELEVEN_LABS_API_KEY =
  "sk_e449cab443d6c49d26229073792ebbec46a9622a2b97eab0";
const ELEVEN_LABS_VOICE_ID = "F0YyB5FPodSvW9GVYILr";

// https://stackoverflow.com/a/60782610
function _arrayBufferToBase64(buffer : ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

class KevinAgent {
  static client: ElevenLabsClient;
  static initialize() {
    this.client = new ElevenLabsClient({ apiKey: ELEVEN_LABS_API_KEY });
  }

  static async speak(text: string) {
    try {
      // send text to eleven labs to be converted to speech
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVEN_LABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              speed: 1.0,
              stability: 1.0,
              similarity_boost: 0.84,
              use_speaker_boost: true,
              style: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64 = _arrayBufferToBase64(uint8Array.buffer);
      const dataUri = `data:audio/mpeg;base64,${base64}`;

      const { sound } = await Audio.Sound.createAsync(
        { uri: dataUri },
        { shouldPlay: true }
      );

      await sound.playAsync();
    } catch (error) {
      console.error("Error in speak:", error);
    }
  }
}

export default KevinAgent;
