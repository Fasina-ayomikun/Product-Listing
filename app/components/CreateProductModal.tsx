import { randomBytes, randomUUID } from "crypto";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Data } from "../utils/constants";

const CreateProductModal = ({
  isEditing,
  id,
  setIsEditing,
}: {
  isEditing?: boolean;
  id: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialData = {
    name: "",
    desc: "",
    price: 0,
    image: "",
    category: "all",
  };
  const [data, setData] = useState(initialData);
  const open = useSearchParams().get("open");
  const navigate = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setData((prevData) => {
        return { ...prevData, image: reader.result as string };
      });
    };
    reader.onerror = (err) => {
      console.log(err);
    };
    reader.readAsDataURL(file);
  };
  let rawProducts = localStorage.getItem("PRODUCT_LISTS");
  let products: Data[] = rawProducts ? JSON.parse(rawProducts) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const tempProducts = products.filter((product) => product.id !== id);
      products.splice(0, products.length);
      const newData = {
        ...data,
        id,
      };
      products.push(...tempProducts, newData);
      console.log(products);
      localStorage.setItem("PRODUCT_LISTS", JSON.stringify(products));

      setIsEditing(false);
      setData(initialData);
    } else {
      products.push({ ...data, id: randomBytes(32).toString("hex") });

      localStorage.setItem("PRODUCT_LISTS", JSON.stringify(products));
      setData(initialData);
    }
    console.log(products);
    navigate.back();
  };
  useEffect(() => {
    if (isEditing) {
      const product = products.filter((product) => product.id === id);

      setData(product[0]);
    }
  }, [isEditing, id]);
  return (
    <section
      className={`fixed z-10 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-85  items-center justify-center ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className='max-w-2xl w-11/12 min-h-3/4 h-5/6 overflow-y-auto rounded-md bg-purple-800 ring-4 ring-purple-100 px-7 py-6'>
        <h3 className='text-xl text-center font-semibold capitalize  text-purple-100 pb-8'>
          {isEditing ? "Edit" : "Add new"} product
        </h3>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-5'
        >
          <label htmlFor='image' className='text-purple-100 font-medium '>
            Product Image:
            <input
              type='file'
              name='image'
              id='image'
              onChange={handleFileChange}
              className='ml-3 outline-none'
            />
          </label>
          {data.image && (
            <Image
              src={data.image}
              alt='product'
              width={300}
              height={300}
              objectFit='cover'
              objectPosition='center'
            />
          )}
          <input
            onChange={handleChange}
            type='text'
            required
            name='name'
            value={data.name}
            placeholder='Product Name'
            className='input-class'
          />
          <textarea
            onChange={handleChange}
            value={data.desc}
            placeholder='Product description'
            required
            name='desc'
            className='input-class'
          />
          <input
            onChange={handleChange}
            type='number'
            name='price'
            value={data.price}
            required
            placeholder='Product price'
            className='input-class'
          />
          <select
            onChange={handleChange}
            required
            name='category'
            value={data.category}
            className='input-class'
          >
            <option value='all'>Category</option>
            <option value='electronics'>Electronics</option>
            <option value='jewelry'>Jewelry</option>
            <option value='footwear'>Footwear</option>
          </select>
          <div className='flex items-center justify-center gap-3 w-full my-4'>
            <button
              type='button'
              className='bg-gray-300 px-7 py-1 rounded-md text-gray-600'
              onClick={() => {
                navigate.back();
                setIsEditing(false);
                setData(initialData);
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-purple-500 px-7 py-1 rounded-md text-pink-200'
            >
              {isEditing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProductModal;
