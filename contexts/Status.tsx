'use client';
import React from 'react';

export type StatusContextProps = {
  status: Status | null;
  onClearStatus: () => void;
  onAddMessage: (message: Status) => void;
};

const StatusContext = React.createContext<StatusContextProps>({
  status: null,
  onClearStatus: () => {},
  onAddMessage: () => {},
});

type ProviderProps = React.PropsWithChildren<{
  value?: Status;
}>;

export const Provider = ({ children, value }: ProviderProps) => {
  const [status, setStatus] = React.useState<Status | null>(value || null);

  const onClearStatus = React.useCallback(() => {
    setStatus(null);
  }, []);

  const onAddMessage = React.useCallback((message: Status) => {
    setStatus(message);
  }, []);

  return (
    <StatusContext.Provider value={{ status, onClearStatus, onAddMessage }}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusContext;
