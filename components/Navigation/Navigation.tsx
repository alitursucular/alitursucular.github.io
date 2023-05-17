import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navigation.module.scss";

const Navigation: React.FC<{ home?: boolean }> = ({ home }) => {
    const router = useRouter();
    const [path, setPath] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        router.isReady && setPath(router.asPath);
    }, [router]);

    return (
        <nav className={styles.navWrapper}>
            <ul className={styles.nav}>
                <li className={`${styles.nav_li} ${path === "/" ? styles.nav_li_current : ""}`}>
                    <Link href={home ? "" : "../"}>Home</Link>
                </li>
                <li className={`${styles.nav_li} ${path === "/#repos" ? styles.nav_li_current : ""}`}>
                    <Link href={`${home ? "" : "../"}#repos`}>Repos</Link>
                </li>
                <li className={styles.nav_li}>
                    <a href="/alitursucular-senior-frontend-engineer-cv.pdf" rel="noopener noreferrer">
                        CV
                    </a>
                </li>
                <li className={`${styles.nav_li} ${path === "/#about" ? styles.nav_li_current : ""}`}>
                    <Link href={`${home ? "" : "../"}#about`}>About</Link>
                </li>
                <li className={`${styles.nav_li} ${path === "/#contact" ? styles.nav_li_current : ""}`}>
                    <Link href={`${home ? "" : "../"}#contact`}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
