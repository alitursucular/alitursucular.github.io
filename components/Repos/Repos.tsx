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
    const { data: repos, error, isLoading, isError } = useFetchGitHub();

    if (isLoading) {
        return (
            <div className={styles.isLoading}>
                <BeatLoader color="black" size={32} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.isError}>
                <p>
                    <b>Something went wrong while getting my repository data.</b>
                </p>
                <ul>
                    <li>Error: {error.message}</li>
                    <li>
                        Why not look at my{" "}
                        <a href="https://github.com/alitursucular" target="_blank" rel="noopener">
                            GitHub
                        </a>{" "}
                        while I fix the error?
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <section id="repos" className={styles.repos}>
            <Container>
                <Row>
                    <Col>
                        <div className={styles.repoColumns}>
                            {repos?.map((repo: IAlitursucularGithubDataResponse, i: number) => (
                                <RepoCard key={i} repo={repo} />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Repos;
