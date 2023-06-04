"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaRegFilePowerpoint, FaLinkedin, FaAngleDown } from "react-icons/fa";
import LetterReveal from "../LetterReveal";
import styles from "./Landing.module.scss";
import { Col, Container, Row } from "react-bootstrap";

// https://github.com/lindelof/particles-bg/issues/18
const ParticlesBg = dynamic(() => import("particles-bg"), {
    ssr: false
});

/**
 * Landing component (a.k.a The "home" tab)
 * @returns Landing function component
 */
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
                            <a
                                href={`/${process.env.NEXT_PUBLIC_CV_FILENAME}`}
                                title="Ali Tursucular CV"
                                rel="noopener noreferrer"
                            >
                                <FaRegFilePowerpoint size={18} />
                                CV
                            </a>
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
                <FaAngleDown size={42} className={styles.icon} />
            </Link>
        </div>
    </section>
);

export default Landing;
