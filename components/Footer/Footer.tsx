import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaLinkedin, FaGithub, FaAngleUp, FaFilePdf, FaRegCopyright } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Footer.module.scss";

const CopyToClipboard = dynamic(() => import("@/components/CopyToClipboard"), { ssr: false });

const Footer: React.FC = () => (
    <footer id="contact" className={styles.footer}>
        <Container>
            <Row>
                <Col>
                    <div>
                        <h3>Let&apos;s get in touch!</h3>
                        <div className={styles.footer_contacts}>
                            <div className={styles.footer_contacts_email}>
                                <CopyToClipboard text="ali@pineconesoftware.co.uk" />
                                <a href="mailto:ali@pineconesoftware.co.uk">ali@pineconesoftware.co.uk</a>
                            </div>
                            <ul className={styles.footer_contacts_links}>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/alitursucular/"
                                        target="_blank"
                                        title="LinkedIn profile"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedin size={24} />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/alitursucular"
                                        target="_blank"
                                        title="GitHub profile"
                                        rel="noopener noreferrer"
                                    >
                                        <FaGithub size={24} />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/alitursucular-senior-frontend-engineer-cv.pdf"
                                        title="CV"
                                        rel="noopener noreferrer"
                                    >
                                        <FaFilePdf size={24} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer_copyright}>
                            <FaRegCopyright size={12} style={{ marginRight: 8 }} /> {new Date().getFullYear()} Ali
                            Tursucular - Designed by me (no sh*t, Sherlock)
                        </div>
                    </div>
                    <div className={styles.footer_goToTop}>
                        <Link href="#home" title="go to top">
                            <FaAngleUp size={48} className={styles.footer_goToTop_anchor} />
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;
