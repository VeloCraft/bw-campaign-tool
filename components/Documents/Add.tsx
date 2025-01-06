'use client';
import { CldUploadWidget } from 'next-cloudinary';
import { Button, type ButtonProps } from '@radix-ui/themes';

const Add = ({
  campaignId,
  ...props
}: ButtonProps & { campaignId: string }) => {
  return (
    <CldUploadWidget
      options={{ multiple: true, tags: [campaignId] }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string}
    >
      {({ open }) => (
        <Button
          data-testid="add-document-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
          }}
          {...props}
        />
      )}
    </CldUploadWidget>
  );
};

export default Add;
