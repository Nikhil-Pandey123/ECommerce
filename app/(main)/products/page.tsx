'use client';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import ProductCard from '@/Components/ProductListing';
import { useState } from 'react';
import { dummyProducts } from '@/lib/data/products';
import Link from 'next/link';
export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');
  const [bestSellerOnly, setBestSellerOnly] = useState(false);

  let filtered = dummyProducts
    .filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product =>
      category === 'all' ? true : product.category === category
    )
    .filter(product => (bestSellerOnly ? product.bestSeller : true));

  if (sort === 'priceLowHigh') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'priceHighLow') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'za') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <section className="bg-primary space-y-6 p-6 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-64"
        />

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
            <SelectItem value="az">A → Z</SelectItem>
            <SelectItem value="za">Z → A</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="shoes">Shoes</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="gear">Gear</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={bestSellerOnly ? 'destructive' : 'secondary'}
          onClick={() => setBestSellerOnly(!bestSellerOnly)}
        >
          {bestSellerOnly ? 'Showing Best Sellers' : 'Filter Best Sellers'}
        </Button>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map(product => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))
        ) : (
          <Badge variant="secondary" className="col-span-full">
            No products found
          </Badge>
        )}
      </div>
    </section>
  );
}
