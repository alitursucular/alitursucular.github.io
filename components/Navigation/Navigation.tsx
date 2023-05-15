import React from "react";
import Link from "next/link";
import styles from "./Navigation.module.scss";
import { useRouter } from "next/router";

const Navigation: React.FC<{ home?: boolean }> = ({ home }) => {
    const router = useRouter();
    const [navBg, setNavBg] = React.useState(false);

    const changeNavBg = () => {
        window.scrollY >= 100 ? setNavBg(true) : setNavBg(false);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", changeNavBg);

        return () => {
            window.removeEventListener("scroll", changeNavBg);
        };
    }, []);

    return (
        <nav
            className={styles.navWrapper}
            style={home && navBg ? { transition: "background-color 0.3s", backgroundColor: "black" } : {}}
        >
            {/* <a className={styles.mobileBtn} href="#nav-wrap" title="Show navigation">
                Show navigation
            </a>
            <a className={styles.mobileBtn} href="#home" title="Hide navigation">
                Hide navigation
            </a> */}
            <ul className={styles.nav}>
                <li className={router.asPath == "/" ? styles.current : ""}>
                    <Link href={home ? "" : "../"}>Home</Link>
                </li>
                <li className={router.asPath === "/#repos" ? styles.current : ""}>
                    <Link href={`${home ? "" : "../"}#repos`}>Repos</Link>
                </li>
                <li>
                    <a href="/alitursucular-senior-frontend-engineer-cv.pdf" rel="noopener noreferrer">
                        CV
                    </a>
                </li>
                <li className={router.asPath === "/#about" ? styles.current : ""}>
                    <Link href={`${home ? "" : "../"}#about`}>About</Link>
                </li>
                <li className={router.asPath === "/#contact" ? styles.current : ""}>
                    <Link href={`${home ? "" : "../"}#contact`}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
