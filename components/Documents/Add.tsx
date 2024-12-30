'use client';
import { CldUploadButton } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({tags} : {tags : string[]}) => {

  return (
    <div>
      <CldUploadButton
        className="rt-reset rt-Button rt-BaseButton rt-variant-solid rt-r-size-1 rt-r-mt-2"
        options={{ multiple: true , tags: tags}}
        uploadPreset={cloudPresetName}
      >
        Add document
      </CldUploadButton>
    </div>
  );
};

export default CloudinaryUploader;
