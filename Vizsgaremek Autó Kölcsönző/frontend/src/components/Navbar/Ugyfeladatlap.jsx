
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"

import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


const Ugyfeladatlap = () => {
    const listaidmod = sessionStorage.getItem('id');

    const { refresh, logout } = useContext(UserContext);  
    const navigate = useNavigate();
    const [adatok, setAdatok] = useState([]);  
    const [formData, setFormData] = useState({
        nev: '',
        jogositvanyszama: '',
        telefonszam: '',
        szuletesiido: '',
        biztonsagikod: '',
        email: '',
        isz: '',
        varos: '',
        cim: ''
    });

    useEffect(() => {
        fetch(`http://localhost/autokolcsonzo/public/admin/listaidmod`, {
            method: "POST",
            Headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ listaidmod })
        })
        .then(res => res.json())
        .then(adatok => {
            setAdatok(adatok);
            setFormData(adatok[0]); // Adatok beállítása a formon
        })
        .catch(err => alert("Hiba történt az adatok lekérésekor")); // Bonyolultabb hibaüzenet kezelése
    }, []);

    return (
        <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
        >
            <div >

                <div className="py-10">
                    <div className="flex h-full items-center justify-center">
                        <div
                            className="rounded-lg border border-red-600 bg-white shadow-md dark:border-red-600 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
                            <div className="flex h-full flex-col justify-center gap-4 p-6">
                                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                                    <form className="flex flex-col gap-4 pb-4 ">
                                        <h1 className="mb-4 text-2xl font-bold text-center dark:text-white">{formData.nev} adatai:</h1>

                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                >Név:</label>
                                            </div>
                                            <div className="flex w-full rounded-lg pt-1">
                                                <div className="relative w-full"><input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                    id="nev" type="nev" name="nev" placeholder="Név"
                                                    required="" value={formData.nev} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                >Email: </label>
                                            </div>
                                            <div className="flex w-full rounded-lg pt-1">
                                                <div className="relative w-full"><input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                    id="email" type="email" name="email" placeholder="email@gmail.com"
                                                    required="" value={formData.email} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                >Biztonsági kód:<br />
                                                    (A kód megadása után van lehetőség jelszó módosításra)</label>
                                            </div>
                                            <div className="flex w-full rounded-lg pt-1">
                                                <div className="relative w-full"><input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                    id="biztonsagikod" type="biztonsagikod" name="biztonsagikod" placeholder="Biztonsági kód"
                                                    required="" value={formData.biztonsagikod} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 justify-items-center'>
                                            <div>
                                                <div className="mb-2">
                                                    <label className="text-lg font-medium text-white dark:text-white"
                                                        data-testid="flowbite-label" >Jogosítvány száma:</label>
                                                </div>
                                                <div className="flex w-full rounded-lg pt-1">
                                                    <div className="relative w-full"><input
                                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                        id="jogositvanyszama" type="jogositvanyszama" name="jogositvanyszama" required="" value={formData.jogositvanyszama} />
                                                    </div>
                                                </div>

                                            </div>

                                            <div>
                                                <div className="mb-2">
                                                    <label className="text-lg font-medium text-white dark:text-white"
                                                        data-testid="flowbite-label" >Telefonszám:</label>
                                                </div>
                                                <div className="flex w-full rounded-lg pt-1">
                                                    <div className="relative w-full"><input
                                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                        id="telefonszam" type="telefonszam" name="telefonszam" required=""  value={formData.telefonszam} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 justify-items-center'>
                                            <div>
                                                <div className="mb-2">
                                                    <label className="text-lg font-medium text-white dark:text-white"
                                                        data-testid="flowbite-label" >Irányítószám:</label>
                                                </div>
                                                <div className="flex w-full rounded-lg pt-1">
                                                    <div className="relative w-full"><input
                                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                        id="isz" type="isz" name="isz" required="" value={formData.isz} />
                                                    </div>
                                                </div>

                                            </div>

                                            <div>
                                                <div className="mb-2">
                                                    <label className="text-lg font-medium text-white dark:text-white"
                                                        data-testid="flowbite-label" >Város:</label>
                                                </div>
                                                <div className="flex w-full rounded-lg pt-1">
                                                    <div className="relative w-full"><input
                                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                        id="varos" type="varos" name="varos" required="" value={formData.varos} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                    data-testid="flowbite-label" >Cím:</label>
                                            </div>
                                            <div className="flex w-full rounded-lg pt-1">
                                                <div className="relative w-full"><input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                    id="cim" type="cim" name="cím" required=""  value={formData.cim} />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="flex flex-col gap-2">
                                            <button type="submit"
                                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                                <Link to={"/modositas"}
                                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                                    Adatmódosítás
                                                </Link>
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


export default Ugyfeladatlap