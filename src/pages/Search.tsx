import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import ProfessionalCard, { type Professional } from "@/components/ProfessionalCard";

export default function SearchPage() {
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("id, name, profession, city, rating, verified")
        .order("rating", { ascending: false });
      if (error) throw error;
      return data as Professional[];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const p = profession.trim().toLowerCase();
    const c = city.trim().toLowerCase();
    return data.filter(
      (it) =>
        (!p || it.profession.toLowerCase().includes(p) || it.name.toLowerCase().includes(p)) &&
        (!c || it.city.toLowerCase().includes(c)),
    );
  }, [data, profession, city]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 md:pt-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Keresés</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Találd meg a megfelelő szakembert a környékeden.
        </p>
      </header>

      <div className="space-y-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Szakma (pl. villanyszerelő)"
            className="h-12 rounded-xl pl-10 text-base"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Város (pl. Budapest)"
            className="h-12 rounded-xl pl-10 text-base"
          />
        </div>
      </div>

      <section className="mt-6 space-y-3 pb-6">
        {isLoading ? (
          <p className="py-12 text-center text-sm text-muted-foreground">Betöltés…</p>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Nincs találat. Próbálj más keresést.
          </p>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {filtered.length} találat
            </p>
            {filtered.map((p) => (
              <ProfessionalCard key={p.id} p={p} />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
