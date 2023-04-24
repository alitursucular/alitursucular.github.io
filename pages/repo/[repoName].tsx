import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/types/queryKeys";
import { BeatLoader } from "react-spinners";
import { alitursucularGithubDataByName, useGithubDataByName } from "@/lib/alitursucularGithubData";
import Layout from "../../components/layout";

const Repo: React.FC = () => {
    const router = useRouter();
    const repoName = typeof router.query?.repoName === "string" ? router.query.repoName : "";

    const { data: repo, isLoading, isError } = useGithubDataByName(repoName as string);

    if (isLoading) {
        return <BeatLoader color="#36d7b7" />;
    }

    if (isError) {
        router.push("/404");
        return null;
    }

    return (
        <Layout>
            <Head>
                <title>{repo?.name}</title>
            </Head>
            <article>
                <h1>{repo?.topics}</h1>
                <div>
                    <p>{repo?.visibility}</p>
                </div>
            </article>
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
