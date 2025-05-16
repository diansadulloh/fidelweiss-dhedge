// pages/api/vault.js
import { JsonRpcProvider } from "ethers";
import { Dhedge, Network } from "@dhedge/v2-sdk";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
const dhedge = new Dhedge(provider, Network.POLYGON);

export default async function handler(req, res) {
  const VAULT_ADDRESS = process.env.NEXT_PUBLIC_VAULT_ADDRESS;

  try {
    const [name, tvl, assets] = await Promise.all([
      dhedge.getPoolName(VAULT_ADDRESS),
      dhedge.getFundValueUSD(VAULT_ADDRESS),
      dhedge.getPoolComposition(VAULT_ADDRESS),
    ]);
    res.status(200).json({ name, tvl, assets });
  } catch (err) {
    console.error("Vault fetch error:", err);
    res.status(500).json({ error: "Vault fetch failed" });
  }
}
