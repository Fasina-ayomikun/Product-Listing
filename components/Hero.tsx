import React from "react";

const Hero = () => {
  return (
    <section className='hero-image grid place-content-center'>
      <div>
        <h1 className='font-bold text-center text-4xl md:text-6xl lg:text-8xl font-[Raleway]  text-purple-300   '>
          Product Listing
        </h1>
        <p className='text-center text-pink-200 text-sm lg:text-xl'>
          A product listing platform{" "}
        </p>
      </div>
    </section>
  );
};

export default Hero;
