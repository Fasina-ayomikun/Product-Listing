import { Data } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import useGetProductsList from "./useGetProductsList";

const useHandleFiltering = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100);
  const [filteredProducts, setFilteredProducts] = useState<Data[]>([]);
  const { products } = useGetProductsList();
  const handleFiltering = () => {
    console.log(products, filteredProducts);

    let tempProducts = [...products];
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (price > 0) {
      tempProducts = tempProducts.filter((product) => product.price >= price);
    }
    setFilteredProducts(tempProducts);
  };
  return {
    handleFiltering,
    filteredProducts,
    setCategory,
    setPrice,
    category,
    price,
    setFilteredProducts,
  };
};

export default useHandleFiltering;
