"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "./BackToHome.module.scss";

const BackToHome: React.FC = () => (
    <Container>
        <Row>
            <Col lg={{ span: 6, offset: 3 }}>
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>{" "}
            </Col>
        </Row>
    </Container>
);

export default BackToHome;
