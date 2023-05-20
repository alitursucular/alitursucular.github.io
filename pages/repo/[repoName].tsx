import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryKeysEnum } from "@/types/queryKeys";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { alitursucularGithubDataByName, useGithubDataByName } from "@/lib/alitursucularGithubData";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "@/components/layout";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Readme from "@/components/Readme";
import BackToHome from "@/components/BackToHome/BackToHome";

const Repo: React.FC = () => {
    const router = useRouter();
    const repoName = typeof router.query?.repoName === "string" ? router.query.repoName : "";

    const { data: repo, isLoading, isError } = useGithubDataByName(repoName as string);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (isError) {
        router.push("/404");
        return null;
    }

    return (
        <Layout home={false}>
            <Head>
                <title>{repo.name}</title>
            </Head>
            <Readme readme={repo.readme} topics={repo.topics} />
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <BackToHome />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Repo;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const repoName = context.params?.repoName as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA_BY_NAME, repoName], () =>
        alitursucularGithubDataByName(repoName)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};
