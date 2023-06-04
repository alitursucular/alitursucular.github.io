"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navigation.module.scss";

const Navigation: React.FC<{ home: boolean }> = ({ home }) => {
    const router = useRouter();
    const [path, setPath] = React.useState<string>("");

    const homepageHashes = ["", "repos", "about", "contact"];

    // hashChangeHandler is only meant for the homepage. Its execution is controlled by the home (prop) flag.
    const hashChangeHandler = React.useCallback(() => {
        const hash = window.location.hash.slice(1);
        if (homepageHashes.includes(hash)) {
            setPath(window.location.hash);
            router.push(window.location.hash);
        } else {
            setPath("");
            router.push("/");
        }
    }, []);

    React.useEffect(() => {
        if (home) {
            window.addEventListener("hashchange", hashChangeHandler);

            hashChangeHandler();

            return () => {
                window.removeEventListener("hashchange", hashChangeHandler);
            };
        }
    }, []);

    return (
        <header>
            <nav className={styles.navWrapper}>
                <ul className={styles.nav}>
                    <li className={`${styles.nav_li} ${path === "" ? styles.nav_li_current : ""}`}>
                        <Link href="/" onClick={() => setPath("")}>
                            Home
                        </Link>
                    </li>
                    <li className={`${styles.nav_li} ${path === "#repos" ? styles.nav_li_current : ""}`}>
                        <Link href="#repos" onClick={() => setPath("#repos")}>
                            Repos
                        </Link>
                    </li>
                    <li className={styles.nav_li}>
                        <a href={`/${process.env.NEXT_PUBLIC_CV_FILENAME}`} rel="noopener noreferrer">
                            CV
                        </a>
                    </li>
                    <li className={`${styles.nav_li} ${path === "#about" ? styles.nav_li_current : ""}`}>
                        <Link href="#about" onClick={() => setPath("#about")}>
                            About
                        </Link>
                    </li>
                    <li className={`${styles.nav_li} ${path === "#contact" ? styles.nav_li_current : ""}`}>
                        <Link href="/#contact" onClick={() => setPath("#contact")}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;
