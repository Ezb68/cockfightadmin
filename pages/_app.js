import Script from 'next/script'
// import '@/styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.css';
// import '@/public/assets/css/fontawesome.min.css'
import '@/public/assets/css/hover-min.css'
import '@/public/assets/css/daterangepicker.css'
import '@/public/assets/scss/style.scss'
import '@/public/assets/css/animate.css'
import '@/public/assets/slick/slick.css'
import '@/public/assets/fonts/fontstyle.css'
import '@/public/assets/css/flag-icons.min.css'
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutMain from "../components/layouts";
import { CookiesProvider } from 'react-cookie';

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
    useEffect(() => {
        if (typeof document !== undefined) {
            //import js file
            require('@/public/assets/js/all.min.js')
            require('@/public/assets/js/bootstrap.bundle.min.js')
            require('@/public/assets/js/jquery.min.js')
            // @ts-ignore
            window.$ = window.jQuery = $;
            require('@/public/assets/slick/slick.js')
            require('@/public/assets/wow/wow.min.js')
            require('@/public/assets/js/daterangepicker.min.js')
        }
    }, []);
    return <>
        <CookiesProvider>
            <LayoutMain>
                <Component {...pageProps} />
            </LayoutMain>
        </CookiesProvider>
    </>
}
