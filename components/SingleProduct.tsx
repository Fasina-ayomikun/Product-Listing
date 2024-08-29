import { Data } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SingleProduct = ({ product }: { product: Data }) => {
  const navigate = useRouter();
  return (
    <div key={product.id} className='w-full h-full'>
      <div
        onClick={() => {
          navigate.push(`/product/${product.id}`);
        }}
        className='relative h-72 w-full'
      >
        <Image src={product.image} alt='product' objectFit='cover' fill />
      </div>
      <p className='text-pink-200 font-medium text-xl uppercase py-3 px-2 flex items-center justify-between'>
        {product.name} <span className=''>${product.price}</span>
      </p>
      <hr className='w-11/12 mx-auto' />
      <p className='text-xs font-thin text-pink-200 py-3 px-3'>
        Category: <span>{product.category}</span>
      </p>
    </div>
  );
};

export default SingleProduct;
