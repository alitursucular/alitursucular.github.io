"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFetchGitHub } from "@/lib/alitursucularGithubData";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
import RepoCard from "./RepoCard";
import LoadingComponent from "@/components/LoadingComponent";
import styles from "./Repos.module.scss";

const Repos: React.FC = () => {
    const { data: repos, error, isLoading, isError } = useFetchGitHub();

    if (isLoading) {
        return <LoadingComponent />;
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
                        <a href="https://github.com/alitursucular" target="_blank" rel="noopener noreferrer">
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
