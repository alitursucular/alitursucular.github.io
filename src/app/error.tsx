"use client"

import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import BackToHome from "./components/BackToHome/BackToHome";
import errorSrc from "/public/images/error.png";
import Layout from "@/components/CustomLayout";

const Custom404 = () => (
    <Layout home={false} hasHeader={false} hasFooter={false}>
        <div style={{ display: "flex" }}>
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <h1>404 - Page Not Found</h1>
                        <BackToHome />
                        <Image
                            src={errorSrc}
                            sizes="100vw"
                            alt="error image"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    </Layout>
);

export default Custom404;
