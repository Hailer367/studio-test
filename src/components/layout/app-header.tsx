
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "../icons/logo";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { History, Swords, Wallet, PanelLeftOpen, PanelLeftClose, Settings, Trophy } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useSidePanel } from "@/hooks/use-side-panel";

const navItems = [
    { href: "/", label: "Game", icon: Swords },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/history", label: "History", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function AppHeader() {
    const pathname = usePathname();
    const { connected, connect, disconnect, publicKey } = useSimulatedWallet();
    const { isOpen, toggle } = useSidePanel();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl items-center">
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggle}
                    className="mr-2"
                    aria-label={isOpen ? "Close panel" : "Open panel"}
                >
                    {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                </Button>

                <Link href="/" className="mr-4 flex items-center space-x-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold inline-block font-headline text-lg">Citadel Coin</span>
                </Link>

                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="w-full whitespace-nowrap">
                         <nav className="flex items-center space-x-2 lg:space-x-4 py-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        pathname === item.href
                                            ? "bg-accent text-accent-foreground"
                                            : "hover:bg-accent/50",
                                        "justify-start shrink-0"
                                    )}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <ScrollBar orientation="horizontal" className="invisible" />
                    </ScrollArea>
                </div>


                <div className="flex flex-initial items-center justify-end space-x-4 pl-4">
                    {connected ? (
                        <>
                           <div className="hidden sm:flex items-center justify-center gap-2 rounded-md border bg-secondary px-3 py-1.5 text-sm">
                                <Wallet className="h-4 w-4 text-primary" />
                                <span className="font-mono text-xs" title={publicKey || ""}>{publicKey?.substring(0,4)}...{publicKey?.substring(publicKey.length - 4)}</span>
                            </div>
                            <Button variant="secondary" onClick={disconnect} size="sm">
                                Disconnect
                            </Button>
                        </>
                    ) : (
                        <Button onClick={connect} className="bg-primary/90 hover:bg-primary shadow-sm" size="sm">
                            Connect Wallet
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
