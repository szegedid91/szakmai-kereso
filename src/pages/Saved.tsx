import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 md:pt-10">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Mentett</h1>
      <div className="mt-16 flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Bookmark className="size-7 text-primary" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Még nincsenek mentett szakemberek</h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Mentsd el kedvenc szakembereidet, hogy később könnyen visszataláld őket.
        </p>
      </div>
    </div>
  );
}
