import { exec } from 'node:child_process';
import fs from 'node:fs/promises';

const baseDir = new URL('.', import.meta.url).pathname;
// Check recursively through components directory for missing stories

async function getComponents(dir) {
  const componentsDir = `${baseDir}../components/${dir}`;
  const components = await fs.readdir(componentsDir);
  return components
    .filter((component) => {
      // Check if component starts with a capital letter
      return /^[A-Z]/.test(component);
    })
    .map((component) => {
      // Remove file extension
      return `${dir}/${component.replace(/\.[^/.]+$/, '')}`;
    });
}

async function isInStories(component) {
  const storyDocs = [
    `${baseDir}../stories/${component}.stories.ts`,
    `${baseDir}../stories/${component}.stories.tsx`,
  ];
  return await storyDocs.reduce(
    (promise, storyDoc) =>
      promise.then(async (result) => {
        if (result) return result;
        try {
          await fs.access(storyDoc);
          return true;
        } catch (error) {
          return false;
        }
      }),
    Promise.resolve(false),
  );
}

async function checkForMissingStories() {
  const componentsDir = `${baseDir}../components`;
  // Get a list of all directories in components directory
  const components = await fs.readdir(componentsDir);
  const allComponents = [].concat(
    ...(await Promise.all(
      components
        .filter((dir) => {
          return !dir.includes('.');
        })
        .map((dir) => {
          return getComponents(dir);
        }, []),
    )),
  );
  const missingStories = await allComponents.reduce(
    (promise, component) =>
      promise.then(async (arr) => {
        const inStories = await isInStories(component);
        if (!inStories) {
          arr.push(component);
        }
        return arr;
      }),
    Promise.resolve([]),
  );
  return missingStories;
}

checkForMissingStories().then(async (missingStories) => {
  await missingStories.reduce(
    (promise, component) =>
      promise.then(async () => {
        try {
          const { stderr } = exec(`npm run add-component ${component}`);
          if (stderr) {
            console.error(stderr);
          } else {
            console.log(`Created story for ${component}`);
          }
        } catch (error) {
          console.error(error);
        }
      }),
    Promise.resolve(),
  );
});
