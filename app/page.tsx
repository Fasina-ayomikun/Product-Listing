"use client";
import CreateProductModal from "../components/CreateProductModal";
import { defaultProducts } from "../utils/constants";
import { Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "@/components/Hero";
import Filters from "@/components/Filters";
import SingleProduct from "@/components/SingleProduct";
import useHandleFiltering from "@/hooks/useHandleFiltering";
import useGetProductsList from "@/hooks/useGetProductsList";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const {
    handleFiltering,
    filteredProducts,
    setCategory,
    setPrice,
    category,
    price,
    setFilteredProducts,
  } = useHandleFiltering();

  const { products, updateProductsList, setProducts } = useGetProductsList();
  useEffect(() => {
    handleFiltering();
  }, [category, price]);
  useEffect(() => {
    if (window !== undefined) {
      const alreadySet = localStorage.getItem("PRODUCT_LISTS");

      if (alreadySet) {
        let products = JSON.parse(alreadySet);
        setFilteredProducts(products);
        setProducts(products);
        setUpdate(false);
      } else {
        localStorage.setItem("PRODUCT_LISTS", JSON.stringify(defaultProducts));
        setUpdate(true);
      }
    }
  }, [update]);
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <section className='relative'>
        <Header setOpen={setOpen} />
        <Hero />
        <section className='mt-7 container'>
          <h1 className='text-2xl font-semibold my-4 capitalize underline  text-center text-purple-200'>
            Our Products
          </h1>
          <Filters setCategory={setCategory} setPrice={setPrice} />
        </section>
        <section className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 items-center gap-8 container px-10 py-4'>
          {filteredProducts.length < 1 ? (
            <p className='text-pink-200'>
              No product available, create new products
            </p>
          ) : (
            filteredProducts.map((product) => {
              return <SingleProduct key={product.id} product={product} />;
            })
          )}
        </section>
        {open && (
          <CreateProductModal
            isEditing={false}
            id={""}
            setIsEditing={() => {}}
            setOpen={setOpen}
          />
        )}{" "}
      </section>
    </Suspense>
  );
}
