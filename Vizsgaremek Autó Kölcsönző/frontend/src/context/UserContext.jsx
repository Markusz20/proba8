import { useState, createContext } from "react";

const UserContext=createContext();

export const UserProvider=({children})=>{
    const [refresh, setRefresh]=useState(false);

    const update=()=>{
        setRefresh(prev=>!prev); // az előző állapotot tagadjuk megváltoztatjuk az előzőre
    }
     const logout=()=>{
        sessionStorage.removeItem('id');
        update(); // ha valaki kilép akkor a refresh értéke megváltozik és az oldal újra módosul és betölti
     }

     
    
    return<UserContext.Provider value ={{refresh,update,logout}}>{children}</UserContext.Provider>
}

export default UserContext;