import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import UserContext from "../../context/UserContext";
import { useContext } from "react";


function Foglalasmodositas() {

    const listaidmod = sessionStorage.getItem('id'); //felhasználó idjának lekérése
    const { refresh, logout } = useContext(UserContext);
    const {state}=useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
     
    const {adat}=state;
    console.log(adat);

    const [formData, setFormData]  = useState({        
        id: adat.id,
        berloid: adat.berloid,
        autoid: adat.autoid,
        tipus:adat.tipus,
        berletkezdete: adat.berletkezdete,
        berletvege: adat.berletvege,
        napokszama: adat.napokszama,
        napidij: adat.napidij
    });

    const [options, setOptions] = useState(adat);

    useEffect(() => {
        // Fetch  a választási lehetőségek letöltésére
        fetch('http://localhost/autokolcsonzo/public/autober/lista')
            .then(response => response.json())
            .then(data => {
                setOptions(data); // Beállítjuk a választási lehetőségeket
                setLoading(false); // Betöltés vége

            })
            .catch(error => {
                console.error('Hiba történt a választási lehetőségek letöltése közben:', error);
                setLoading(false); // Betöltés vége még hibás esetben is
            });
    }, []);

    if (loading) {
        return <p>Betöltés...</p>; // Addig, amíg betöltődnek a választási lehetőségek
    };

   
 
    const writeFormData = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const adatkuldes = async () => {
        try {
            const keres = await fetch(`http://localhost/autokolcsonzo/public/kolcson/kolcsonmod`, {
                method: "post",
                Headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });
            const valasz = await keres.text();
            alert(valasz);
        } 
        catch (err) {
            console.error("Hiba történt a módosítás során:", err);
            alert("A módosítás nem sikerült.");
        }
    };
    

    console.log(formData);
    const onSubmit = (e) => {
        e.preventDefault();        
        adatkuldes();
        setFormData({
        berloid: '',
        autoid: '',
        berletkezdete: '',
        berletvege: '',
        napokszama: '',
        napidij: ''
        });
        navigate('/rendelesek');
        refresh;
    };



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
                                    <form onSubmit={onSubmit} className="flex flex-col gap-4 pb-4 ">
                                        <h1 className="mb-4 text-2xl font-bold  dark:text-white"></h1>
                                        <h1 className="mb-4 text-2xl font-bold text-center dark:text-white"> FOGLALÁS MÓDOSÍTÁSA</h1>
                                        <h1 className="mb-4 text-xl   dark:text-white">Módosítsa az Autó foglalás adatait!</h1>

                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                >Autó:</label>
                                            </div>
                                            <select className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg" id="autoid" name="autoid" value={formData.autoid} onChange={writeFormData} >
                                                {options.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.tipus}, évjárat: {option.evjarat}, {option.uzemanyag}
                                                    </option >
                                                ))}
                                            </select>
                                        </div>


                                        <div  >
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                    data-testid="flowbite-label" >Kölcsönzés kezdete:</label>
                                            </div>
                                            <div className="flex w-full rounded-lg pt-1">
                                                <div className="relative w-full"><input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                    id="berletkezdete" type="date" name="berletkezdete" required="" onChange={writeFormData} value={formData.berletkezdete} />
                                                </div>
                                            </div>
                                        </div>

                                        <div  >
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                    data-testid="flowbite-label" >Kölcsönzés vége:</label>
                                            </div>
                                            <div className="flex w-full rounded-lg pt-1">
                                                <div className="relative w-full"><input
                                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                    id="berletvege" type="date" name="berletvege" required="" onChange={writeFormData} value={formData.berletvege} />
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                    data-testid="flowbite-label" >Napok száma:</label>
                                            </div>
                                            <input
                                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                id="napokszama"
                                                type="number" // A típusnak számnak kell lennie
                                                name="napokszama"
                                                required=""
                                                value={formData.napokszama = (new Date(formData.berletvege) - new Date(formData.berletkezdete)) / (1000 * 60 * 60 * 24)} // Dátum különbség kiszámítása és kiíratása
                                            />

                                        </div>
                                        <div>
                                            <div className="mb-2">
                                                <label className="text-lg font-medium text-white dark:text-white"
                                                    data-testid="flowbite-label" >Fizetés:</label>
                                            </div>
                                            <input
                                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-red-600 focus:ring-red-600 dark:border-red-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-600 dark:focus:ring-red-600 p-2.5 text-sm rounded-lg"
                                                id="napidij"
                                                type="number" // A típusnak számnak kell lennie
                                                name="napidij"
                                                required=""
                                                value={formData.napidij = (formData.napokszama * 10000)}
                                            />


                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button type="submit"
                                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-red-600 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg ">
                                                <span
                                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                                    Módosítás
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

export default Foglalasmodositas
