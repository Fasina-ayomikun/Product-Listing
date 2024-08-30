"use client";
import CreateProductModal from "../components/CreateProductModal";
import { defaultProducts } from "../utils/constants";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "@/components/Hero";
import Filters from "@/components/Filters";
import SingleProduct from "@/components/SingleProduct";
import useHandleFiltering from "@/hooks/useHandleFiltering";
import { getProductsList } from "@/utils/functions";

export default function Home() {
  const {
    handleFiltering,
    filteredProducts,
    setCategory,
    setPrice,
    category,
    price,
    setFilteredProducts,
  } = useHandleFiltering();
  useEffect(() => {
    handleFiltering();
  }, [category, price]);
  useEffect(() => {
    if (window !== undefined) {
      const alreadySet = localStorage.getItem("PRODUCT_LISTS");
      if (alreadySet) {
        const products = getProductsList();
        setFilteredProducts(products);
        return;
      } else {
        localStorage.setItem("PRODUCT_LISTS", JSON.stringify(defaultProducts));
      }
    }
  }, []);
  return (
    <section className='relative'>
      <Header />
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
      <CreateProductModal isEditing={false} id={""} setIsEditing={() => {}} />
    </section>
  );
}
