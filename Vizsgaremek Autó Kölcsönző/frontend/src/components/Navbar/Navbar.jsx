import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";


export const Navlinks = [
  {
    id: 1,
    name: "Főoldal",
    link: "/",
  },
  {
    id: 2,
    name: "Bérautók",
    link: "/carlist"
  },
  { 
    id: 3, 
    name: "Belépés",
    link: "/login",
  },
  {
    id: 4,
    name: "Regisztráció",
    link: "/register",
  },
];

export const NavlinksLogin = [
  {
    id: 1,
    name: "Főoldal",
    link: "/",
  },
  {
    id: 2,
    name: "Bérautók",
    link: "/carlist"
  },

  {
    id: 5,
    name: "Foglalás",
    link: "/foglalas",
  },
  {
    id: 6,
    name: "Adatmódosítás",
    link: "/modositas",
  },
  {
    id: 7,
    name: "Rendeléseim",
    link: "/rendelesek",
  },
];
export const Navlinks2 = [
  {
    id: 1,
    name: "Főoldal",
    link: "/",
  },
  {
    id: 2,
    name: "Bérautók",
    link: "/carlist"
  },

  {
    id: 5,
    name: "Foglalás",
    link: "/foglalas",
  },
  {
    id: 6,
    name: "Adatmódosítás",
    link: "/modositas",
  },
];



const Navbar = () => {
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

  const kilepes = () => {
    sessionStorage.removeItem('id'); // törli a kilépéskor a listaidt
    navigate('/');
    update;
    
  }

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    update;

  };

  return (
    <div
      className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">Autó Kölcsönzés</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {
                // ha nincs belépve
                !listaid ?
                  <>
                    {Navlinks.map(({ id, name, link }) => (
                      <li key={id} className="py-4">
                        <a 
                          href={link}
                          className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500  "
                        >
                          {name}
                        </a>
                      </li>

                    ))}
                  </>
                  :
                  // Ha be van lépve
                  <>
                    {NavlinksLogin.map(({ id, name, link }) => (
                      <li key={id} className="py-4">
                        <a
                          href={link}
                          className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500  "
                        >
                          {name}
                        </a>
                      </li>

                    )

                    )

                    }

                    <li>
                      {/* <a onClick={()=>{kilepes(); navigate('/')}} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Kilépés</a> */}
                      <Link to="/" onClick={kilepes} className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500  ">Kilépés</Link>
                    </li>
                    <li>
                      {/* <a onClick={()=>{kilepes(); navigate('/')}} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Kilépés</a> */}
                      <Link to="/ugyfeladatok" className=" text-lg font-medium  hover:text-red-600 py-2 hover:border-b-2 hover:border-red-600 transition-colors duration-500  ">{nev}</Link>
                    </li>
                  </>
              }


            </ul>

          </nav>
          <div className="flex items-center gap-4 md:hidden ">
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}

          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
