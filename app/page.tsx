"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [vault, setVault] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/vault")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(setVault)
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!vault) return <p>Loading...</p>;

  return (
    <main>
      <h1>{vault.name}</h1>
      <p>TVL: ${vault.tvl.toFixed(2)}</p>
      <ul>
        {vault.assets.assets.map((a, i) => (
          <li key={i}>
            {a.symbol}: {a.balance.toFixed(4)} (${a.value.toFixed(2)})
          </li>
        ))}
      </ul>
    </main>
  );
}
