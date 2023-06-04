import React from "react";
import { dehydrate } from "@tanstack/react-query";
import Layout from "@/components/CustomLayout";
import Readme from "@/components/Readme";
import BackToHome from "@/components/BackToHome";
import { alitursucularGithubDataByName } from "@/lib/alitursucularGithubData";
import Hydrate from "@/utils/hydrateClient";
import getQueryClient from "@/utils/getQueryClient";
import { QueryKeysEnum } from "@/types/queryKeys";

const RepoPage = async ({ params }: { params: { repoName: string } }) => {
    const { repoName } = params;

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery([QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA_BY_NAME, repoName], () =>
        alitursucularGithubDataByName(repoName)
    );

    const dehydratedState = dehydrate(queryClient);

    return (
        <>
            <Layout home={false}>
                <Hydrate state={dehydratedState}>
                    <Readme repoName={repoName} />
                </Hydrate>
                <BackToHome />
            </Layout>
        </>
    );
};

export default RepoPage;
