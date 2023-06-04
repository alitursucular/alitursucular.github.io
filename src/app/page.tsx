import { dehydrate } from "@tanstack/react-query";
import Layout from "@/components/CustomLayout";
import Landing from "@/components/Landing";
import Repos from "@/components/Repos";
import About from "@/components/About";
import Hydrate from "@/utils/hydrateClient";
import getQueryClient from "@/utils/getQueryClient";
import { QueryKeysEnum } from "./types/queryKeys";
import { alitursucularGithubData } from "@/lib/alitursucularGithubData";

const Homepage = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery([QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA], alitursucularGithubData);
    const dehydratedState = dehydrate(queryClient);

    return (
        <Layout home>
            <Landing />
            <Hydrate state={dehydratedState}>
                <Repos />
            </Hydrate>
            <About />
        </Layout>
    );
};

export default Homepage;
