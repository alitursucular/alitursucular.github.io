import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HoverImage from "@/components/HoverImage";
import original from "@/public/images/original.png";
import pixelated from "@/public/images/pixelated.png";
import styles from "./About.module.scss";

const About: React.FC = () => (
    <section id="about" className={styles.about}>
        <Container>
            <Row>
                <Col lg={6}>
                    <div className={styles.about_infoWrapper}>
                        <h3 className={styles.about_infoWrapper_title} data-shadow="Who am I?">
                            Who am I?
                        </h3>
                        <p className={styles.about_infoWrapper_content}>
                            I am a Senior Software Engineer in London, UK. I specialise in JavaScript-centric web
                            development. I am operating under my limited company,{" "}
                            <a href="https://pineconesoftware.co.uk/" target="_blank" rel="noopener">
                                Pinecone Software Limited
                            </a>
                            . I provide contract, freelance and project-based web services. I love to observe, research,
                            think, and solve problems and output great work that is excellent in design and
                            functionality. I am also a manufacturing enthusiast, skier, and guitarist. <br />
                            <br />
                            Education: Bachelor’s degree in Mechatronics Engineering and a master’s degree in Business
                            Administration (MBA).
                        </p>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className={styles.about_revealMeWrapper}>
                        <div className={styles.about_revealMeWrapper_tab}>
                            <span>Hover the image to reveal me!</span>
                        </div>
                        <div className={styles.about_revealMeWrapper_hoverImage}>
                            <HoverImage pixelatedSrc={pixelated} originalSrc={original} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);

export default About;
