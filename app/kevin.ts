import { ElevenLabsClient } from "elevenlabs";

const ELEVEN_LABS_API_KEY =
  "sk_e449cab443d6c49d26229073792ebbec46a9622a2b97eab0";
const ELEVEN_LABS_VOICE_ID = "F0YyB5FPodSvW9GVYILr";

const client = new ElevenLabsClient({ apiKey: ELEVEN_LABS_API_KEY });

class Kevin {
  static async speak(text: string) {
    // send text to eleven labs to be converted to speech
    const response = await client.generate({
      stream: true,
      voice: ELEVEN_LABS_VOICE_ID,
      model_id: "eleven_multilingual_v2",
      text: text,
    });

    // Convert stream to blob and create URL
    const chunks = [];
    for await (const chunk of response) {
      chunks.push(chunk);
    }
    const blob = new Blob(chunks, { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.play();
  }
}

export default Kevin;
