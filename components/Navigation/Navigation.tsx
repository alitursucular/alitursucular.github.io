import Link from "next/link";
import styles from "./Navigation.module.css";

const Navigation: React.FC<{ home?: boolean }> = ({ home }) => {
    // TODO: Remove {} and return, just use ()

    return (
        // TODO: opaque diye bir class var header icin, scrollda gelip gidiyor
        <nav className={styles.navWrapper}>
            <a className={styles.mobileBtn} href="#nav-wrap" title="Show navigation">
                Show navigation
            </a>
            <a className={styles.mobileBtn} href="#home" title="Hide navigation">
                Hide navigation
            </a>
            <ul className={styles.nav}>
                {/* TODO: Bu current olayina bak */}
                <li className={styles.current}>
                    <Link className={styles.smoothscroll} href={`${home ? "" : "../"}#home`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={styles.smoothscroll} href={`${home ? "" : "../"}#repos`}>
                        Repos
                    </Link>
                </li>
                <li>
                    <Link className={styles.smoothscroll} href={`${home ? "" : "../"}cv`}>
                        CV
                    </Link>
                </li>
                <li>
                    <Link className={styles.smoothscroll} href={`${home ? "" : "../"}#about`}>
                        About
                    </Link>
                </li>
                <li>
                    <Link className={styles.smoothscroll} href={`${home ? "" : "../"}#contact`}>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
