import { seed } from './faker';
import generate from './generator';

const mockUseDoc = (docId: string | null) => {
  if (!docId) return { data: null, loading: false, ref: null };
  const [collection, id] = docId.split('/');
  seed(docId);
  return {
    data: generate(collection, { docId: id }),
    loading: false,
    ref: null,
  };
};

export default mockUseDoc;
