"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SavedEventsContextValue = {
  savedEventIds: string[];
  isEventSaved: (eventId: string) => boolean;
  toggleSavedEvent: (eventId: string) => void;
};

const SavedEventsContext = createContext<SavedEventsContextValue | null>(null);

export function SavedEventsProvider({ children }: { children: ReactNode }) {
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);

  function toggleSavedEvent(eventId: string) {
    setSavedEventIds((currentIds) =>
      currentIds.includes(eventId)
        ? currentIds.filter((id) => id !== eventId)
        : [...currentIds, eventId],
    );
  }

  function isEventSaved(eventId: string) {
    return savedEventIds.includes(eventId);
  }

  return (
    <SavedEventsContext.Provider
      value={{ savedEventIds, isEventSaved, toggleSavedEvent }}
    >
      {children}
    </SavedEventsContext.Provider>
  );
}

export function useSavedEvents() {
  const context = useContext(SavedEventsContext);

  if (!context) {
    throw new Error("useSavedEvents must be used inside a SavedEventsProvider.");
  }

  return context;
}
