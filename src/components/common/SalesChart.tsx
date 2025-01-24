import { SaleItem } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  items: SaleItem[];
};

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const lightGrey = '#999';

export default function SalesChart({ items }: Props) {
  if (!items || items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => new Date(a.weekEnding).getTime() - new Date(b.weekEnding).getTime());

  const allValues = sortedItems.flatMap((item) => [item.retailSales, item.wholesaleSales]);
  const minY = Math.min(...allValues);
  const maxY = Math.max(...allValues);
  const yAxisDomain = [minY * 0.25, maxY * 1.15];

  //this collapses all data into unique Jan - Dec
  const uniqueMonths = Array.from(
    new Set(
      sortedItems.map((item) => {
        const date = new Date(item.weekEnding);
        return `${date.getFullYear()}-${date.getMonth()}`;
      }),
    ),
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', padding: '10px', fontSize: '16px', color: '#333' }}>Retail Sales</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedItems} margin={{ top: 30, right: 30, left: 20, bottom: 10 }}>
          <XAxis
            dataKey="weekEnding"
            tickFormatter={(date: string) => months[new Date(date).getMonth()]}
            tick={{ fontSize: 12, fill: lightGrey, dy: 10 }}
            axisLine={{ stroke: lightGrey }}
            tickLine={false}
            ticks={uniqueMonths.map((month) => {
              const [year, monthIndex] = month.split('-');
              return (
                sortedItems.find((item) => {
                  const date = new Date(item.weekEnding);
                  return date.getFullYear().toString() === year && date.getMonth().toString() === monthIndex;
                })?.weekEnding || 0
              );
            })}
          />
          <YAxis
            domain={yAxisDomain}
            tick={{ fontSize: 12, fill: lightGrey }}
            axisLine={{ stroke: lightGrey }}
            tickLine={false}
            hide={true}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            labelFormatter={(date: string) => new Date(date).toLocaleDateString()}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }}
          />
          <Line
            type="natural"
            dataKey="retailSales"
            stroke="#00CED1"
            name="Retail Sales"
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6, fill: '#00CED1' }}
          />
          <Line
            type="natural"
            dataKey="wholesaleSales"
            stroke="#808080"
            name="Wholesale Sales"
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 6, fill: '#808080' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
