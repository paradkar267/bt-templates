import React from 'react';
import { useCurrency } from '../../CurrencyContext';
import { Globe } from 'lucide-react';

export function CurrencySelector() {
  const { currency, changeCurrency } = useCurrency();

  return (
    <div className="relative flex items-center bg-gray-50 dark:bg-gray-900 border border-black/[0.03] dark:border-gray-800 rounded-full px-3 py-1.5 shadow-sm">
      <Globe className="w-4 h-4 text-gray-500 mr-2" />
      <select 
        value={currency} 
        onChange={(e) => changeCurrency(e.target.value)}
        className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 outline-none cursor-pointer appearance-none pr-4"
        style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0 center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
      >
        <option value="INR" className="bg-white text-black dark:bg-gray-900 dark:text-white">₹ INR</option>
        <option value="USD" className="bg-white text-black dark:bg-gray-900 dark:text-white">$ USD</option>
        <option value="GBP" className="bg-white text-black dark:bg-gray-900 dark:text-white">£ GBP</option>
      </select>
    </div>
  );
}
