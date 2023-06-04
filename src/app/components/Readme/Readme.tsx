"use client";

/* eslint-disable react/no-children-prop */
import { Container, Row, Col } from "react-bootstrap";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Tag, { TagsWrapper } from "@/components/Tag";
import ReactMarkdown from "react-markdown";
import { useGithubDataByName } from "@/lib/alitursucularGithubData";
import LoadingComponent from "../LoadingComponent";
import styles from "./Readme.module.scss";

const Readme: React.FC<{ repoName: string }> = ({ repoName }) => {
    const { data: repo, isLoading, isError } = useGithubDataByName(repoName);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (isError) {
        notFound();
    }

    return (
        <section className={styles.readme}>
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <article>
                            {repo && (
                                <TagsWrapper>
                                    {repo.topics.map((topic, i) => (
                                        <Tag key={Math.random() * i}>{topic}</Tag>
                                    ))}
                                </TagsWrapper>
                            )}
                            <div className={styles.readme_markdownStyles}>
                                <ReactMarkdown
                                    children={repo?.readme.data ?? ""}
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
};

export default Readme;
