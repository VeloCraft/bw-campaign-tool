import generate from './generator';
import { seed, arrayOf } from './faker';

const mockUseCollection = (_collection: string) => {
  if (!_collection) {
    return { data: [], loading: true, ref: null };
  }
  let collection = _collection;
  if (!generate(collection)) {
    // Remove trailing 's' if it exists
    collection = collection.replace(/s$/, '');
  }
  if (!generate(collection)) {
    throw new Error(`No generator found for collection: ${_collection}`);
  }
  seed(_collection);
  const data = arrayOf(() => generate(collection));
  return {
    data,
    loading: false,
    ref: null,
  };
};

export default mockUseCollection;
