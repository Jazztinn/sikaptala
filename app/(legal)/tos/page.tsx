import { Card } from "@/components/ui/card";

export default function TosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <Card className="space-y-4">
        <p className="text-sm text-muted-foreground">Legal placeholder</p>
        <h1 className="text-3xl font-semibold">Terms of Service</h1>
        <p className="text-muted-foreground">
          This route is intentionally ready for your existing TypeScript TOS
          template. Replace this placeholder content when you bring that file into
          the repo.
        </p>
      </Card>
    </main>
  );
}
