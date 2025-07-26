import { MatchHistory } from "@/components/citadel/match-history";
import { Separator } from "@/components/ui/separator";

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline">Battle Records</h1>
        <p className="text-muted-foreground">The chronicles of your duels within the Citadel.</p>
      </div>
      <Separator />
      <MatchHistory />
    </div>
  );
}
