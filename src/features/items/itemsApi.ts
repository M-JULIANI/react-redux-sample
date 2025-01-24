import mockData from '../../data/mockData';
import { ProductItem } from '../../types';

export const fetchItems = (): Promise<ProductItem[] | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData as ProductItem[]);
    }, 1000);
  });
};
