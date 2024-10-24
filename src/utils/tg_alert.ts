import axios from "axios";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export default async function alert(text: string) {
  const baseUrl: string = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: "@p2p_logs",
    text: text,
  };

  try {
    await axios.get(baseUrl, {
      params: payload,
    });
  } catch (error) {
    console.error("Error sending Telegram alert:", error);
  }
}
