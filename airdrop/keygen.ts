import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import promptSync from 'prompt-sync';

const prompt = promptSync();
let kp = Keypair.generate();

console.log(
  `You've generated a new Solana wallet: ${kp.publicKey.toBase58()}, secret key: ${kp.secretKey}`
);

// Function to convert Base58 encoded string to wallet byte array
function base58ToWallet() {
  const base58 = prompt('Enter your Base58 encoded private key: ');
  try {
    const wallet = bs58.decode(base58);
    console.log('Wallet byte array:', Array.from(wallet));
  } catch (error) {
    console.error('Failed to decode Base58 string:', error);
  }
}

// Function to convert wallet byte array to Base58 encoded string
function walletToBase58() {
  // Example wallet byte array
  const wallet: number[] = [
    5, 3, 124, 54, 179, 170, 2, 138, 142, 136, 239, 148, 82, 112, 154, 219, 188,
    161, 129, 169, 153, 136, 220, 105, 113, 114, 84, 160, 104, 134, 81, 232, 4,
    208, 44, 117, 89, 161, 107, 201, 80, 168, 225, 149, 78, 224, 198, 60, 11,
    214, 156, 215, 10, 82, 60, 83, 247, 196, 86, 68, 138, 37, 88, 118,
  ];
  const base58 = bs58.encode(Buffer.from(wallet));
  console.log('Base58 encoded string:', base58);
}

base58ToWallet();
walletToBase58();
