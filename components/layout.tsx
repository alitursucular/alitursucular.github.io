import Head from "next/head";
import Image from "next/image";
// import styles from "./layout.module.scss";
// import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Footer from "./Footer";
import Navigation from "./Navigation";

export const siteTitle = "Ali Tursucular GitHub blog website";

const Layout: React.FC<{ children: React.ReactNode; home: boolean }> = ({ children, home }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{siteTitle}</title>
                <link rel="icon" href="/pinecone-software-limited-favicon.ico" />
                <meta
                    name="description"
                    content="Hello stranger. I am a Senior Software Engineer in London, UK. Visit my site to explore more about me!"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <Navigation home={home} />
            <main>{children}</main>
            <Footer home={home} />
        </>
    );
};

export default Layout;
