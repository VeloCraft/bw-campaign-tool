'use client';
import React from 'react';
import StatusContext, { type StatusContextProps } from '@/contexts/Status';
import { useTimeoutWhen } from 'rooks';
import { Box, Callout } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';
import {
  ExclamationTriangleIcon as ErrorIcon,
  CheckIcon,
  InfoCircledIcon as InfoIcon,
} from '@radix-ui/react-icons';

const Messages = () => {
  const [message, setMessage] = React.useState<Status['message'] | null>(null);
  const [variant, setVariant] = React.useState<Status['variant'] | null>(null);
  const [duration, setDuration] = React.useState<Status['duration']>(3000);
  const [open, setOpen] = React.useState(false);
  const { status, onClearStatus } =
    React.useContext<StatusContextProps>(StatusContext);

  React.useEffect(() => {
    if (status) {
      setMessage(status.message);
      setVariant(status.variant);
      setDuration(status.duration || 3000);
      setOpen(true);
    }
  }, [status]);

  useTimeoutWhen(
    () => {
      setOpen(false);
    },
    duration || 3000,
    open,
  );

  useTimeoutWhen(
    () => {
      onClearStatus();
    },
    500,
    !open,
  );

  const {
    color,
    icon: Icon,
  }: { color: 'gray' | 'red' | 'green' | 'orange'; icon: React.ComponentType } =
    React.useMemo(() => {
      switch (variant) {
        case 'error':
          return { color: 'red', icon: ErrorIcon };
        case 'success':
          return { color: 'green', icon: CheckIcon };
        default:
          return { color: 'gray', icon: InfoIcon };
      }
    }, [variant]);

  return (
    <Toast.Provider duration={duration || 3000} swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} asChild>
        <Box position="fixed" bottom="0" right="0" p="4">
          <Toast.Description asChild>
            <Callout.Root size="3" color={color}>
              <Callout.Icon>
                <Icon />
              </Callout.Icon>
              <Callout.Text>{message}</Callout.Text>
            </Callout.Root>
          </Toast.Description>
        </Box>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default Messages;
