import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import carPng from "../../assets/car.png";
import black from "../../assets/c.png";
import { Link } from "react-router-dom";
import a from "../../assets/a.png";
import b from "../../assets/b.png";
import c from "../../assets/c.png";
import d from "../../assets/d.png";
import e from "../../assets/e.png";
import f from "../../assets/f.png";
import g from "../../assets/g.png"
import AOS from "aos";


const Hero = ({ theme }) => {

  
  
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 4) % 5
      );

      return updatedIndexes;
    });
  };

  const images = [a, b, c, d, e];

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "50%", scale: 0.7, zIndex: 3 },
    left: { x: "90%", scale: 0.5, zIndex: 2 },
    right: { x: "-90%", scale: 0.5, zIndex: 1 },
    right1: { x: "-50%", scale: 0.7, zIndex: 3 },
  };
  useEffect(() => {
    AOS.refresh();
  });
  return (
    <div className=" duration-300 ">
      <div className="container min-h-[620px]  flex">
        <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1  sm:order-2"
          >
            <img
              src={black}
              alt=""
              className="sm:scale-100 relative -z-10 max-h-[600px] "
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p data-aos="fade-up" className="text-red-600 text-2xl font-serif">
             
            </p>
            <img
              src={g}
              alt=""
              className="sm:scale-100 relative -z-10 max-h-[600px] "
            />
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-4xl lg:text-6xl font-semibold font-serif  text-red-600"
            >
              Autó Kölcsönzés
            </h1>
            
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={() => {
                AOS.refreshHard();
              }}
              className=""
            >
              
              
            </button>
          </div>
        </div>
        
      </div>
      <div className="max-w-4xl p-2  mx-auto 2 mt-10 ">
      <div className="flex text-center p-10">
  <div className="flex-none w-14 h-14  p">

  </div>
  <div className="grow h-14 ...">
  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 text-center">Galéria
        </h3>
  </div>
  <div className="flex-none w-14 h-14 ">

  </div>
</div>
      </div>


      
       
    
            <div className="flex items-center flex-col justify-center">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={image}
          className="rounded-[12px]"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: "40%", position: "absolute" }}
        />
      ))}
      <div className="flex flex-row gap-3">
        <button
          className=" mt-[300px]"
          onClick={handleBack}
        >
          
        </button>
        <button
          className=" mt-[300px]"
          onClick={handleNext}
        >
          
        </button>
      </div>
      
    </div>
    <div className="max-w-3xl pt-4  mx-auto 2 mt-10 ">
      <div className="flex text-center p-10">
  <div className="flex-none w-14 h-14  p">
  <button
          className="bg-transparent  hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-4 border-2 border-red-600 hover:border-transparent rounded"
          onClick={handleBack}
        >Vissza
          
        </button>
  </div>
  <div className="grow h-14 ...">
  </div>
  <div className="flex-none w-14 h-14 ">
  <button
          className="bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-4 border-2 border-red-600 hover:border-transparent rounded"
          onClick={handleNext}
        >Tovább
          
        </button>
  </div>
</div>
    </div>
    </div>
  );
};

export default Hero;
