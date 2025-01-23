import React from 'react';
import { setResults as setCollectionResults } from '@/.storybook/useFirestoreCollection';
import { setResults as setDocResults } from '@/.storybook/useFirestoreDoc';

const withFirestoreResults = (results: { [key: string]: any }) => {
  Object.keys(results).forEach((key) => {
    if (key.includes('/')) {
      setDocResults(key, results[key]);
    } else {
      setCollectionResults(key, results[key]);
    }
  });
  const Component = (Story: React.ComponentType<any>) => <Story />;
  return Component;
};

export default withFirestoreResults;
