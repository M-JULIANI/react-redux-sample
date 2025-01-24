export type ProductItem = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  retailer: string;
  reviews: Review[];
  details: string[];
  sales: SaleItem[];
  tags?: string[];
};

type Review = {
  customer: string;
  review: string;
  score: number;
};

export type SaleItem = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};
