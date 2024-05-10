import React from 'react'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();

    const [nev, setNev]=useState([]);
    const [jelszo, setJelszo]=useState([]);
    const [jelszo2, setJelszo2]=useState([]);
    const [email, setEmail]=useState([]);


    const onSubmit=(e)=>{
        e.preventDefault();
        if (jelszo==jelszo2)
        {   
            kuldes();  
        }
        else 
        {
            alert("A két jelszo nem azonos!");
            
        }
    }

    const kuldes=()=>{
        fetch(`http://localhost/autokolcsonzo/public/admin/register`,{
            method:"POST", 
            Headers:{
                "Content-type":"application/json" //megadjuk, hogy milyen Jsont használunk.
            },
            body:JSON.stringify({nev, jelszo, email})
        })
        .then(res=>res.json())
        .then(valasz=>{(valasz.message); alert("Sikeres regisztráció!, Lépjen be és adja meg a többi adatait!"); navigate("/login")}) //elnavigálunk
        .catch(err=>alert(err));
    }

  return (
    
        <div
          data-aos="zoom-in"
          data-aos-duration="1500"
          data-aos-once="false"
          className="order-1 sm:order-2"
        > 
    <div>
      <div className="py-10">
    <div className="flex h-full items-center justify-center">
        <div
            className="rounded-lg border border-red-600 bg-white shadow-md dark:border-red-600 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 pb-4">
                        <h1 className="mb-4 text-2xl font-bold  dark:text-white">Regisztráció</h1>
                        <div>
                            <div className="mb-2"> 
                                <label className="text-sm font-medium text-red-600 dark:text-red-600"
                                    for="username">Név:</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="username" type="username" name="username" placeholder="Teljes név"
                                        required="" value={nev} onChange={(e)=>setNev(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2"> 
                                <label className="text-sm font-medium text-red-600 dark:text-red-600"
                                    for="email">Email:</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="email" type="email" name="email" placeholder="email@gmail.com"
                                        required="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-red-600 dark:text-red-600"
                                    data-testid="flowbite-label" for="password">Jelszó</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="password" type="password" name="password" required="" value={jelszo} onChange={(e)=>setJelszo(e.target.value)}/>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <div className="mb-2">
                                <label className="text-sm font-medium text-red-600 dark:text-red-600"
                                    data-testid="flowbite-label" for="password">Jelszó</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="password2" type="password" name="password" required="" value={jelszo2} onChange={(e)=>setJelszo2(e.target.value)}/>
                                </div>
                            </div>
                            <Link to={'/emlekezteto'} className="mt-2 cursor-pointer text-red-600 hover:text-red-400">Elfelejtettem a jelszavam.</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit" data-testid="cypress-title"
                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Regisztráció
                                </span>
                            </button>
                            
                            <button type="button"
                        
                                className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-red-400 text-gray-900 border border-red-400 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    <Link to='/login'>Belépés</Link>
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
        </div>
  )
}

export default Register
