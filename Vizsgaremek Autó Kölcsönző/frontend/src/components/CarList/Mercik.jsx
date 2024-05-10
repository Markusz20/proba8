import { useState,useEffect } from "react";
import Merci from "./Merci";




function Mercik(props) {
  const [Autok,setAutok]=useState([]);
//http://localhost/autokolcsonzo/public/autober/lista
  useEffect(()=>{
    fetch("http://localhost/autokolcsonzo/public/merci/lista")
    .then(res=>res.json())
    .then(lista=>setAutok(lista))
    .catch(err=>alert(err));
  },[]);


  return (
    <div className="max-w-7xl mx-auto relative">
    <div className="">
     <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 justify-items-center">
     {
      Autok.map((Auto,i)=><Merci key={i} Auto={Auto}/>)
     }
     </div>
    </div>
  </div>
  )
}

export default Mercik
