import { ItemCard } from './components/common/ItemCard';
import Nav from './components/common/Nav';
import { ProductItem } from './types';

type Props = {
  item: ProductItem | null;
};
export default function Layout({ item }: Props) {
  return (
    <>
      <Nav />
      <main className="mt-[100px] grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 min-h-[calc(100vh-80px)]">
        <div className="sm:col-span-1 max-h-full">
          <ItemCard item={item} />
        </div>
        <div className="sm:col-span-3 md:col-span-2 lg:col-span-3 flex flex-col gap-4">
          <div className="flex-[2_2_0%] bg-white p-4">{/* Chart section */}</div>
          <div className="flex-[1_1_0%] bg-white p-4">{/* Data grid section */}</div>
        </div>
      </main>
    </>
  );
}
