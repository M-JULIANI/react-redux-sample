import { ProductItem } from '../../types';
import { Tag } from '../common/Tag';
type Props = {
  item: ProductItem | null;
};
export const ItemCard: React.FC<Props> = ({ item }) => {
  if (!item) return null;
  return (
    <div className="bg-white shadow-md gap-2 w-full h-full flex flex-col">
      <div className="px-6 pt-6 flex flex-col gap-2 items-center">
        <img src={item.image} alt={item.title} className="w-full h-auto" />
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.subtitle}</p>
      </div>
      <div className="border-t border-b mb-10">
        <TagGrid>
          {item.tags?.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </TagGrid>
      </div>
    </div>
  );
};

export const TagGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full p-4 flex items-center justify-center">
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};
