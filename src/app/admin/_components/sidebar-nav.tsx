'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Coaches", href: "/admin/coaches" },
  { label: "Clientes", href: "/admin/clients" },
  { label: "Pagos", href: "/admin/payments" },
  { label: "Eventos", href: "/admin/events" },
  { label: "Planes", href: "/admin/plans" },
];

type SidebarNavProps = {
  userEmail?: string | null;
};

export function SidebarNav({ userEmail }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-border/60 bg-surface/80 p-4 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25" />
        <div className="leading-tight">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Terra Peak</p>
          <p className="text-lg font-semibold">RunnerCoach</p>
        </div>
      </div>
      <nav className="mt-4 space-y-1 text-sm">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:bg-base/60 hover:text-base-foreground"
              }`}
            >
              <span>{item.label}</span>
              {active ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-xl border border-border/70 bg-base/70 px-3 py-3 text-xs text-muted">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
          Sesión
        </p>
        <p className="mt-1 text-base-foreground">{userEmail ?? "usuario"}</p>
      </div>
    </aside>
  );
}

