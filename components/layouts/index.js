import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import MenuMobile from "../MenuMobile";

import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import {dispatch} from "@/store/account";
import {getCookie} from "cookies-next";

const LayoutMain = ({ children }) => {
    const router = useRouter();
    const token = getCookie('accessToken')
    useEffect(() => {
        if(token){
            dispatch({type: 'SET_USER_LOGIN'})
        }
    }, [token]);
    
    return (
        <>
            {
                router.pathname !== "/login" ?
                <>
                    <Header />
                    <section>
                        <Menu />
                        <MenuMobile />
                        {children}
                    </section>
                    <Footer />
                </>
                :
                <>
                <section>
                    {children}
                </section>
                </>
                
            }
            
        </>

    )
}

export default LayoutMain;
