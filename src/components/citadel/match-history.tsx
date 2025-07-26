import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const mockHistory = [
  {
    id: 1,
    opponent: "ShadowGamer_42",
    opponentAvatar: "https://placehold.co/40x40",
    result: "Win",
    wager: 0.5,
    date: "2024-05-20 10:30 PM",
  },
  {
    id: 2,
    opponent: "CryptoKing",
    opponentAvatar: "https://placehold.co/40x40",
    result: "Loss",
    wager: 1.0,
    date: "2024-05-20 09:15 PM",
  },
  {
    id: 3,
    opponent: "SolanaSorcerer",
    opponentAvatar: "https://placehold.co/40x40",
    result: "Win",
    wager: 0.25,
    date: "2024-05-19 04:00 PM",
  },
    {
    id: 4,
    opponent: "RuneFlipper",
    opponentAvatar: "https://placehold.co/40x40",
    result: "Loss",
    wager: 2.0,
    date: "2024-05-19 03:30 PM",
  },
   {
    id: 5,
    opponent: "MysticMarvin",
    opponentAvatar: "https://placehold.co/40x40",
    result: "Win",
    wager: 0.1,
    date: "2024-05-18 11:00 AM",
  },
];

export function MatchHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Match History</CardTitle>
        <CardDescription>Review your past battles and glorious victories.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opponent</TableHead>
              <TableHead className="text-center">Result</TableHead>
              <TableHead className="text-right">Wager (SOL)</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((match) => (
              <TableRow key={match.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={match.opponentAvatar} alt={match.opponent} data-ai-hint="gaming avatar"/>
                      <AvatarFallback>{match.opponent.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{match.opponent}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={match.result === "Win" ? "default" : "destructive"}
                    className={match.result === "Win" ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white'}
                  >
                    {match.result}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">◎ {match.wager.toFixed(2)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{match.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
