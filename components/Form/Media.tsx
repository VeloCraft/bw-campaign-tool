import React from 'react';
import {
  CldImage,
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { Card, Flex } from '@radix-ui/themes';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/helpers/firebase';
import { UploadIcon } from '@radix-ui/react-icons';

type MediaProps = {
  value?: Media;
  disabled?: boolean;
  onChange: (media: Media) => Promise<void>;
  width: number;
  height: number;
  resourceType?: 'image' | 'video';
};

const Component = ({
  resourceType = 'image',
  value,
  disabled,
  onChange,
  width,
  height,
}: MediaProps) => {
  const onUpload = async (res: CloudinaryUploadWidgetResults) => {
    const { info: media } = res;
    await addDoc(collection(db, 'media'), media as Media);
    await onChange(media as Media);
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={onUpload}
      options={{
        resourceType,
        multiple: false,
        sources: ['local', 'camera'],
        showAdvancedOptions: false,
        cropping: false,
        defaultSource: 'local',
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
              <UploadIcon width="48px" height="48px" />
            )}
          </Flex>
        </Card>
      )}
    </CldUploadWidget>
  );
};

export default Component;
