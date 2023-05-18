import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaRegFilePowerpoint, FaLinkedin, FaAngleDown } from "react-icons/fa";
import LetterReveal from "../LetterReveal";
import styles from "./Landing.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const ParticlesBg = dynamic(() => import("particles-bg"), {
    ssr: false
});

const Landing: React.FC = () => (
    <section id="home" className={styles.landing}>
        <ParticlesBg type="thick" bg={true} />
        <Container fluid>
            <Row>
                <Col>
                    <h1 className={styles.landing_headline}>Hello stranger.</h1>
                    <h3 className={styles.landing_aboutText}>
                        <span>
                            <LetterReveal>
                                I am a Senior Software Engineer in London, UK. I specialised in JavaScript-centric web
                                development. Check out the links below and take a look at my Github.
                            </LetterReveal>
                        </span>
                    </h3>
                    <ul className={styles.landing_links}>
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
                </Col>
            </Row>
        </Container>
        <div className={styles.landing_scrolldown}>
            <Link href="#repos">
                <FaAngleDown className={styles.icon} />
            </Link>
        </div>
    </section>
);

export default Landing;
