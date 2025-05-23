import React from 'react';
import ProductListing from './ProductListing';
const TopSellingSection = () => {
  return (
    <section className="mt-15 flex flex-col items-center justify-center gap-2 p-6">
      <h1 className="mb-5 items-center text-3xl font-bold text-white">
        Our Top Selling
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <ProductListing
          image="/Airflex photo/1.png"
          title="Product 1"
          price={1000}
          description="This is a great product."
          bestSeller={true}
        />
        <ProductListing
          image="/Airflex photo/2.png"
          title="Product 2"
          price={2000}
          description="This is another great product."
          bestSeller={true}
        />
        <ProductListing
          image="/Airflex photo/3.png"
          title="Product 3"
          price={3000}
          description="This is yet another great product."
          bestSeller={false}
        />
        <ProductListing
          image="/Airflex photo/4.png"
          title="Product 4"
          price={4000}
          description="This is a fantastic product."
          bestSeller={false}
        />
        <ProductListing
          image="/Airflex photo/5.png"
          title="Product 5"
          price={4000}
          description="This is a fantastic product."
          bestSeller={false}
        />
        <ProductListing
          image="/Airflex photo/6.png"
          title="Product 6"
          price={4000}
          description="This is a fantastic product."
          bestSeller={false}
        />
      </div>
    </section>
  );
};

export default TopSellingSection;
