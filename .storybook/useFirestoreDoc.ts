import { seed } from './faker';
import generate from './generator';

const results = {};

export const setResults = (key: string, value: any) => {
  results[key] = value;
};

const mockUseDoc = (docId: string | null) => {
  if (!docId) return { data: null, loading: false, ref: null };
  if (results[docId]) {
    return { data: results[docId], loading: false, ref: null };
  }
  const [collection, id] = docId.split('/');
  seed(docId);
  return {
    data: generate(collection, { docId: id }),
    loading: false,
    ref: null,
  };
};

export default mockUseDoc;
