/* eslint-disable react/no-children-prop */
import Tag, { TagsWrapper } from "@/components/Tag";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./Readme.module.scss";

type Readme = Pick<IAlitursucularGithubDataResponse, "topics" | "readme">;

const Readme: React.FC<Readme> = ({ readme, topics }) => (
    <section className={styles.readme}>
        <Container>
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <article>
                        <TagsWrapper>
                            {topics.map((topic, i) => (
                                <Tag key={Math.random() * i}>{topic}</Tag>
                            ))}
                        </TagsWrapper>
                        <div className={styles.readme_markdownStyles}>
                            <ReactMarkdown
                                children={readme.data}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            />
                        </div>
                    </article>
                </Col>
            </Row>
        </Container>
    </section>
);

export default Readme;
