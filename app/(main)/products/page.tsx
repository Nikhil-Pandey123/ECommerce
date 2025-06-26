'use client';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import AirflexBackground from '@/Components/AirflexBackground';
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
    <div className="relative min-h-screen w-full overflow-hidden">
      <AirflexBackground>
        {/* Main content with relative positioning */}
        <div className="relative z-10 min-h-screen pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            {/* Header - Updated with consistent styling */}
            <div className="mb-8 text-center">
              <div className="relative inline-block">
                <h1 className="animate-fade-in mb-6 bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-5xl font-bold tracking-wide text-transparent md:text-6xl">
                  Our Collections
                </h1>
                {/* Enhanced decorative underlines */}
                <div className="absolute -bottom-3 left-1/2 h-1.5 w-28 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/30"></div>
                <div className="absolute -bottom-6 left-1/2 h-0.5 w-16 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-300 to-cyan-300"></div>
              </div>
              <p className="mx-auto mt-8 max-w-3xl text-2xl leading-relaxed text-gray-600">
                Discover our{' '}
                <span className="font-semibold text-cyan-600">
                  premium products
                </span>{' '}
                designed for champions.
              </p>
            </div>

            {/* Filters Section - Updated with glass morphism */}
            <div className="mb-8 rounded-2xl border border-slate-700/20 bg-white/80 p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full border-slate-300/50 bg-white/90 text-gray-900 backdrop-blur-sm sm:w-64"
                  />

                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-full border-slate-300/50 bg-white/90 text-gray-900 backdrop-blur-sm sm:w-52">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-300/50 bg-white/95 backdrop-blur-sm">
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
                    <SelectTrigger className="w-full border-slate-300/50 bg-white/90 text-gray-900 backdrop-blur-sm sm:w-52">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-300/50 bg-white/95 backdrop-blur-sm">
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
                  className={
                    bestSellerOnly
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-cyan-700'
                      : 'border-slate-300/50 bg-white/90 backdrop-blur-sm hover:bg-white/95'
                  }
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
                      className="bg-blue-100/80 text-blue-800 backdrop-blur-sm"
                    >
                      Search: "{search}"
                    </Badge>
                  )}
                  {category !== 'all' && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100/80 text-green-800 backdrop-blur-sm"
                    >
                      Category: {category}
                    </Badge>
                  )}
                  {bestSellerOnly && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100/80 text-yellow-800 backdrop-blur-sm"
                    >
                      Best Sellers
                    </Badge>
                  )}
                  {sort !== 'default' && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100/80 text-purple-800 backdrop-blur-sm"
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
                  <div className="rounded-2xl border border-slate-700/20 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-sm">
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
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-700"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AirflexBackground>
    </div>
  );
}
