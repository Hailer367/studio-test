import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This page is under construction. Check back later for more settings and options.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* Placeholder for future settings */}
        </CardContent>
      </Card>
    </div>
  );
}
