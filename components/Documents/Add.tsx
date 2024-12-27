'use client';
import { CldUploadButton } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({tags} : {tags : string[]}) => {

  console.log('tags', tags)
  return (
    <div>
      <CldUploadButton
        className="rt-reset rt-Button rt-BaseButton rt-variant-solid rt-r-size-1 rt-r-mt-2"
        options={{ multiple: true }}
        uploadPreset={cloudPresetName}
        options={{tags: tags}}
      >
        Add document
      </CldUploadButton>
    </div>
  );
};

export default CloudinaryUploader;
