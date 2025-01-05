import React from 'react';
import {
  CldImage,
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { Card, Flex, type BoxProps, Box, Text, Button } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import { UploadIcon } from '@radix-ui/react-icons';
import { useFormContext } from 'react-hook-form';
import MediaInfo from '@/components/Form/MediaInfo';

type MediaProps = BoxProps & {
  disabled?: boolean;
  resourceType?: 'image' | 'raw';
  tags?: string[];
  label: string;
  required?: boolean;
  defaultValue?: Media;
  name: string;
};

const Component = ({
  resourceType = 'image',
  label,
  name,
  required,
  disabled,
  defaultValue,
  tags,
  ...boxProps
}: MediaProps) => {
  const width = 72;
  const height = 72;
  const { register, getValues, setValue } = useFormContext();
  const [value, setValueState] = React.useState<Media | null>(
    getValues(name) || defaultValue,
  );
  const { onChange } = register(name, { required });

  const onUpload = async (res: CloudinaryUploadWidgetResults) => {
    const { info: media } = res;
    await addDoc(collection(db, 'media'), media as Media);
    await onChange({ target: { value: media as Media } });
    setValueState(media as Media);
  };

  const onRemove = async () => {
    setValue(name, null);
    setValueState(null);
  };

  return (
    <Box asChild {...boxProps}>
      <Form.Field name={name}>
        <Form.Label asChild>
          <Text as="p" size="2" mb="2" color="gray">
            {label}
          </Text>
        </Form.Label>
        <Form.Control required={required} asChild>
          <Flex align="center" gap="4">
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
              onSuccess={onUpload}
              options={{
                resourceType,
                multiple: false,
                sources: ['local', 'camera'],
                showAdvancedOptions: false,
                cropping: false,
                defaultSource: 'local',
                tags,
              }}
            >
              {({ open }) => (
                <Card
                  size="1"
                  onClick={
                    disabled
                      ? null
                      : (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          open();
                        }
                  }
                >
                  <Flex
                    width={`${width}px`}
                    height={`${height}px`}
                    align="center"
                    justify="center"
                  >
                    {value ? (
                      <CldImage
                        crop="fill"
                        width={width}
                        height={height}
                        src={value.public_id}
                        alt={value.original_filename}
                      />
                    ) : (
                      <UploadIcon width={`${width}px`} height={`${height}px`} />
                    )}
                  </Flex>
                </Card>
              )}
            </CldUploadWidget>
            <MediaInfo flexGrow="1" media={value} />
            {value && (
              <Button
                size="1"
                variant="ghost"
                color="red"
                disabled={disabled}
                onClick={onRemove}
                type="button"
                data-testid="remove-media-button"
              >
                Remove
              </Button>
            )}
          </Flex>
        </Form.Control>
      </Form.Field>
    </Box>
  );
};

export default Component;
