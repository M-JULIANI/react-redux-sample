import { FC } from 'react';

export const Tag: FC<{ tag: string }> = ({ tag }) => {
  return (
    <span
      key={tag}
      className="inline-flex items-center justify-center rounded-sm text-xs text-[#747474] bg-white border border-gray-300 whitespace-nowrap overflow-hidden"
    >
      {tag}
    </span>
  );
};
