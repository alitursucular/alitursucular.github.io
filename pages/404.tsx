import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import BackToHome from "@/components/BackToHome/BackToHome";
import errorSrc from "@/public/images/error.png";

const Custom404 = () => (
    <Container>
        <Row>
            <Col lg={{ span: 6, offset: 3 }}>
                <h1>404 - Page Not Found</h1>
                <BackToHome />
                <Image src={errorSrc} alt="error image" />
            </Col>
        </Row>
    </Container>
);

export default Custom404;
