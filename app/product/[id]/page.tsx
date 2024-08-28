"use client";
import CreateProductModal from "@/app/components/CreateProductModal";
import { Data } from "@/app/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useRouter();
  const pathname = usePathname();
  const { id } = params;
  let rawProducts = localStorage.getItem("PRODUCT_LISTS");
  let products: Data[] = rawProducts ? JSON.parse(rawProducts) : [];

  const product = products.filter((product) => product.id === id);
  const handleDelete = () => {
    const tempProducts = products.filter((product) => product.id !== id);
    products.splice(0, products.length);

    products.push(...tempProducts);

    localStorage.setItem("PRODUCT_LISTS", JSON.stringify(products));

    navigate.push("/");
    alert("Product Deleted");
  };
  if (!id) {
    navigate.back();
  }
  return (
    <section className='relative'>
      <header className='flex items-center justify-between gap-4 px-6 container py-4 '>
        <Link href={"/"} className='text-pink-200'>
          Product Listing
        </Link>
        <p
          onClick={() => {
            navigate.push(`${pathname}?open=true`);
          }}
          className='cursor-pointer text-pink-200'
        >
          Create Product
        </p>
      </header>

      <section className='grid grid-cols-1 lg:grid-cols-2 items-start my-14 gap-9 container'>
        <div className='relative w-full h-full min-h-96 max-h-4xl'>
          <Image
            src={product[0].image}
            alt='product'
            fill
            objectFit='cover '
            objectPosition='center'
          />
        </div>
        <div>
          <h1 className='text-4xl uppercase font-semibold flex items-start justify-between text-pink-200 gap-4'>
            {product[0].name}
            <span className='text-xs cursor-pointer capitalize flex items-center font-normal gap-3'>
              <span
                className='text-green-500'
                onClick={() => {
                  navigate.push(`${pathname}/?open=true`);
                  setIsEditing(true);
                }}
              >
                Edit
              </span>
              <span className='text-red-500' onClick={handleDelete}>
                Delete
              </span>
            </span>
          </h1>
          <hr className='my-3' />
          <div className='px-3 flex items-center justify-between gap-4'>
            <p className='text-md text-purple-100 '>
              Price: ${product[0].price}
            </p>
            <p className='text-md text-purple-100 '>
              Category: {product[0].category}
            </p>
          </div>
          <hr className='my-3' />
          <p className='text-xs leading-6 text-pink-200'>{product[0].desc}</p>
        </div>
      </section>
      <CreateProductModal
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        id={id}
      />
    </section>
  );
};

export default SingleProduct;
