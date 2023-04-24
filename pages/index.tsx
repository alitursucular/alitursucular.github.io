import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { alitursucularGithubData } from "@/lib/alitursucularGithubData";
import { QueryKeysEnum } from "@/types/queryKeys";
import Repos from "@/components/Repos";
import Home from "@/components/Home";

// const inter = Inter({ subsets: ["latin"] });

const App = () => {
    return (
        <Layout home>
            <Home />
            {/* <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>pages/index.tsx</code>
                </p>
            </div> */}
            <Repos />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA], alitursucularGithubData);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default App;
