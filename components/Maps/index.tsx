import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import { Box } from '@radix-ui/themes';

type ComponentProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const Component = ({
  header,
  footer,
  children,
}: React.PropsWithChildren<ComponentProps>) => {
  return (
    <>
      {header}
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Box flexGrow="1">
          <GoogleMap
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
            defaultZoom={13}
            defaultCenter={{ lat: 52.192204, lng: -2.2254206 }}
            style={{ height: '100%' }}
            fullscreenControl={false}
            mapTypeControl={false}
            streetViewControl={false}
            clickableIcons={false}
          >
            {children}
          </GoogleMap>
        </Box>
      </APIProvider>
      {footer}
    </>
  );
};

export default Component;
