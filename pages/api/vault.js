import { JsonRpcProvider } from "ethers";
import { Dhedge, Network } from "@dhedge/v2-sdk";

export default async function handler(req, res) {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const VAULT_ADDRESS = process.env.NEXT_PUBLIC_VAULT_ADDRESS;

  if (!rpcUrl || !VAULT_ADDRESS) {
    return res.status(500).json({
      error: "Missing environment variables",
    });
  }

  try {
    const provider = new JsonRpcProvider(rpcUrl);
    const dhedge = new Dhedge(provider, Network.POLYGON);

    const [name, tvl, assets] = await Promise.all([
      dhedge.getPoolName(VAULT_ADDRESS),
      dhedge.getFundValueUSD(VAULT_ADDRESS),
      dhedge.getPoolComposition(VAULT_ADDRESS),
    ]);

    res.status(200).json({ name, tvl, assets });
  } catch (err) {
    console.error("Vault fetch error:", err);
    res.status(500).json({ error: err.message || "Failed to fetch vault data" });
  }
}
