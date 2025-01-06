import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import path from 'node:path';

// Load environment variables from .env file
dotenv.config();

// Access config values from process.env
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

// Configure Cloudinary with credentials from .env
cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function getTaggedMedia() {
  try {
    let mediaFiles = [];
    let nextCursor = null;

    do {
      const result = await cloudinary.v2.api.resources({
        type: 'upload',
        prefix: 'samples', // Optional: Add a prefix to filter by folder
        tag: 'test',
        max_results: 500, // Fetch up to 500 resources at a time
        next_cursor: nextCursor,
      });

      mediaFiles = mediaFiles.concat(result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    // Create the TypeScript file content
    const tsFileContent = `const mediaFiles = ${JSON.stringify(mediaFiles, null, 2)};\n\nexport default mediaFiles;`;

    // Write the content to 'media-files-image.ts'
    const projectDir = new URL('.', import.meta.url).pathname;
    await fs.writeFile(
      path.resolve(projectDir, 'media-images.ts'),
      tsFileContent,
    );

    console.log(
      'Successfully fetched and saved media files to media-images.ts',
    );
  } catch (error) {
    console.error('Error fetching media files:', error);
  }
}

getTaggedMedia();
