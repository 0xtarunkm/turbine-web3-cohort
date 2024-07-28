import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import bs58 from "bs58";
import "dotenv/config";

const base58EncodedSecretKey =
  "5CQsqEpETZVoos7cwEDGghC18sLugDGB1sQUGnzTArFsVjWu9zoxYyPivq1BxM5dbyHYn7uGjizxNpo6ztcN2Nn4";

// Decode the Base58 encoded string into a Uint8Array
const secretKeyUint8Array = bs58.decode(base58EncodedSecretKey);

// Create a Keypair using the decoded secret key
const keypair = Keypair.fromSecretKey(secretKeyUint8Array);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const github = Buffer.from("tarunclub", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program: Program<WbaPrereq> = new Program(IDL, provider);

const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId,
);

(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
  https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
