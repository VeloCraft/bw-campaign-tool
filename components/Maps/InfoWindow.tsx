import React from 'react';
import { InfoWindow, type InfoWindowProps } from '@vis.gl/react-google-maps';
import { Theme } from '@radix-ui/themes';

const Component = ({
  children,
  headerContent,
  ...props
}: React.PropsWithChildren<InfoWindowProps>) => {
  return (
    <InfoWindow
      {...props}
      headerContent={
        headerContent ? <Theme appearance="light">{headerContent}</Theme> : null
      }
    >
      <Theme appearance="light">{children}</Theme>
    </InfoWindow>
  );
};

export default Component;
