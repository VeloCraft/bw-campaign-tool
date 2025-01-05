'use client';
import { CldUploadButton } from 'next-cloudinary';
import { Button, type ButtonProps } from '@radix-ui/themes';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({
  campaignId,
  ...props
}: ButtonProps & { campaignId: string }) => {
  return (
    <CldUploadButton
      options={{ multiple: true, tags: [campaignId] }}
      uploadPreset={cloudPresetName}
    >
      {({ open }) => (
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
          }}
          {...props}
        >
          Add document
        </Button>
      )}
    </CldUploadButton>
  );
};

export default CloudinaryUploader;
