/* eslint-disable react/no-children-prop */
import Link from "next/link";
import { useRouter } from "next/router";
import Tag, { TagsWrapper } from "@/components/Tag";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
import { FaCaretRight } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/types/queryKeys";
import { alitursucularGithubDataByName, useGithubDataByName } from "@/lib/alitursucularGithubData";
import { BeatLoader } from "react-spinners";
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
                            <ReactMarkdown children={readme.data} remarkPlugins={[remarkGfm]} />
                        </div>
                    </article>
                </Col>
            </Row>
        </Container>
    </section>
);

export default Readme;
