import Osszesek from "./Osszesek";
import Kiak from "./Kiak";
import Mercik from "./Mercik";
import Teslak from "./Teslak";
import Audik from "./Audik";
import Fordok from "./Fordok";
import { useState } from "react";

function CarList() {

    //1
  const [isShowMore, setIsShowMore] = useState(false);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  }
//2
  const [isShowMores, setIsShowMores] = useState(false);

  const toggleReadMoreLesss = () => {
      setIsShowMores(!isShowMores);}
      //3
      const [isShowMoress, setIsShowMoress] = useState(false);

  const toggleReadMoreLessss = () => {
      setIsShowMoress(!isShowMoress);}
      //4
      const [isShowMoresss, setIsShowMoresss] = useState(false);

  const toggleReadMoreLesssss = () => {
      setIsShowMoresss(!isShowMoresss);}
      //5
      const [isShowMoressss, setIsShowMoressss] = useState(false);

  const toggleReadMoreLessssss = () => {
      setIsShowMoressss(!isShowMoressss);}
      //6
      const [isShowMoresssss, setIsShowMoresssss] = useState(true);

  const toggleReadMoreLesssssss = () => {
      setIsShowMoresssss(!isShowMoresssss);}
  return (
    <div>
   <div className="">
   <div>
      
      
      
    </div>
   <div className="w-full max-w-2xl mx-auto p-10">
    <div className="flex flex-auto justify-evenly  pz-4  border-red-600 rounded-md w-full">
    <button onClick={toggleReadMoreLesssssss} className="text-lg font-medium w-32 mx-8 text-red-600 border-red-600 hover:text-black p-3 rounded-lg border-y-2 hover:border-black transition-colors duration-500">
            <input type="radio" className="hidden" id="searchMCQs"/>
            {isShowMoresssss ? "Kevesebb" : "Összes"}
        </button>
        <button onClick={toggleReadMoreLess} className=" text-lg font-medium text-md w-32 text-red-600 border-red-600 hover:text-black p-3 rounded-lg border-y-2 hover:border-black transition-colors ">
            <input type="radio" className="hidden" id="searchMCQs"/>
            {isShowMore ? "Kevesebb" : "Ford"}
        </button>

        <button onClick={toggleReadMoreLesss} className=" text-lg font-medium w-32 mx-8 text-red-600 border-red-600 hover:text-black p-3 rounded-lg border-y-2 hover:border-black transition-colors duration-500">
            <input type="radio" className="hidden" id="searchMCQs"/>
            {isShowMores ? "Kevesebb" : "Audi"}
        </button>

        <button onClick={toggleReadMoreLessss} className=" text-lg font-medium w-32 text-red-600 border-red-600  hover:text-black p-3 rounded-lg border-y-2 hover:border-black transition-colors duration-500">
            <input type="radio" className="hidden" id="searchMCQs"/>
            {isShowMoress ? "Kevesebb" : "Tesla"}
        </button>

        <button onClick={toggleReadMoreLesssss} className="text-lg font-medium w-32 mx-8 text-red-600 border-red-600 hover:text-black p-3 rounded-lg border-y-2 hover:border-black transition-colors duration-500">
            <input type="radio" className="hidden" id="searchMCQs"/>
            {isShowMoresss ? "Kevesebb" : "Mercédesz"}
        </button>
        <button onClick={toggleReadMoreLessssss} className="text-lg font-medium w-32 text-red-600 border-red-600 hover:text-black p-3 rounded-lg border-y-2 hover:border-black transition-colors duration-500">
            <input type="radio" className="hidden" id="searchMCQs"/>
            {isShowMoressss ? "Kevesebb" : "Kia"}
        </button>
        
        </div>
      </div>  
    </div>
    <div className="max-w-7xl mx-auto relative">
    <div className="">
      <div className="">
      {isShowMore && (
       <Fordok>
       
     </Fordok>
       )}</div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto relative">
    <div className="">
      <div className="">
      {isShowMores && (
       <Audik>
       
     </Audik>
       )}</div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto relative">
    <div className="">
      <div className="">
      {isShowMoress && (
       <Teslak>
       
     </Teslak>
       )}</div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto relative">
    <div className="">
      <div className="">
      {isShowMoresss && (
       <Mercik>
       
     </Mercik>
       )}</div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto relative">
    <div className="">
      <div className="">
      {isShowMoressss && (
       <Kiak>
  
     </Kiak>
       )}</div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto relative">
    <div className="">
      <div className="">
      {isShowMoresssss && (
       <Osszesek>
  
     </Osszesek>
       )}</div>
      </div>
    </div>
  </div>
  )
}

export default CarList
