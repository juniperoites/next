"use client";

import React, { useState, createContext, useContext } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { EmergencyCallbackBanner } from "./EmergencyCallbackBanner";
import { EventDebuggerDrawer } from "./EventDebuggerDrawer";
import { CostCalculatorModal } from "./CostCalculatorModal";

interface ModalContextType {
  openQuoteModal: (serviceSlug?: string) => void;
  closeQuoteModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | undefined>();

  const openQuoteModal = (serviceSlug?: string) => {
    setSelectedServiceSlug(serviceSlug);
    setIsModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
    setSelectedServiceSlug(undefined);
  };

  return (
    <ModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      <div className="min-h-screen flex flex-col bg-background text-slate-100">
        <Navbar onOpenQuoteModal={openQuoteModal} />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Global Floating Interactive Features */}
        <EmergencyCallbackBanner onOpenQuoteModal={() => openQuoteModal()} />
        <EventDebuggerDrawer />
        <CostCalculatorModal
          isOpen={isModalOpen}
          onClose={closeQuoteModal}
          initialServiceSlug={selectedServiceSlug}
        />
      </div>
    </ModalContext.Provider>
  );
};
