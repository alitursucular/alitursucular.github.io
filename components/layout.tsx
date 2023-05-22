import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";

export const siteTitle = "Ali Tursucular GitHub blog website";

const Layout: React.FC<{ children: React.ReactNode; home: boolean }> = ({ children, home }) => {
    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <meta name="og:title" content={siteTitle} key="title" />
                <meta
                    name="description"
                    content="Hello stranger. I am a Senior Software Engineer in London, UK. Visit my site to explore more about me!"
                />
                <meta
                    property="og:description"
                    content="Hello stranger. I am a Senior Software Engineer in London, UK. Visit my site to explore more about me!"
                    key="description"
                />
                <meta property="og:url" content="https://alitursucular.github.io/" />
                <meta property="og:image" content="/images/alitursucular-github-blog-social-image.png" />
            </Head>
            <Navigation home={home} />
            <main>{children}</main>
            <Footer home={home} />
        </>
    );
};

export default Layout;
