import React from 'react';
import StatusContext from '@/contexts/Status';

const useStatusMessage = () => {
  const { onAddMessage } = React.useContext(StatusContext);
  return onAddMessage;
};

export default useStatusMessage;
