import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import InfoWindow from '@/components/Maps/InfoWindow';

type ComponentProps = {
  position: { lat: number; lng: number };
  info?: React.ReactNode;
  title?: string;
  header?: React.ReactNode;
  offset?: [number, number];
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
};

const Component = ({
  title,
  position,
  header,
  info,
  offset = [0, -48],
  children,
  onOpen: _onOpen,
  onClose: _onClose,
  open: _open,
}: React.PropsWithChildren<ComponentProps>) => {
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
    _onOpen?.();
  };
  const onClose = () => {
    setOpen(false);
    _onClose?.();
  };

  React.useEffect(() => {
    if (_open === false && open) setOpen(false);
  }, [_open, open]);

  return (
    <>
      <AdvancedMarker title={title} position={position} onClick={onOpen}>
        {children}
      </AdvancedMarker>
      {!!info && open && (
        <InfoWindow
          position={position}
          onCloseClick={onClose}
          pixelOffset={offset}
          headerContent={header}
        >
          {info}
        </InfoWindow>
      )}
    </>
  );
};

export default Component;
