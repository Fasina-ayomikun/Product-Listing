import React from "react";

const Filters = ({
  setCategory,
  setPrice,
}: {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
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
          <option value='100' className='bg-purple-100 py-1  text-purple-300'>
            $100
          </option>
          <option value='500' className='bg-purple-100 py-1  text-purple-300'>
            $500
          </option>
          <option value='1000' className='bg-purple-100 py-1  text-purple-300'>
            $1000
          </option>
          <option value='2000' className='bg-purple-100 py-1  text-purple-300'>
            $2000
          </option>
          <option value='5000' className='bg-purple-100 py-1  text-purple-300'>
            $5000
          </option>
          <option value='10000' className='bg-purple-100 py-1  text-purple-300'>
            $10000
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
