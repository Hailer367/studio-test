"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  Keypair,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface GameState {
  gameId: string;
  player1: PublicKey;
  player2: PublicKey | null;
  betAmount: number;
  isActive: boolean;
  winner: PublicKey | null;
  coinResult: 'heads' | 'tails' | null;
}

export function useSolanaBlockchain() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState<GameState[]>([]);

  // Get wallet balance
  const getBalance = useCallback(async () => {
    if (!publicKey) return 0;
    
    try {
      const balance = await connection.getBalance(publicKey);
      const solBalance = balance / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      return solBalance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  }, [connection, publicKey]);

  // Create a new coin flip game
  const createGame = useCallback(async (betAmount: number): Promise<string | null> => {
    if (!publicKey || !connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a game",
        variant: "destructive"
      });
      return null;
    }

    if (betAmount <= 0) {
      toast({
        title: "Invalid bet amount",
        description: "Bet amount must be greater than 0",
        variant: "destructive"
      });
      return null;
    }

    setLoading(true);
    
    try {
      // Generate unique game ID
      const gameId = Keypair.generate().publicKey.toString();
      
      // Create escrow account for the game
      const escrowAccount = Keypair.generate();
      
      // Create transaction to transfer bet to escrow
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: escrowAccount.publicKey,
          lamports: betAmount * LAMPORTS_PER_SOL,
          space: 0,
          programId: SystemProgram.programId,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection, {
        signers: [escrowAccount]
      });

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'processed');

      // Create game state
      const newGame: GameState = {
        gameId,
        player1: publicKey,
        player2: null,
        betAmount,
        isActive: true,
        winner: null,
        coinResult: null
      };

      setGames(prev => [...prev, newGame]);

      toast({
        title: "Game created successfully!",
        description: `Game ID: ${gameId.slice(0, 8)}...`,
        variant: "default"
      });

      await getBalance(); // Update balance
      return gameId;

    } catch (error: any) {
      console.error('Error creating game:', error);
      toast({
        title: "Failed to create game",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, sendTransaction, connection, getBalance]);

  // Join an existing game
  const joinGame = useCallback(async (gameId: string): Promise<boolean> => {
    if (!publicKey || !connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to join a game",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);

    try {
      const gameIndex = games.findIndex(g => g.gameId === gameId);
      if (gameIndex === -1) {
        toast({
          title: "Game not found",
          description: "The specified game does not exist",
          variant: "destructive"
        });
        return false;
      }

      const game = games[gameIndex];
      
      if (!game.isActive || game.player2) {
        toast({
          title: "Cannot join game",
          description: "Game is not available for joining",
          variant: "destructive"
        });
        return false;
      }

      // Create transaction to match the bet
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(gameId), // Use gameId as temporary escrow
          lamports: game.betAmount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

      // Update game state
      const updatedGame = { ...game, player2: publicKey };
      const updatedGames = [...games];
      updatedGames[gameIndex] = updatedGame;
      setGames(updatedGames);

      toast({
        title: "Joined game successfully!",
        description: "Waiting for coin flip...",
        variant: "default"
      });

      // Automatically flip coin when player 2 joins
      setTimeout(() => flipCoin(gameId), 1000);

      await getBalance();
      return true;

    } catch (error: any) {
      console.error('Error joining game:', error);
      toast({
        title: "Failed to join game",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, sendTransaction, connection, games, getBalance]);

  // Flip coin and determine winner
  const flipCoin = useCallback(async (gameId: string): Promise<'heads' | 'tails' | null> => {
    setLoading(true);

    try {
      const gameIndex = games.findIndex(g => g.gameId === gameId);
      if (gameIndex === -1) return null;

      const game = games[gameIndex];
      if (!game.player2 || !game.isActive) return null;

      // Generate cryptographically secure random result
      const randomBytes = new Uint8Array(1);
      crypto.getRandomValues(randomBytes);
      const coinResult: 'heads' | 'tails' = randomBytes[0] % 2 === 0 ? 'heads' : 'tails';

      // Determine winner (player1 = heads, player2 = tails)
      const winner = coinResult === 'heads' ? game.player1 : game.player2;
      const totalPot = game.betAmount * 2 * LAMPORTS_PER_SOL;

      // Create payout transaction
      if (publicKey && (winner.equals(publicKey))) {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(gameId), // From escrow
            toPubkey: winner,
            lamports: totalPot,
          })
        );

        try {
          const signature = await sendTransaction(transaction, connection);
          await connection.confirmTransaction(signature, 'processed');
        } catch (payoutError) {
          console.error('Payout error:', payoutError);
          // Handle payout error gracefully
        }
      }

      // Update game state
      const updatedGame = { 
        ...game, 
        coinResult, 
        winner, 
        isActive: false 
      };
      const updatedGames = [...games];
      updatedGames[gameIndex] = updatedGame;
      setGames(updatedGames);

      toast({
        title: `Coin landed on ${coinResult}!`,
        description: winner.equals(publicKey!) ? "You won!" : "You lost!",
        variant: winner.equals(publicKey!) ? "default" : "destructive"
      });

      await getBalance();
      return coinResult;

    } catch (error: any) {
      console.error('Error flipping coin:', error);
      toast({
        title: "Error during coin flip",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [games, publicKey, sendTransaction, connection, getBalance]);

  // Send SOL to another address
  const sendSol = useCallback(async (to: string, amount: number): Promise<boolean> => {
    if (!publicKey || !connected) return false;

    setLoading(true);

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

      toast({
        title: "Transaction successful",
        description: `Sent ${amount} SOL`,
        variant: "default"
      });

      await getBalance();
      return true;

    } catch (error: any) {
      console.error('Error sending SOL:', error);
      toast({
        title: "Transaction failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, sendTransaction, connection, getBalance]);

  // Initialize balance on wallet connection
  useEffect(() => {
    if (connected && publicKey) {
      getBalance();
    }
  }, [connected, publicKey, getBalance]);

  return {
    // Wallet state
    publicKey,
    connected,
    balance,
    loading,
    
    // Game state
    games,
    
    // Actions
    createGame,
    joinGame,
    flipCoin,
    sendSol,
    getBalance,
  };
}
