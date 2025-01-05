import { oneOf } from './faker';
import image from './media-files-image';

const obj = { image };

export const reset = () =>
  Object.keys(obj).forEach((type) => {
    obj[type as keyof typeof obj].reset();
  });

const getItem = (type: string, asUrl: boolean): Media | string => {
  switch (type) {
    case 'image':
      return image.getItem(asUrl);
    default:
      return '';
  }
};

const generate = (opts: { [key: string]: any }) => {
  const {
    type: _type = 'image',
    quantity = 1,
    asUrl,
  }: {
    type?: 'image';
    quantity?: number;
    asUrl?: boolean;
  } = opts;
  const getType = () => {
    let type = _type;
    if (!type) type = oneOf(Object.keys(obj)) as 'image';
    return type;
  };
  if (!quantity || quantity === 1) return getItem(getType(), !!asUrl);
  return Array.from(Array(quantity)).map(() => getItem(getType(), !!asUrl));
};

export default generate;
