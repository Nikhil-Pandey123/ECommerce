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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Our Collections
          </h1>
          <p className="text-gray-600">Discover our premium products</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white text-gray-900 sm:w-64"
              />

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full bg-white text-gray-900 sm:w-52">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="priceLowHigh">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="priceHighLow">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="az">A → Z</SelectItem>
                  <SelectItem value="za">Z → A</SelectItem>
                </SelectContent>
              </Select>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full bg-white text-gray-900 sm:w-52">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="gear">Gear</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant={bestSellerOnly ? 'default' : 'outline'}
              onClick={() => setBestSellerOnly(!bestSellerOnly)}
              className={bestSellerOnly ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              {bestSellerOnly ? '✓ Best Sellers Only' : 'Show Best Sellers'}
            </Button>
          </div>

          {/* Active filters display */}
          {(search ||
            category !== 'all' ||
            bestSellerOnly ||
            sort !== 'default') && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {search && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Search: "{search}"
                </Badge>
              )}
              {category !== 'all' && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Category: {category}
                </Badge>
              )}
              {bestSellerOnly && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800"
                >
                  Best Sellers
                </Badge>
              )}
              {sort !== 'default' && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  Sorted: {sort}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filtered.length} of {dummyProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.length > 0 ? (
            filtered.map(product => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group transition-transform hover:scale-105"
              >
                <ProductCard {...product} />
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="mb-4 text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearch('');
                    setCategory('all');
                    setBestSellerOnly(false);
                    setSort('default');
                  }}
                  variant="outline"
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
