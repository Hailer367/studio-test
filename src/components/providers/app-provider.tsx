"use client";

import { ReactNode } from "react";
import { SolanaWalletProvider } from "@/hooks/use-simulated-wallet";
import { PwaInstallProvider } from "@/hooks/use-pwa-install";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidePanelProvider } from "@/hooks/use-side-panel";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SolanaWalletProvider>
        <PwaInstallProvider>
          <SidePanelProvider>
            {children}
          </SidePanelProvider>
        </PwaInstallProvider>
      </SolanaWalletProvider>
    </TooltipProvider>
  );
}
