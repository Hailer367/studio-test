
"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Import wallet adapter CSS
require('@solana/wallet-adapter-react-ui/styles.css');

type SolanaWallet = {
  connected: boolean;
  publicKey: string | null;
  connect: () => void;
  disconnect: () => void;
  sendTransaction: (transaction: Transaction) => Promise<string>;
  getBalance: () => Promise<number>;
  createGame: (wager: number) => Promise<string>;
  joinGame: (gameId: string, wager: number) => Promise<string>;
};

const SolanaWalletContext = createContext<SolanaWallet | null>(null);

function SolanaWalletInner({ children }: { children: ReactNode }) {
  const { publicKey, connected, connect, disconnect, sendTransaction: walletSendTransaction } = useWallet();
  
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const connection = new Connection(endpoint);

  const sendTransaction = async (transaction: Transaction): Promise<string> => {
    if (!publicKey || !walletSendTransaction) {
      throw new Error('Wallet not connected');
    }
    
    const signature = await walletSendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');
    return signature;
  };

  const getBalance = async (): Promise<number> => {
    if (!publicKey) return 0;
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  };

  const createGame = async (wager: number): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected');
    
    // Create a simple transaction that represents game creation
    // In a real implementation, this would interact with a Solana program
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('11111111111111111111111111111112'), // System program
        lamports: wager * LAMPORTS_PER_SOL,
      }),
    );
    
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    
    return await sendTransaction(transaction);
  };

  const joinGame = async (gameId: string, wager: number): Promise<string> => {
    if (!publicKey) throw new Error('Wallet not connected');
    
    // Create a transaction for joining game
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('11111111111111111111111111111112'),
        lamports: wager * LAMPORTS_PER_SOL,
      }),
    );
    
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    
    return await sendTransaction(transaction);
  };

  const value = useMemo(() => ({
    connected,
    publicKey: publicKey?.toString() || null,
    connect,
    disconnect,
    sendTransaction,
    getBalance,
    createGame,
    joinGame,
  }), [connected, publicKey, connect, disconnect]);

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  );
}

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaWalletInner>
            {children}
          </SolanaWalletInner>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export const useSimulatedWallet = () => {
  const context = useContext(SolanaWalletContext);
  if (!context) {
    throw new Error("useSimulatedWallet must be used within a SolanaWalletProvider");
  }
  return context;
};
