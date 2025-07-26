"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { useSolanaBlockchain } from '@/hooks/use-solana-blockchain';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function WalletConnection() {
  const { connected, publicKey } = useWallet();
  const { balance, getBalance } = useSolanaBlockchain();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  if (!connected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WalletMultiButton className="w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className




