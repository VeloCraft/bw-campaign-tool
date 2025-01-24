import React from 'react';
import { Flex, IconButton } from '@radix-ui/themes';
import { Crosshair1Icon } from '@radix-ui/react-icons';

type TrackSwitchProps = {
  setPosition: (position?: GeolocationCoordinates) => void;
  tracking: boolean;
  setTracking: (tracking: boolean) => void;
  hasPosition: boolean;
};

const TrackSwitch = ({
  hasPosition,
  tracking,
  setTracking,
  setPosition,
}: TrackSwitchProps) => {
  const [enabled, setEnabled] = React.useState<false | number>(false);

  const onUpdate = React.useCallback(
    (position: GeolocationPosition) => {
      setPosition(position.coords);
    },
    [setPosition],
  );

  const onError = React.useCallback((error: GeolocationPositionError) => {
    console.error(error);
  }, []);

  const onToggle = () => {
    if (enabled && tracking) {
      navigator.geolocation.clearWatch(enabled);
      setEnabled(false);
      setTracking(false);
      setPosition(null);
    } else if (enabled && !tracking) {
      setTracking(true);
    } else {
      const watchId = navigator.geolocation.watchPosition(
        (pos: GeolocationPosition) => {
          onUpdate(pos);
        },
        onError,
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        },
      );
      setTracking(true);
      setEnabled(watchId);
    }
  };

  React.useEffect(
    () => () => {
      if (enabled) navigator.geolocation.clearWatch(enabled);
    },
    [enabled],
  );

  return (
    <Flex width="100%" direction="row" justify="end" mt="2">
      <IconButton
        data-testid="tracking-button"
        size="3"
        onClick={onToggle}
        variant="solid"
        color={enabled ? 'teal' : 'gray'}
        highContrast={enabled && tracking}
        loading={enabled && !hasPosition}
        style={{
          background: enabled && !hasPosition ? 'var(--gray-1)' : null,
          boxShadow: 'var(--shadow-3)',
        }}
      >
        <Crosshair1Icon style={{ width: 24, height: 24 }} />
      </IconButton>
    </Flex>
  );
};

export default TrackSwitch;
