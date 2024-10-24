import alert from "../utils/tg_alert";
import evm from "./evm";

async function deployer_waas_contracts() {
  try {
    await evm();
  } catch (error) {
    console.log(error);
    await alert("Error Deploying WAAS Contracts!");
    await alert(JSON.stringify(error));
  }
}

deployer_waas_contracts();
