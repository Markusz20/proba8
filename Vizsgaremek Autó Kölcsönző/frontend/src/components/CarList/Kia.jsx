import { FaGasPump } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { MdEventSeat } from "react-icons/md";
import { CgCodeClimate } from "react-icons/cg";
import { AiFillSound } from "react-icons/ai";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { RiExchangeFundsFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { PiEngineBold } from "react-icons/pi";
import { useState } from "react";



function Kia({Auto}) {
    
  const [isShowMore, setIsShowMore] = useState(false);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <div className="p-3">
       
    <div className="max-w-4xl  p-4 text-algin-center items-center mx-auto px-2 mt-16 border-4 border-red-600 rounded-lg">

    <div className="">
      <div className="px-4 items-center  rounded-b-lg border-red-600">
    <div className="font-bold text-3xl text-gray-800 text-center">
            <p>{Auto.tipus}</p>
    </div>
    </div>
      <img className="w-[105%] max-w-none h-auto" src={Auto.kepek} alt="" />
    </div>

    {isShowMore && (
        
      
    <div className="grid md:grid-cols-1 gap-10 mt-10">


        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-300/10 p-3 rounded-lg "> 
            <MdHealthAndSafety /></span>
            <div>
                <h3 className="font-semibold text-xl">Biztonság</h3>
                <p className="mt-1 text-gray-700"> {
                  Auto.biztonság
                }</p>
            </div>
        </div>


        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <MdEventSeat /></span>
            <div>
                <h3 className="font-semibold text-xl">Ülések</h3>
                <p className="mt-1 text-gray-500">{Auto.ülések}. </p>
            </div>
        </div>


        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <CgCodeClimate /></span>
            <div>
                <h3 className="font-semibold text-xl">Klima</h3>
                <p className="mt-1 text-gray-500"> {Auto.klima}</p>
            </div>
        </div>


        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <AiFillSound /></span>
            <div>
                <h3 className="font-semibold text-xl">Audió</h3>
                <p className="mt-1 text-gray-500">{Auto.audio}</p>
            </div>
        </div>


        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <GiCardboardBoxClosed /></span>
            <div>
                <h3 className="font-semibold text-xl">Belső felszereltség</h3>
                <p className="mt-1 text-gray-500"> {Auto.belsofelszereltseg}</p>
            </div>
        </div>


        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <RiExchangeFundsFill /></span>
            <div>
                <h3 className="font-semibold text-xl">Váltó</h3>
                <p className="mt-1 text-gray-500"> {Auto.valto}</p>
            </div>
        </div>

        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <BiSupport /></span>
            <div>
                <h3 className="font-semibold text-xl">Autó vezetés támogató rendszerek</h3>
                <p className="mt-1 text-gray-500"> {Auto.vezetesttamogatorendszerek}</p>
            </div>
        </div>

        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <PiEngineBold /></span>
            <div>
                <h3 className="font-semibold text-xl">Motor</h3>
                <p className="mt-1 text-gray-500">{Auto.motor}</p>
            </div>
        </div>

        <div className="flex gap-4 items-start">
            <span className="text-red-600 bg-violet-500/10 p-3 rounded-full">
            <FaGasPump /></span>
            <div>
                <h3 className="font-semibold text-xl">Üzemanyag</h3>
                <p className="mt-1 text-gray-500"> {Auto.uzemanyag}</p>
            </div>
        </div>
        
      
    </div>
)}
<button className="text-lg font-medium w-32 text-red-600 border-red-600 hover:text-black p-2 rounded-lg border-y-2 hover:border-black transition-colors duration-500" onClick={toggleReadMoreLess}>
  {isShowMore ? "Kevesebb" : "Több"}
</button>

    </div>
</div>

  )
}

export default Kia