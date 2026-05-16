import { User, Bell, Shield, HelpCircle } from "lucide-react";

const items = [
  { icon: Bell, label: "Értesítések" },
  { icon: Shield, label: "Adatvédelem" },
  { icon: HelpCircle, label: "Súgó" },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 md:pt-10">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Profil</h1>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="size-6" />
        </div>
        <div>
          <p className="font-semibold">Vendég</p>
          <p className="text-sm text-muted-foreground">Jelentkezz be a teljes funkcionalitásért</p>
        </div>
      </div>

      <ul className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {items.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={`flex items-center gap-3 px-5 py-4 ${
              i !== items.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <Icon className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium">{label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-xs text-muted-foreground">Szakify · v0.1.0</p>
    </div>
  );
}
