
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { User, Swords, BarChart, History, Wallet, TrendingUp, TrendingDown, Copy, Gift, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";

export function ProfileCard() {
  const { connected, publicKey, connect } = useSimulatedWallet();
  const { toast } = useToast();
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        toast({ title: "Copied to clipboard!", description: text });
    });
  };

  const handleCopy = (text: string, type: string) => {
    copyToClipboard(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const stats = {
    wins: 29,
    losses: 13,
    winRate: "69%",
    totalWon: "◎ 25.75",
    totalLost: "◎ 15.25"
  };

  const referralLink = `https://citadelcoin.io/ref/${publicKey?.substring(0, 8)}`;


  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-3"><User className="h-6 w-6 text-accent" />Your Profile</CardTitle>
        <CardDescription>Your legend in the Citadel</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {connected && publicKey ? (
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={`https://placehold.co/100x100`} alt="Your avatar" data-ai-hint="warrior avatar" />
                <AvatarFallback>{publicKey.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-lg">Challenger</p>
                        <p className="text-sm font-mono text-muted-foreground">◎ 5.23 SOL</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-1">
                 <Label className="text-xs text-muted-foreground">Wallet Address</Label>
                 <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground font-mono truncate flex-1" title={publicKey}>
                        {publicKey}
                    </p>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(publicKey, 'address')}>
                        {copied === 'address' ? <Check className="text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                 </div>
            </div>

            <Separator />
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground"><Swords /><span>Record</span></div>
                  <span className="font-bold text-foreground">{stats.wins}W / {stats.losses}L</span>
                </div>
                 <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground"><BarChart /><span>Win Rate</span></div>
                  <span className="font-bold text-foreground">{stats.winRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400"><TrendingUp /><span>Total Won</span></div>
                  <span className="font-bold text-green-400">{stats.totalWon}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400"><TrendingDown /><span>Total Lost</span></div>
                  <span className="font-bold text-red-400">{stats.totalLost}</span>
                </div>
            </div>
            
            <Separator />

            {/* Referral Link */}
            <div className="space-y-1">
                 <Label className="text-xs text-muted-foreground">Referral Link</Label>
                 <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground font-mono truncate flex-1">
                        {referralLink}
                    </p>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(referralLink, 'ref')}>
                         {copied === 'ref' ? <Check className="text-green-500" /> : <Gift className="h-4 w-4" />}
                    </Button>
                 </div>
            </div>


          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
            <User className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Connect your wallet to view your profile.</p>
            <Button onClick={connect}>Connect Wallet</Button>
          </div>
        )}
      </CardContent>
      {connected && (
        <CardFooter>
            <Button asChild variant="outline" className="w-full">
                <Link href="/history">
                    <>
                        <History /> View Match History
                    </>
                </Link>
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
