import React from "react";
import { useSpring, animated, config } from "react-spring";
import { FaLinkedin, FaGithub, FaAngleUp } from "react-icons/fa";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer: React.FC = () => {
    const fadeProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: config.gentle,
        delay: 200
    });

    return (
        <footer className={styles.footer}>
            <div className="row">
                <animated.div style={fadeProps} className="twelve columns">
                    <ul className={styles.socialLinks}>
                        <li>
                            <a href="https://www.linkedin.com/in/alitursucular/">
                                <FaLinkedin />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/alitursucular">
                                <FaGithub />
                            </a>
                        </li>
                    </ul>
                    <ul className={styles.copyright}>
                        <li>&copy; {new Date().getFullYear()} Ali Tursucular</li>
                        <li>
                            Design by{" "}
                            <a title="Styleshout" href="http://www.styleshout.com/">
                                Styleshout
                            </a>
                        </li>
                    </ul>
                </animated.div>

                <div id={styles.goTop}>
                    <Link className="smoothscroll" title="Back to Top" href="#home">
                        <FaAngleUp className={styles.icon} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
