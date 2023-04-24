import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { FaRegFilePowerpoint, FaLinkedin } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import styles from "./Home.module.css";

const ParticlesBg = dynamic(() => import("particles-bg"), {
    ssr: false
});

const Home: React.FC = () => {
    const spring = useSpring({
        from: { opacity: 0, transform: "translateY(-50px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { duration: 1200 }
    });

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0
    });

    return (
        // TODO: opaque diye bir class var icin, scrollda gelip gidiyor
        <section id="home" className={styles.home}>
            <ParticlesBg type="circle" bg={true} />
            <div className={`row ${styles.banner}`}>
                <div className={styles.bannerText}>
                    <animated.div style={spring}>
                        <h1 className="responsive-headline">Nordic-Giant Project</h1>
                    </animated.div>
                    <animated.div style={spring}>
                        <h3>
                            I am a web development engineer and I use react and vue.js to develop pages. This project is
                            a resume template that can be used as the project home page or resume page.
                        </h3>
                    </animated.div>
                    <hr />
                    <animated.div style={spring}>
                        <ul className={styles.social}>
                            <li>
                                <Link href="/CV" className={`button ${styles.projectButton}`}>
                                    <FaRegFilePowerpoint />
                                    CV
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/alitursucular/"
                                    className={`button ${styles.linkedinButton}`}
                                    target="_blank"
                                >
                                    <FaLinkedin />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </animated.div>
                </div>
            </div>
            <p className={styles.scrolldown}>
                <Link className={styles.smoothscroll} href="#repos">
                    <i className="icon-down-circle"></i>
                </Link>
            </p>
        </section>
    );
};

export default Home;
