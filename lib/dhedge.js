// lib/dhedge.js
import { JsonRpcProvider } from "ethers";
import { Dhedge, Network } from "@dhedge/v2-sdk";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
const dhedge = new Dhedge(provider, Network.POLYGON);

export async function getVaultData() {
  const vaultAddress = process.env.NEXT_PUBLIC_VAULT_ADDRESS;
  const [name, tvl, assets] = await Promise.all([
    dhedge.getPoolName(vaultAddress),
    dhedge.getFundValueUSD(vaultAddress),
    dhedge.getPoolComposition(vaultAddress),
  ]);

  return { name, tvl, assets };
}
