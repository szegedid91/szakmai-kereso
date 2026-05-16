import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Search, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/kereses", label: "Keresés", icon: Search },
  { to: "/mentett", label: "Mentett", icon: Bookmark },
  { to: "/profil", label: "Profil", icon: User },
];

export default function Layout() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/szakember/");

  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-card">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-primary">Szakify</h1>
          <p className="mt-1 text-xs text-muted-foreground">Szakemberek egy helyen</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
          <div className="grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )
                }
              >
                <Icon className="size-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
