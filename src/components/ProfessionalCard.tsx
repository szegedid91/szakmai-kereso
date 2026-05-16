import { Link } from "react-router-dom";
import { Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Professional {
  id: string;
  name: string;
  profession: string;
  city: string;
  rating: number;
  verified: boolean;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfessionalCard({ p }: { p: Professional }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
          {initials(p.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold text-foreground">{p.name}</h3>
            {p.verified && <BadgeCheck className="size-4 shrink-0 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground">{p.profession}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{p.city}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {p.rating.toFixed(1)}
        </div>
      </div>
      <Button asChild className="mt-4 w-full">
        <Link to={`/szakember/${p.id}`}>Profil megtekintése</Link>
      </Button>
    </article>
  );
}
