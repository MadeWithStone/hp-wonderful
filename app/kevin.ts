import { ElevenLabsClient } from "elevenlabs";

const ELEVEN_LABS_API_KEY =
  "sk_e449cab443d6c49d26229073792ebbec46a9622a2b97eab0";
const ELEVEN_LABS_VOICE_ID = "F0YyB5FPodSvW9GVYILr";

const client = new ElevenLabsClient({ apiKey: ELEVEN_LABS_API_KEY });

class Kevin {
  static async speak(text: string) {
    // send text to eleven labs to be converted to speech
    const response = await client.textToSpeech.generate({
      stream: true,
      voice_id: ELEVEN_LABS_VOICE_ID,
      model_id: "eleven_multilingual_v2",
      text: text,
    });

    // play audio as streamed in expo app
    const audio = new Audio(response);
    audio.play();
  }
}

export default Kevin;
