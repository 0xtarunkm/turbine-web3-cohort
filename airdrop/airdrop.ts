import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL,
    );
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error}`);
  }
})();
