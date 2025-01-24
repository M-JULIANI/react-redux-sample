import { ItemCard } from './components/common/ItemCard';
import Nav from './components/common/Nav';
import SalesChart from './components/common/SalesChart';
import SalesTable from './components/common/SalesTable';
import { ProductItem } from './types';

type Props = {
  item: ProductItem | null;
};
export default function Layout({ item }: Props) {
  return (
    <div>
      <Nav />
      <main className="mt-[100px] grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 p-4">
        <div className="sm:col-span-1 max-h-[800px] overflow-auto">
          <ItemCard item={item} />
        </div>
        <div className="sm:col-span-3 md:col-span-4 lg:col-span-4 flex flex-col gap-4 max-h-[800px]">
          <div className="flex-1 bg-white p-4 h-1/2 overflow-auto">
            <SalesChart items={item?.sales || []} />
          </div>
          <div className="flex-none bg-white p-4 h-1/2 overflow-auto">
            <SalesTable items={item?.sales || []} />
          </div>
        </div>
      </main>
    </div>
  );
}
