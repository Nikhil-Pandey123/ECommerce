'use client';
import { dummyProducts } from '@/lib/data/products';
import Image from 'next/image';
import { Button } from '@/Components/ui/button';
import { useCartStore } from '@/lib/store/cartStore';
import Link from 'next/link';
interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const { addToCart } = useCartStore();
  const product = dummyProducts.find(p => p.id === params.id);

  if (!product) {
    return <div className="p-6 text-white">Product not found.</div>;
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-20 p-6 text-white md:flex-row">
      {/* Image Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-white/10 p-4 md:w-1/2">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Info Section */}
      <div className="space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-300">{product.description}</p>
        <p className="mt-2 text-2xl font-semibold">Rs. {product.price}/-</p>

        <Button
          onClick={() => addToCart(product)}
          className="mt-4 w-full cursor-pointer bg-black text-white md:w-auto"
        >
          Add to Cart
        </Button>
      </div>
    </section>
  );
}
