import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline">Privacy Policy</h1>
        <p className="text-muted-foreground">How we protect your data in the Citadel.</p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>We collect information you provide directly to us, such as when you create an account, and information that is automatically collected when you use the Service, such as your gameplay data.</p>
          <h3 className="font-bold text-foreground">How We Use Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions and to personalize your experience.</p>
          <h3 className="font-bold text-foreground">Sharing of Information</h3>
          <p>We do not share your personal information with third parties except as described in this Privacy Policy or with your consent.</p>
        </CardContent>
      </Card>
    </div>
  );
}
