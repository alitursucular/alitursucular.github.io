import React from "react";
// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import Link from "next/link";
// import styles from "@/styles/Home.module.scss";
// import Layout from "@/components/layout";
// import { GetStaticProps } from "next";
// import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useFetchGitHub } from "@/lib/alitursucularGithubData";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { QueryKeysEnum } from "@/types/queryKeys";
import { BeatLoader } from "react-spinners";
import RepoCard from "./RepoCard";
import styles from "./Repos.module.scss";

const Repos: React.FC = () => {
    const { data: repos, isLoading } = useFetchGitHub();

    if (isLoading) {
        return <BeatLoader color="#36d7b7" />;
    }

    return (
        <section id="repos" className={styles.repos}>
            <Container>
                <Row>
                    <Col>
                        {/* {repos?.map(
                    (repo: IAlitursucularGithubDataResponse, i: number) =>
                        i % 2 === 0 && (
                            <Row key={`row-${i}`}>
                                <Col md={6}>
                                    <RepoCard repo={repo} />
                                </Col>
                                {i + 1 < repos.length && (
                                    <Col md={6}>
                                        <RepoCard repo={repos[i + 1]} />
                                    </Col>
                                )}
                            </Row>
                        )
                )} */}
                        <div className={styles.repoColumns}>
                            {/* <div> */}
                            {repos?.map((repo: IAlitursucularGithubDataResponse, i: number) => (
                                // <div key={i} className={styles.card}>
                                <RepoCard key={i} repo={repo} />
                                // </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Repos;
