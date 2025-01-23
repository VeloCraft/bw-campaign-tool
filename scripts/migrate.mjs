import { Command } from 'commander';
import dotenv from 'dotenv';
import { promises as fs } from 'node:fs';
import chalk from 'chalk';

import { getApps, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const loadDocs = async (collection, db) => {
  const data = await db.collection(collection).get();
  console.log(
    chalk.green(`${data.docs.length} docs loaded from ${collection}`),
  );
  return {
    collection,
    docs: data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })),
  };
};

const loadCollections = async (collectionList, db) => {
  const collections =
    collectionList?.map((col) => ({ id: col })) || (await db.listCollections());
  return Promise.all(
    collections.map((collection) => loadDocs(collection.id, db)),
  );
};

const loadData = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const saveData = async (data, filePath) => {
  // Save data to a file as json
  const str = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, str);
};

const saveDocs = async (collection, docs, replace, db) => {
  const batch = db.batch();
  if (replace) {
    const data = await db.collection(collection).get();
    data.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
  }
  docs.forEach((doc) => {
    const ref = db.collection(collection).doc(doc.id);
    const { id, ...data } = doc;
    batch.set(ref, data);
  });
  return batch.commit().then(() => {
    console.log(chalk.green(`${docs.length} docs saved to ${collection}`));
  });
};

const saveCollections = async (data, replace, db) => {
  return Promise.all(
    data.map((collection) =>
      saveDocs(collection.collection, collection.docs, replace, db),
    ),
  );
};

const getDb = (production) => {
  dotenv.config({ path: production ? ['.env'] : ['.env.local', '.env'] });
  const apps = getApps();
  if (!apps.length) {
    initializeApp({
      credential: cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
    });
  }
  const db = getFirestore();
  return db;
};

const exportCollections = async (
  filename = 'data.json',
  { collections, production },
) => {
  const db = getDb(production);
  await loadCollections(collections, db).then(async (data) => {
    const filePath = new URL(filename, import.meta.url).pathname;
    await saveData(data, filePath);
  });
};

const importCollections = async (
  filename = 'data.json',
  { replace, production },
) => {
  const filePath = new URL(filename, import.meta.url).pathname;
  const data = await loadData(filePath);
  const db = getDb(production);
  await saveCollections(data, replace, db);
};

const program = new Command();

program
  .name('pnpm run migrate')
  .usage('export <filename> [options]')
  .command('export')
  .summary('Export data from Firestore')
  .argument('<filename>', 'Filename to save or load data')
  .option('-c, --collections <collections...>', 'Collections to export')
  .option('--production', 'Export data from live site')
  .action(exportCollections);

program
  .name('pnpm run migrate')
  .usage('import <filename> [options]')
  .command('import')
  .summary('Import data to Firestore')
  .argument('<filename>', 'Filename to save or load data')
  .option('-r, --replace', 'Replace existing data')
  .option('--production', 'Import data to live site')
  .action(importCollections);

program.parse(process.argv);
