
"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from "react";

type SidePanelContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
};

const SidePanelContext = createContext<SidePanelContextType | null>(null);

export function SidePanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const value = useMemo(() => ({
    isOpen,
    setIsOpen,
    toggle,
  }), [isOpen, toggle]);

  return (
    <SidePanelContext.Provider value={value}>
      {children}
    </SidePanelContext.Provider>
  );
}

export const useSidePanel = () => {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error("useSidePanel must be used within a SidePanelProvider");
  }
  return context;
};
