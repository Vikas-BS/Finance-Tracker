import { createContext , useContext,useState,useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const [theme , setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect (() =>{
        localStorage.setItem('theme',theme);
        const root = document.body;
        if(theme === 'dark'){
            root.classList.add('dark');
        }else{
            root.classList.remove('dark');
        }

    },[theme]);
    const toogleTheme = () =>{
        setTheme(prev =>(prev === 'light' ? 'dark' : 'light'))
    }

    return(
        <UserContext.Provider value={{user , setUser ,theme ,toogleTheme }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);