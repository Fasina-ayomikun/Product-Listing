import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const navigate = useRouter();
  const pathname = usePathname();
  return (
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
  );
};

export default Header;
