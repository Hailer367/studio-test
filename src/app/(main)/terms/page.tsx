import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline">Terms of Service</h1>
        <p className="text-muted-foreground">The rules of the Citadel.</p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Agreement to Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>By using Citadel Coin (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.</p>
          <h3 className="font-bold text-foreground">Wagers and Outcomes</h3>
          <p>All wagers are final. The outcome of each coin flip is determined by a verifiable random process. We are not responsible for any losses incurred while using the Service. Gamble responsibly.</p>
          <h3 className="font-bold text-foreground">User Conduct</h3>
          <p>You agree not to use the Service for any unlawful purpose or to engage in any conduct that could damage, disable, or impair the Service.</p>
        </CardContent>
      </Card>
    </div>
  );
}
