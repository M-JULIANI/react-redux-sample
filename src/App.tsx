import { useEffect, useState } from 'react';
import { ProductItem } from './types';
import { fetchItems } from './features/items/itemsApi';
import Layout from './Layout';

function App() {
  const [item, setItem] = useState<ProductItem | null>(null);

  useEffect(() => {
    const getData = async () => {
      const items: ProductItem[] | null = await fetchItems();
      if (items) {
        setItem(items[0]);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Layout item={item} />
    </>
  );
}

export default App;
