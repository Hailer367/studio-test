import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Trophy } from "lucide-react";

const mockLeaderboard = [
  {
    rank: 1,
    player: "SolanaSorcerer",
    avatar: "https://placehold.co/40x40",
    wins: 152,
    losses: 34,
    winRate: "81.7%",
  },
  {
    rank: 2,
    player: "RuneMaster69",
    avatar: "https://placehold.co/40x40",
    wins: 140,
    losses: 45,
    winRate: "75.7%",
  },
  {
    rank: 3,
    player: "CryptoKing",
    avatar: "https://placehold.co/40x40",
    wins: 121,
    losses: 50,
    winRate: "70.8%",
  },
  {
    rank: 4,
    player: "ShadowGamer_42",
    avatar: "https://placehold.co/40x40",
    wins: 115,
    losses: 60,
    winRate: "65.7%",
  },
  {
    rank: 5,
    player: "You",
    avatar: "https://placehold.co/40x40",
    wins: 29,
    losses: 13,
    winRate: "69.0%",
    isCurrentUser: true,
  },
  {
    rank: 6,
    player: "MysticMarvin",
    avatar: "https://placehold.co/40x40",
    wins: 98,
    losses: 40,
    winRate: "71.0%",
  },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline">Leaderboard</h1>
        <p className="text-muted-foreground">The Citadel's most legendary challengers.</p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Trophy className="text-amber-400" />
            Top Challengers
          </CardTitle>
          <CardDescription>The current global rankings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-20">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-center">Wins</TableHead>
                <TableHead className="text-center">Losses</TableHead>
                <TableHead className="text-right">Win Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.sort((a,b) => a.rank - b.rank).map((entry) => (
                <TableRow key={entry.rank} className={entry.isCurrentUser ? "bg-primary/20" : ""}>
                  <TableCell className="text-center font-bold text-lg">
                    {entry.rank === 1 && <Trophy className="h-6 w-6 text-amber-400 inline-block" />}
                    {entry.rank === 2 && <Trophy className="h-6 w-6 text-slate-400 inline-block" />}
                    {entry.rank === 3 && <Trophy className="h-6 w-6 text-orange-600 inline-block" />}
                    {entry.rank > 3 && entry.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={entry.avatar} alt={entry.player} data-ai-hint="gaming avatar"/>
                        <AvatarFallback>{entry.player.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.player}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-green-400 font-mono">{entry.wins}</TableCell>
                  <TableCell className="text-center text-red-400 font-mono">{entry.losses}</TableCell>
                  <TableCell className="text-right font-mono">{entry.winRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
