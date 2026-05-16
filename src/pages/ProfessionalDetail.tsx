import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, MapPin, Phone, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function ProfessionalDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["professional", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <p className="p-8 text-center text-muted-foreground">Betöltés…</p>;
  }
  if (!data) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">A szakember nem található.</p>
        <Button asChild variant="link" className="mt-2">
          <Link to="/kereses">Vissza a kereséshez</Link>
        </Button>
      </div>
    );
  }

  const initials = data.name
    .split(" ")
    .map((p: string) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-10">
      <Link
        to="/kereses"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Vissza
      </Link>

      <div className="mt-6 flex flex-col items-center text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
          {initials}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          {data.verified && <BadgeCheck className="size-5 text-primary" />}
        </div>
        <p className="mt-1 text-base text-muted-foreground">{data.profession}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {Number(data.rating).toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" /> {data.city}
          </span>
        </div>
      </div>

      {data.bio && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Bemutatkozás</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
        </div>
      )}

      {data.phone && (
        <Button asChild className="mt-6 h-12 w-full text-base">
          <a href={`tel:${data.phone.replace(/\s/g, "")}`}>
            <Phone className="size-4" /> {data.phone}
          </a>
        </Button>
      )}
    </div>
  );
}
