import { Data } from "@/utils/constants";
import { getProductsList } from "@/utils/functions";
import React from "react";

const Filters = ({
  setCategory,
  setPrice,
}: {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const products = getProductsList();
  const categories: string[] = Array.from(
    new Set(products.map((product: Data) => product.category))
  );

  return (
    <div className='flex-between gap-4 px-7 py-5 flex-wrap'>
      <div className='gap-3 flex-between text-purple-100 flex-wrap'>
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
          {categories.map((category: string, index: number) => {
            return (
              <li
                className='category-list '
                key={index}
                onClick={() => {
                  setCategory(category);
                }}
              >
                {category}
              </li>
            );
          })}
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
          <option value='100' className='bg-purple-100 py-1  text-purple-300'>
            $100 and above
          </option>
          <option value='500' className='bg-purple-100 py-1  text-purple-300'>
            $500 and above
          </option>
          <option value='1000' className='bg-purple-100 py-1  text-purple-300'>
            $1000 and above
          </option>
          <option value='2000' className='bg-purple-100 py-1  text-purple-300'>
            $2000 and above
          </option>
          <option value='5000' className='bg-purple-100 py-1  text-purple-300'>
            $5000 and above
          </option>
          <option value='10000' className='bg-purple-100 py-1  text-purple-300'>
            $10000 and above
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
