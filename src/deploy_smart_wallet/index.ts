import alert from "../utils/tg_alert";
import evm from "./evm";

async function deployer_smart_wallets() {
  try {
    await evm();
  } catch (error) {
    console.log(error);
    await alert("Error Deploying Smart Wallets!");
    await alert(JSON.stringify(error));
  }
}

deployer_smart_wallets();
