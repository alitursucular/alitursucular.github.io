import React from "react";
// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import Link from "next/link";
// import styles from "@/styles/Home.module.css";
// import Layout from "@/components/layout";
// import { GetStaticProps } from "next";
// import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useFetchGitHub } from "@/lib/alitursucularGithubData";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
// import { QueryKeysEnum } from "@/types/queryKeys";
import styles from "./Repos.module.css";
import { useInView } from "react-intersection-observer";

const Repos: React.FC = () => {
    const { data: repos, isLoading } = useFetchGitHub();
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0
    });

    React.useEffect(() => {
      if(inView) {
        alert("yeeeyy");
      }
    }, [inView])
    

    if (isLoading) return <div>Loading...</div>;

    return (
        <section id="repos" className={styles.repos}>
            <div ref={ref}>
                <ul>
                    {repos?.map((repo: IAlitursucularGithubDataResponse) => (
                        <li key={repo.name} className={styles.description}>
                            <Link href={`/repo/${repo.name}`}>
                                {repo.name}
                                <p>some more data here!!!</p>
                            </Link>
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Repos;
