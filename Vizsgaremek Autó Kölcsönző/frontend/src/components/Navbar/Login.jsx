import React from 'react'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from "react";
import UserContext from "../../context/UserContext";


const Login = () => {
    
    const navigate=useNavigate();
    
    const [belepid, setBelepId]=useState();
    const { refresh, logout} = useContext(UserContext);


     
    const kuldes=(formData, method)=>{ // a formDate és a method van átadva neki   
        fetch(`http://localhost/autokolcsonzo/public/admin/belepes`,{
          method:method,
          Headers:{
            "Content-type":"application/json",
         
        },
          body:JSON.stringify(formData)
          
        })
        .then(res=>res.json())
        .then(id=>{
          if(id){
            sessionStorage.setItem('id', id);
            alert('Sikeres belépés!!!!!!');
            refresh;
            window.location.reload()     

      
          } else {            
            toast.error(id.message);
           }
          
        })
       .catch(err=>toast.error(err));
      }
  
      
        const onSubmit=(e)=>{
        e.preventDefault();
        kuldes(formData,'POST');
        navigate('/'); 
        refresh; 
      }
      
      let formObj={
        email:"",
        jelszo:""
      }
      
      const [formData,setFormData]=useState(formObj);
      
      const writeData=(e)=>{
        setFormData((prevState)=>({...prevState, [e.target.id]:e.target.value, [e.target.id]:e.target.value} ));  // módosítjuk, a mezőt akkor a username alapján megkeresi melyik passwordot módosítsuk        
      }
      
      
  return (
    

    <div>
      <div className="py-10">
    <div className="flex h-full items-center justify-center">
        <div
            className="rounded-lg  border border-red-600 bg-white shadow-md dark:border-red-600 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                    <form  onSubmit={onSubmit} className="flex flex-col gap-4 pb-4">
                        <h1 className="mb-4 text-2xl font-bold dark:text-white">Bejelentkezés</h1>
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-red-600 dark:text-red-600"
                                    for="email">Email:</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="email" type="email" name="email" placeholder="email@gmail.com"
                                        required="" onChange={writeData} value={formData.email}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-red-600 dark:text-red-600"
                                    data-testid="flowbite-label" for="password">Jelszó:</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg" id="jelszo" type="password" placeholder="jelszó" name="jelszo"  onChange={writeData} value={formData.jelszo}/>
                                </div>
                            </div>
                            <Link data-testid="cypress-elfelejtettem-a-jelszavam" to={'/emlekezteto'}  className="mt-2 cursor-pointer text-red-600 hover:text-red-400">Elfelejtettem a jelszavam.</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit"
                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span data-testid="cypress-title"
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Belépés
                                </span>
                            </button>
                            <button type="button"
                                className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-red-400 text-gray-900 border border-red-400 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    <Link to='/register'>Regisztráció</Link>
                                    
                                </span>
                            </button>
                        </div>
                    </form>
                    <div className="min-w-[270px]">
                        <div className="mt-4 text-center dark:text-gray-200">
                            <a className="text-blue-500 underline hover:text-blue-600" href="/signup"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
        
  )
}

export default Login


