import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";

export const siteTitle = "Ali Tursucular GitHub blog website";

interface ILayout {
    children: React.ReactNode;
    home: boolean;
    hasHeader?: boolean;
    hasFooter?: boolean;
}

const Layout: React.FC<ILayout> = ({ children, home, hasHeader = true, hasFooter = true }) => {
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
            {hasHeader && <Navigation home={home} />}
            <main>{children}</main>
            {hasFooter && <Footer home={home} />}
        </>
    );
};

export default Layout;
