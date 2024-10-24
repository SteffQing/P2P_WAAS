import alert from "../utils/tg_alert";
import evm from "./evm";

async function activate_listeners() {
  try {
    await evm();
  } catch (error) {
    console.log(error);
    await alert("Error in listeners!");
    await alert(JSON.stringify(error));
  }
}

activate_listeners();
