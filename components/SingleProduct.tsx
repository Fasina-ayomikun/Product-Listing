import { Data } from "@/utils/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const SingleProduct = ({ product }: { product: Data }) => {
  const navigate = useRouter();

  return (
    <div key={product.id} className='w-full h-full '>
      <div
        onClick={() => {
          navigate.push(`/product/${product.id}`);
        }}
        className='relative h-72 w-full'
      >
        <Image
          src={product.image}
          alt='product'
          objectFit='cover'
          fill
          priority
        />
      </div>
      <p className='text-pink-200 font-medium text-xl uppercase py-3 px-2 flex items-center justify-between'>
        {product.name} <span className=''>${product.price}</span>
      </p>
      <hr className='w-11/12 mx-auto' />
      <p className='text-xs font-thin text-pink-200 py-3 px-3 flex items-center justify-between gap-3'>
        Category: {product.category}
        <span
          className='text-green-500 underline font-medium cursor-pointer'
          onClick={() => {
            navigate.push(`/product/${product.id}`);
          }}
        >
          Read More
        </span>
      </p>
    </div>
  );
};

export default SingleProduct;
