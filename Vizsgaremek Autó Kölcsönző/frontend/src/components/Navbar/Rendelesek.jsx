
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext";
import { useContext } from "react";


const Rendelesek = () => {
    const berloid = sessionStorage.getItem('id');
    const { refresh, logout } = useContext(UserContext);
    const [adatok, setAdatok] = useState([]);
    const navigate=useNavigate();
    const {id}=adatok;
        

    useEffect(() => {
        fetch(`http://localhost/autokolcsonzo/public/kolcson/rendelesek`, {
            method: "post",
            Headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ berloid })
        })
            .then(res => res.json())
            .then(adatok => {
                setAdatok(adatok);

            })
            .catch(err => alert("Hiba történt az adatok lekérésekor")); // Bonyolultabb hibaüzenet kezelése
    }, []);

    console.log(adatok);

    const torles=()=>{
        fetch(`http://localhost/autokolcsonzo/public/kolcson/kolcsontorolid`,{
            method:"delete",
            Headers:{"Content-type":"application/json"},
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(valasz=>{alert(valasz.message); navigate("/rendelesek")})
        .catch(err=>alert(err))
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center mb-4">Rendeléseim</h1>
            <table className="table-auto border-collapse border border-gray-400">


                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Autó képe</th>
                        <th className="border border-gray-400 px-4 py-2">Autó típusa</th>
                        <th className="border border-gray-400 px-4 py-2">Autó bérlet kezdete</th>
                        <th className="border border-gray-400 px-4 py-2">Autó bérlet vége</th>
                        <th className="border border-gray-400 px-4 py-2">Bérelt napokszama</th>
                        <th className="border border-gray-400 px-4 py-2">Fizetendő</th>
                        <th className="border border-gray-400 px-4 py-2">Módosítás</th>
                        <th className="border border-gray-400 px-4 py-2">Törlés</th>
                    </tr>
                </thead>
                <tbody>
                    {adatok.map(adat => (
                        <tr key={adat.id}>
                            <td className="border border-gray-400 px-4 py-2">
                                <img src={adat.kepek} alt="Kép" className="w-20 h-20" />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">{adat.tipus}</td>
                            <td className="border border-gray-400 px-4 py-2">{adat.berletkezdete}</td>
                            <td className="border border-gray-400 px-4 py-2">{adat.berletvege}</td>
                            <td className="border border-gray-400 px-4 py-2">{adat.napokszama}</td>
                            <td className="border border-gray-400 px-4 py-2">{adat.napidij}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button type="submit" className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-blue-600 hover:bg-blue-400 active:bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "onClick={()=>navigate('/foglalasmodositas',{state:{adat}})}>
                                    <span
                                        className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                        Módosítás
                                    </span>
                                </button></td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button type="submit" className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg " onClick={()=>torles(id)}>
                                    <span
                                        className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                        Törlés
                                    </span>
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}

export default Rendelesek;
