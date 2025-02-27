import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { useGetEventsQuery } from '../generated/graphql';

export interface EventData {
  id: number;
  name: string;
}

interface EventContextType {
  currentEvent: EventData | null;
  setCurrentEvent: (event: EventData) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  // Initially, no event is selected.
  const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);

  // Use the generated hook to load events from the backend.
  const { data, loading, error } = useGetEventsQuery();

  // When events are loaded and there's no current event yet, set the first event.
  useEffect(() => {
    if (!loading && data && data.events && data.events.length > 0 && !currentEvent) {
      setCurrentEvent(data.events[0]);
    }
  }, [loading, data, currentEvent]);

  return <EventContext.Provider value={{ currentEvent, setCurrentEvent }}>{children}</EventContext.Provider>;
};

export const useEvent = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
