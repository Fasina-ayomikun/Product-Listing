import { randomBytes } from "crypto";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Data, initialData } from "../utils/constants";
import { useUploadImage } from "@/hooks/useUploadingImage";
import useGetProductsList from "@/hooks/useGetProductsList";

const CreateProductModal = ({
  isEditing,
  id,
  setIsEditing,
  setOpen,
  product,
}: {
  isEditing: boolean;
  id: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: Data;
}) => {
  const [data, setData] = useState(initialData);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useRouter();
  const { uploadImage, isUploadingImage } = useUploadImage();
  const { products, updateProductsList } = useGetProductsList();

  const fileRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
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
    setFile(file);
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      const tempProducts = products.filter((product) => product.id !== id);
      let newData = {} as Data;

      if (file) {
        uploadImage(file, {
          onSuccess: (image) => {
            newData = {
              ...data,
              image,
              id,
            };
            const newProducts = [...tempProducts, newData];
            updateProductsList(newProducts);
          },
        });
      } else {
        newData = {
          ...data,
          id,
        };
        const newProducts = [...tempProducts, newData];
        updateProductsList(newProducts);
      }
    } else {
      uploadImage(file, {
        onSuccess: (image) => {
          const newProducts = [
            ...products,
            {
              ...data,
              id: randomBytes(32).toString("hex"),
              image,
            },
          ];

          updateProductsList(newProducts);
        },
      });
    }
    if (!isUploadingImage) {
      setOpen(false);
      window.location.reload();
      setIsEditing(false);
      setData(initialData);
      setFile(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };
  useEffect(() => {
    if (isEditing) {
      product && setData(product);
    }
  }, [isEditing, id]);
  return (
    <section
      className={`fixed z-10 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-85  items-center justify-center flex
      `}
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
              required={!isEditing}
              id='image'
              ref={fileRef}
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
            className='input-class '
          >
            <option value='all' className='bg-purple-800 '>
              Category
            </option>
            <option value='electronics' className='bg-purple-800'>
              Electronics
            </option>
            <option value='jewelry' className='bg-purple-800'>
              Jewelry
            </option>
            <option value='footwear' className='bg-purple-800'>
              Footwear
            </option>
            <option value='cream' className='bg-purple-800'>
              Cream
            </option>
            <option value='cloth' className='bg-purple-800'>
              Cloth
            </option>
          </select>
          <div className='flex items-center justify-center gap-3 w-full my-4'>
            <button
              type='button'
              className='bg-gray-300 px-7 py-1 rounded-md text-gray-600'
              onClick={() => {
                if (fileRef.current) {
                  fileRef.current.value = "";
                }
                setOpen(false);
                setIsEditing(false);
                setData(initialData);

                setFile(null);
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isUploadingImage}
              className='bg-purple-500 px-7 py-1 rounded-md text-pink-200'
            >
              {isUploadingImage ? "Loading..." : isEditing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProductModal;
