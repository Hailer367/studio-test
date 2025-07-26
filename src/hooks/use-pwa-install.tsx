"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}

type PwaInstallContextType = {
  canInstall: boolean;
  triggerInstall: () => void;
};

const PwaInstallContext = createContext<PwaInstallContextType | null>(null);

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  }, [deferredPrompt]);

  return (
    <PwaInstallContext.Provider value={{ canInstall: !!deferredPrompt, triggerInstall }}>
      {children}
    </PwaInstallContext.Provider>
  );
}

export const usePwaInstall = () => {
  const context = useContext(PwaInstallContext);
  if (!context) {
    throw new Error("usePwaInstall must be used within a PwaInstallProvider");
  }
  return context;
};
