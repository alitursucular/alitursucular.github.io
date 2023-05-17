import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaRegFilePowerpoint, FaLinkedin, FaAngleDown } from "react-icons/fa";
import LetterReveal from "../LetterReveal";
import styles from "./Landing.module.scss";

const ParticlesBg = dynamic(() => import("particles-bg"), {
    ssr: false
});

const Landing: React.FC = () => {
    // TODO: Buraya bir sey gelmezse {} yok et and remove the return keyword.

    return (
        <section id="home" className={styles.home}>
            <ParticlesBg type="thick" bg={true} />
            <div className={`row ${styles.banner}`}>
                <div className={styles.bannerText}>
                    <h1 className={styles.headline}>Hello stranger.</h1>
                    <h3>
                        <span>
                            <LetterReveal>
                                I am a Senior Software Engineer in London, UK. I specialised in JavaScript-centric web
                                development. Check out the links below and take a look at my Github.
                            </LetterReveal>
                        </span>
                    </h3>
                    <ul className={styles.social}>
                        <li>
                            <Link href="/CV">
                                <FaRegFilePowerpoint size={18} />
                                CV
                            </Link>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/alitursucular/" target="_blank">
                                <FaLinkedin size={18} />
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.scrolldown}>
                <Link href="#repos">
                    <FaAngleDown className={styles.icon} />
                </Link>
            </div>
        </section>
    );
};

export default Landing;
