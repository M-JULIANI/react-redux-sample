import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './hooks/useAppDispatch';
import { getItems } from './features/items/itemsSlice';
import { RootState } from './store/store';
import Layout from './Layout';

function App() {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.items);
  const currentItem = items[0] || null;

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout item={currentItem} />
    </>
  );
}

export default App;
