import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refresh } from 'aos';

const Register = () => {
    const navigate=useNavigate();
    const [nev, setNev]=useState([]);
    const [jelszo, setJelszo]=useState([]);
    const [jelszo2, setJelszo2]=useState([]);
    const [email, setEmail]=useState([]);
    const [biztonsagikod, setBiztonsagikod]=useState([]);
    const [id, setId]=useState(0);  

    const onSubmit=(e)=>{
        e.preventDefault();
        if(!id)
            {
            kuldes(); 
            refresh();
            }
            else
            {
                if (jelszo==jelszo2)
                {   
                    kuldesujjelszo();  
                }
                 else 
                    {
                    alert("A két jelszo nem azonos!");            
                    }
            }
       
    }

    const kuldes=()=>{
        fetch(`http://localhost/autokolcsonzo/public/admin/biztonsagi`,{
            method:"POST", 
            Headers:{
                "Content-type":"application/json" 
            },
            body:JSON.stringify({email, biztonsagikod})
        })
        .then(res=>res.json())
        .then(id=>{
            setId(id);
            console.log(id);}) 
        .catch(err=>alert(err));
    }

    const kuldesujjelszo = async () => {
        try {
            const keres = await fetch(`http://localhost/autokolcsonzo/public/admin/jelszomod`, {
                method: "post",
                Headers: { "Content-type": "application/json" },
                body: JSON.stringify( {id, jelszo} )
            });
            const valasz = await keres.text();{
            alert("Sikeresen módosította a jelszavát!");
            navigate('/login');
            }
        } catch (err) {
            console.error("Hiba történt a kérés során:", err);
            alert("Hiba történt a kérés során. Kérlek, próbáld újra később.");
        }
    };
      


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
                        <h1 className="mb-4 text-2xl font-bold  dark:text-white">Jelszómódosítás</h1>
                        
                        <form onSubmit={onSubmit} className="flex flex-col gap-4 pb-4">
                        {
                        !id ?
                        <>
                        <div>
                        <h4 className="mb-4 text-12 font-bold  dark:text-white">Kérjük adja meg e-mail címét és biztonsági kódját!</h4>
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
                                    for="username">Biztonsági kód:</label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full"><input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="biztonsagikod" type="biztonsagikod" name="biztonsagikod" placeholder="Biztonsági kód"
                                        required="" value={biztonsagikod} onChange={(e)=>setBiztonsagikod(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" data-testid="cypress-bekuldes"
                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span 
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Beküldés
                                </span>
                            </button>
                        </>
                        :
                        <>
                        <div>
                            <h4 className="mb-4 text-12 font-bold  dark:text-white">Kérjük adja meg új jelszavát!</h4>
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
                            
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit" data-testid="cypress-jelszo-mentese"
                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                <span 
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Jelszó mentése
                                </span>
                            </button>                           
                            

                        </div>
                        </>
                        }
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
