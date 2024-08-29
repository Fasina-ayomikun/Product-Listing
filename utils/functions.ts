import { Data } from "./constants";

export const getProductsList = () => {
  let products: Data[] = [];
  if (window !== undefined) {
    let rawProducts = localStorage.getItem("PRODUCT_LISTS");
    products = rawProducts ? JSON.parse(rawProducts) : [];
  }
  return products;
};
