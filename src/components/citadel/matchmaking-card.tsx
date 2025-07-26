
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, Loader2 } from "lucide-react";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { MatchFoundDialog } from "./match-found-dialog";
import { RuneIcon } from "../icons/rune-icon";
import { cn } from "@/lib/utils";

type MatchmakingState = "idle" | "searching";

import { api, Game } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function MatchmakingCard() {
  const { connected } = useSimulatedWallet();
  const [state, setState] = useState<MatchmakingState>("idle");
  const [isMatchFound, setIsMatchFound] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState({ name: '', avatar: '' });
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch available games
  const fetchGames = async () => {
    try {
      const games = await api.getAvailableGames();
      setAvailableGames(games);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  React.useEffect(() => {
    fetchGames();
    // Refresh games every 5 seconds
    const interval = setInterval(fetchGames, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinMatch = (opponent: { name: string, avatar: string }) => {
    if (!connected) return;
    setSelectedOpponent(opponent);
    setState("searching");
    setTimeout(() => {
      setState("idle");
      setIsMatchFound(true);
    }, 3000);
  };
  
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">The Arena</CardTitle>
          <CardDescription>Challenge a rival and stake your claim.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center p-6">
          {state === "idle" && (
            <div className="flex-grow flex flex-col justify-center">
              {!connected ? (
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">Connect your wallet to see available games.</p>
                </div>
              ) : (
                  <ScrollArea className="flex-grow h-64 pr-4">
                      <div className="space-y-4">
                          {availableGames.map(game => (
                              <div key={game.id} className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-secondary/50 transition-colors">
                                  <div className="flex items-center gap-3">
                                      <Avatar className="h-10 w-10">
                                          <AvatarImage src={game.avatar} alt={game.opponent} data-ai-hint="gaming avatar"/>
                                          <AvatarFallback>{game.opponent.substring(0, 2)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <p className="font-semibold">{game.opponent}</p>
                                          <p className="text-xs text-muted-foreground">Wager: ◎ {game.wager.toFixed(2)}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RuneIcon className={cn("h-6 w-6", game.side === 'light' ? 'text-primary' : 'text-accent -scale-x-100')} />
                                    <Button size="sm" onClick={() => handleJoinMatch({ name: game.opponent, avatar: game.avatar })} className="font-headline tracking-wider">
                                        <Swords className="h-4 w-4"/>
                                        Join
                                    </Button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </ScrollArea>
              )}
            </div>
          )}
          {state === "searching" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="font-semibold text-lg font-headline">Joining match...</p>
              <p className="text-muted-foreground">The runes are casting, prepare for battle.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <MatchFoundDialog 
        open={isMatchFound} 
        onOpenChange={setIsMatchFound}
        opponent={selectedOpponent}
      />
    </>
  );
}
