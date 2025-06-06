'use client';
import { dummyProducts } from '@/lib/data/products';
import Image from 'next/image';
import { Button } from '@/Components/ui/button';

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = dummyProducts.find((p) => p.id === params.id);

  if (!product) {
    return <div className="p-6 text-white">Product not found.</div>;
  }

  return (
    <section className="p-6 max-w-5xl mx-auto text-white flex flex-col md:flex-row gap-20">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden bg-white/10 p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Info Section */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-300">{product.description}</p>
        <p className="text-2xl font-semibold mt-2">Rs. {product.price}/-</p>

        <Button className="mt-4 w-full md:w-auto bg-black text-white cursor-pointer">Add to Cart</Button>
      </div>
    </section>
  );
}
