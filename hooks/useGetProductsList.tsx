import { Data } from "@/utils/constants";
import React, { useEffect, useState } from "react";

const useGetProductsList = () => {
  const [products, setProducts] = useState<Data[]>([]);
  const getProductsList = () => {
    let rawProducts = localStorage.getItem("PRODUCT_LISTS");
    let products = rawProducts ? JSON.parse(rawProducts) : [];
    return products;
  };
  useEffect(() => {
    if (window !== undefined) {
      let rawProducts = localStorage.getItem("PRODUCT_LISTS");
      let products = rawProducts ? JSON.parse(rawProducts) : [];
      setProducts(products);
      console.log(products);
    }
  }, []);
  return { products };
};

export default useGetProductsList;
