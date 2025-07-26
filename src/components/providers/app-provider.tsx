"use client";

import { ReactNode } from "react";
import { SolanaWalletProvider } from "./solana-wallet-provider";
import { PwaInstallProvider } from "@/hooks/use-pwa-install";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidePanelProvider } from "@/hooks/use-side-panel";
import { Toaster } from "@/components/ui/toaster";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SolanaWalletProvider>
        <PwaInstallProvider>
          <SidePanelProvider>
            {children}
            <Toaster />
          </SidePanelProvider>
        </PwaInstallProvider>
      </SolanaWalletProvider>
    </TooltipProvider>
  );
}
