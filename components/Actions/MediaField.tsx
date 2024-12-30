
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Flex, Button, Text } from '@radix-ui/themes';
import {
  CloudinaryUploadWidgetOptions,
  CloudinaryUploadWidgetResults,
CloudinaryUploadWidgetInfo,
} from '@cloudinary-util/types';

const MediaField = ({
  setResource,
  resource,
  options,
}: {
  setResource: (value: CloudinaryUploadWidgetInfo | null) => void;
  resource?: CloudinaryUploadWidgetInfo | null;
  options?: CloudinaryUploadWidgetOptions; 
}) => {
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setResource(null); // Clear the resource field
  };


const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
  if (typeof result.info === "object") {
    setResource(result.info); // Handle valid object
  } else {
    console.error("Unexpected result.info type:", result.info); // Handle unexpected string type
  }
};


  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={handleUploadSuccess}
      options={options}
    >
      {({ open }) => (
        <>
                <Text as="p" size="2" color="gray" mb="2">
                  Upload media
                </Text>

  


          <Flex align="center" justify="start" direction="row">
            {resource ? (
              <>
                {/* Display resource value */}
                <Text>{resource.display_name}</Text>

                {/* Clear button */}
                <Button
                  variant="ghost"
                  onClick={handleClear}
                  style={{ margin: '8px' }}
                >
                  Clear
                </Button>
              </>
            ) : (
              <>
                {/* Upload button */}
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    open(); // Open the upload widget
                  }}
                >
                  Upload
                </Button>
              </>
            )}
          </Flex>

        </>
      )}
    </CldUploadWidget>
  );
};

export default MediaField;
