import Header from "../Header";
import Footer from "../Footer";
import TagLink from "../TagLink";
import { useRouter } from "next/router";

const LayoutMain = ({ children }) => {
    const router = useRouter();

    return (
        <>
            {
                router.pathname !== "/login" ?
                <>
                    <Header />
                    <section>
                        <TagLink />
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