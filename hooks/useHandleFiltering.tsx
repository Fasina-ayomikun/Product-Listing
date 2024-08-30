import { Data } from "@/utils/constants";
import { getProductsList } from "@/utils/functions";
import React, { useEffect, useState } from "react";

const useHandleFiltering = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100);
  const [filteredProducts, setFilteredProducts] = useState<Data[]>([]);

  const handleFiltering = () => {
    let products = getProductsList();
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
