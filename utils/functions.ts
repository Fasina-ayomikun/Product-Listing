import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Data } from "./constants";

export const getProductsList = () => {
  let rawProducts = localStorage.getItem("PRODUCT_LISTS");
  let products = rawProducts ? JSON.parse(rawProducts) : [];
  return products;
};

export const handleDelete = (id: string) => {
  const products = getProductsList();
  const tempProducts = products.filter((product: Data) => product.id !== id);
  products.splice(0, products.length);

  products.push(...tempProducts);

  localStorage.setItem("PRODUCT_LISTS", JSON.stringify(products));

  alert("Product Deleted");
};
