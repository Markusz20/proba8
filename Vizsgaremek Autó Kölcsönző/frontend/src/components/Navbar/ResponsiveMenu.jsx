
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navlinks, Navlinks2 } from "./Navbar";

const ResponsiveMenu = ({ showMenu }) => { //Hamburger menu telefon nézetben

  const navigate = useNavigate();
  const { refresh, logout } = useContext(UserContext);
  const listaid = sessionStorage.getItem('id'); // lekérjük a  listaidünket.
  const [adatok, setAdatok] = useState([]); // mivel lista lesz eztért kell []. ha kihagyjuk hibát jelez a map (map is undifaned)

  const [nev, setNev] = useState();

  //useEffect(()=>{},[])
  if (listaid) {
    useEffect(() => {
      fetch(`http://localhost/autokolcsonzo/public/admin/listaid`, {
        method: "POST",
        Headers: {
          "Content-type": "application/json" //megadjuk, hogy milyen Jsont használunk.
        },
        body: JSON.stringify({ listaid })
      })
        .then(res => res.json())
        .then(adatok => {
          setAdatok(adatok);
          setNev(adatok[0]['nev']);
          refresh;

          // console.log(adatok)
        }) //rögtön kiiratjuk a console-ra, hogy sikerül e a fetch.
        .catch(err => alert(err)); // ha hiba van akkor egy ablak fog megjelenni.
    }, []);
   


  }

  const alma=()=>{
    
    
    navigate('/ugyfeladatok');
    window.location.reload();
  }
  const kilepes=()=>{
    
    sessionStorage.removeItem('id'); // törli a kilépéskor a listaidt
    navigate('/');
    window.location.reload();
  }
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
        <Link className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-red-600 transition-colors duration-500  "><FaUserCircle size={50} /></Link>
          <div>
          
                      {/* <a onClick={()=>{kilepes(); navigate('/')}} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Kilépés</a> */}
                      <Link onClick={alma} className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500  ">{nev}</Link>
                    
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
          {
                // ha nincs belépve
                !listaid ?
                <>
            {Navlinks.map((data) => (
              <li>
                <a href={data.link} className="text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500">
                  {data.name}
                </a>
              </li>
            ))}
            </>
            :
            // Ha be van lépve
            <>
           {Navlinks2.map((data) => (
                <li>
                  <a href={data.link} className="text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500">
                  {data.name}
                </a>
                </li>           
                
              )

            )
              
              }
                <li>
                {/* <a onClick={()=>{kilepes(); navigate('/')}} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Kilépés</a> */}
                <Link to="/" onClick={kilepes} className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500  ">Kilépés</Link>
              </li>
              
            </>}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
