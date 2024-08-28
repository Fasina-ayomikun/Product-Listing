"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CreateProductModal from "./components/CreateProductModal";
import { Data, defaultProducts } from "./utils/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100);
  const [filteredProducts, setFilteredProducts] = useState<Data[]>([]);
  const navigate = useRouter();
  const pathname = usePathname();

  let rawProducts = localStorage.getItem("PRODUCT_LISTS");
  let products: Data[] = rawProducts ? JSON.parse(rawProducts) : [];
  const handleFiltering = () => {
    console.log(products);

    let filteredProducts = [...products];
    setFilteredProducts(() => {
      return [...filteredProducts];
    });

    if (category !== "all") {
      let tempProducts = [...filteredProducts];
      tempProducts = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(() => {
        return [...tempProducts];
      });

      return;
    }
    if (price !== 0) {
      let tempProducts = [...filteredProducts];
      tempProducts = products.filter((product) => product.price >= price);
      setFilteredProducts(() => {
        return [...tempProducts];
      });
      console.log(tempProducts);

      return;
    }
    return;
  };
  console.log(filteredProducts);
  useEffect(() => {
    handleFiltering();
  }, [category, price]);
  useEffect(() => {
    if (window !== undefined) {
      const alreadySet = localStorage.getItem("PRODUCT_LISTS");
      if (alreadySet) {
        return;
      } else {
        localStorage.setItem("PRODUCT_LISTS", JSON.stringify(defaultProducts));
      }
    }
  }, []);
  return (
    <section className='relative'>
      <header className='flex items-center justify-between gap-4 px-6 container py-4 '>
        <Link href={"/"} className='text-pink-200'>
          Product Listing
        </Link>
        <p
          onClick={() => {
            navigate.push(`${pathname}?open=true`);
          }}
          className='cursor-pointer text-pink-200'
        >
          Create Product
        </p>
      </header>
      <section className='hero-image grid place-content-center'>
        <div>
          <h1 className='font-bold text-center text-8xl font-[Raleway]  text-purple-300'>
            Product Listing
          </h1>
          <p className='text-center text-pink-200 text-xl'>
            A product listing platform{" "}
          </p>
        </div>
      </section>

      <section className='mt-7 container'>
        <h1 className='text-2xl font-semibold my-4 capitalize underline  text-center text-purple-200'>
          Our Products
        </h1>

        <div className='flex-between gap-4 px-7 py-5'>
          <div className='gap-3 flex-between text-purple-100'>
            <p className='text-pink-200'>Categories:</p>
            <ul className='flex-between gap-3'>
              <li
                className='category-list'
                onClick={() => {
                  setCategory("all");
                }}
              >
                all
              </li>
              <li
                className='category-list '
                onClick={() => {
                  setCategory("electronics");
                }}
              >
                electronics
              </li>
              <li
                className='category-list'
                onClick={() => {
                  setCategory("jewelry");
                }}
              >
                jewelry
              </li>
              <li
                className='category-list'
                onClick={() => {
                  setCategory("footwear");
                }}
              >
                footwear
              </li>
            </ul>
          </div>
          <div className='gap-3 flex-between text-purple-100'>
            <p className='text-pink-200'>Price:</p>
            <select
              name='price'
              id='price'
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
              className='outline-none category-list '
            >
              <option value='0' className='bg-purple-100 py-1  text-purple-300'>
                Range
              </option>
              <option
                value='100'
                className='bg-purple-100 py-1  text-purple-300'
              >
                $100
              </option>
              <option
                value='500'
                className='bg-purple-100 py-1  text-purple-300'
              >
                $500
              </option>
              <option
                value='1000'
                className='bg-purple-100 py-1  text-purple-300'
              >
                $1000
              </option>
              <option
                value='2000'
                className='bg-purple-100 py-1  text-purple-300'
              >
                $2000
              </option>
              <option
                value='5000'
                className='bg-purple-100 py-1  text-purple-300'
              >
                $5000
              </option>
              <option
                value='10000'
                className='bg-purple-100 py-1  text-purple-300'
              >
                $10000
              </option>
            </select>
          </div>
        </div>
      </section>
      <section className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 items-center gap-8 container px-10 py-4'>
        {filteredProducts.length < 1 ? (
          <p className='text-pink-200'>
            No product available, create new products
          </p>
        ) : (
          filteredProducts.map((product) => {
            return (
              <div key={product.id} className='w-full h-full'>
                <div
                  onClick={() => {
                    navigate.push(`/product/${product.id}`);
                  }}
                  className='relative h-72 w-full'
                >
                  <Image
                    src={product.image}
                    alt='product'
                    objectFit='cover'
                    fill
                  />
                </div>
                <p className='text-pink-200 font-medium text-xl uppercase py-3 px-2 flex items-center justify-between'>
                  {product.name} <span className=''>${product.price}</span>
                </p>
                <hr className='w-11/12 mx-auto' />
                <p className='text-xs font-thin text-pink-200 py-3 px-3'>
                  Category: <span>{product.category}</span>
                </p>
              </div>
            );
          })
        )}
      </section>
      <CreateProductModal id='' setIsEditing={() => {}} />
    </section>
  );
}
