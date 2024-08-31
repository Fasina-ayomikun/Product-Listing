"use client";
import CreateProductModal from "@/components/CreateProductModal";
import Header from "@/components/Header";
import useGetProductsList from "@/hooks/useGetProductsList";
import { Data } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";

const SingleProductDisplay = ({ params }: { params: { id: string } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Data[]>([]);
  const navigate = useRouter();
  const pathname = usePathname();
  const { id } = params;
  const { products, updateProductsList } = useGetProductsList();
  console.log(products, "oo");
  const handleDelete = (id: string) => {
    const tempProducts = products.filter((product: Data) => product.id !== id);
    products.splice(0, products.length);

    products.push(...tempProducts);

    updateProductsList(products);

    alert("Product Deleted");
  };

  useEffect(() => {
    const singleProduct = products.filter((product) => product.id === id);

    setProduct(singleProduct);
  }, [products]);

  if (!id) {
    navigate.back();
  }
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className='relative'>
        <Header setOpen={setOpen} />
        <div className='container'>
          <Link href={"/"} className='text-pink-200 container px-6'>
            Go Back
          </Link>
        </div>
        <section className='grid grid-cols-1 lg:grid-cols-2 items-start my-14 gap-9 container px-4'>
          <div className='relative w-full h-full min-h-96 max-h-4xl'>
            <Image
              src={product[0]?.image}
              alt='product'
              fill
              objectFit='cover '
              objectPosition='center'
            />
          </div>
          <div>
            <h1 className='text-4xl uppercase font-semibold flex  items-start justify-between flex-wrap-reverse text-pink-200 gap-4'>
              {product[0]?.name}
              <span className='text-xs cursor-pointer capitalize flex items-center font-normal gap-3 justify-end  w-full'>
                <span
                  className='text-green-500'
                  onClick={() => {
                    setOpen(true);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </span>
                <span
                  className='text-red-500'
                  onClick={() => {
                    handleDelete(id);

                    navigate.push("/");
                  }}
                >
                  Delete
                </span>
              </span>
            </h1>
            <hr className='my-3' />
            <div className='px-3 flex items-center justify-between gap-4'>
              <p className='text-md text-purple-100 '>
                Price: ${product[0]?.price}
              </p>
              <p className='text-md text-purple-100 '>
                Category: {product[0]?.category}
              </p>
            </div>
            <hr className='my-3' />
            <p className='text-xs leading-6 text-pink-200'>
              {product[0]?.desc}
            </p>
          </div>
        </section>
        {open && (
          <CreateProductModal
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            id={id}
            setOpen={setOpen}
            product={product[0]}
          />
        )}
      </section>
    </Suspense>
  );
};

export default SingleProductDisplay;
