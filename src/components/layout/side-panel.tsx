
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidePanel } from "@/hooks/use-side-panel";
import { buttonVariants } from "../ui/button";
import { History, Settings, Swords, FileText, Shield, Trophy } from "lucide-react";

const navItems = [
    { href: "/", label: "Game", icon: Swords },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/history", label: "History", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/terms", label: "Terms", icon: FileText },
    { href: "/privacy", label: "Privacy", icon: Shield },
];

export function SidePanel() {
  const { isOpen } = useSidePanel();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-full overflow-hidden border-r border-border/40 transition-all duration-300 ease-in-out",
        "flex flex-col",
        isOpen ? "w-72 p-4" : "w-0 p-0"
      )}
    >
        <div className={cn("flex-grow", !isOpen && "hidden")}>
             <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "default" }),
                            pathname === item.href
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent/50",
                            "justify-start"
                        )}
                    >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    </aside>
  );
}
