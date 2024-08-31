import { Data } from "@/utils/constants";
import React, { useEffect, useState } from "react";

const useGetProductsList = () => {
  const [products, setProducts] = useState<Data[]>([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (window !== undefined) {
      const getProductsList = () => {
        if (window !== undefined) {
          let rawProducts = localStorage.getItem("PRODUCT_LISTS");
          let products = rawProducts ? JSON.parse(rawProducts) : [];

          return products;
        }
      };
      const productsList = getProductsList();

      setProducts((prev) => {
        return [...productsList];
      });
    }
  }, []);

  const updateProductsList = (updatedProducts: Data[]) => {
    localStorage.setItem("PRODUCT_LISTS", JSON.stringify(updatedProducts));

    setProducts(() => {
      return updatedProducts;
    });
  };

  return { products, updateProductsList };
};

export default useGetProductsList;
