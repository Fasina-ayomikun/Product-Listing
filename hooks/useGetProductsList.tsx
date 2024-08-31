import { Data } from "@/utils/constants";
import React, { useEffect, useState } from "react";

const useGetProductsList = () => {
  const [products, setProducts] = useState<Data[]>([]);
  useEffect(() => {
    if (window !== undefined) {
      let rawProducts = localStorage.getItem("PRODUCT_LISTS");
      let products = rawProducts ? JSON.parse(rawProducts) : [];

      setProducts((prev) => {
        return [...products];
      });
    }
  }, []);

  const updateProductsList = (updatedProducts: Data[]) => {
    localStorage.setItem("PRODUCT_LISTS", JSON.stringify(updatedProducts));

    setProducts(() => {
      return updatedProducts;
    });
  };

  return { products, updateProductsList, setProducts };
};

export default useGetProductsList;
