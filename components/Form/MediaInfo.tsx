import {
  Flex,
  Badge,
  Box,
  Heading,
  Text,
  type FlexProps,
} from '@radix-ui/themes';

const MediaInfo = ({ media, ...flexProps }: FlexProps & { media?: Media }) => {
  if (!media) return null;
  return (
    <Flex {...flexProps}>
      <Box>
        <Heading as="h3" size="3">
          {media.original_filename || media.display_name}
        </Heading>
        <Flex gap="2" align="center" asChild>
          <Text size="2" color="gray">
            {media.resource_type === 'image' && (
              <>
                {media.width} x {media.height}
              </>
            )}
            <Badge variant="soft" size="1">
              {media.format.toUpperCase()}
            </Badge>
            {Math.round(media.bytes / 1024)} KB
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MediaInfo;
