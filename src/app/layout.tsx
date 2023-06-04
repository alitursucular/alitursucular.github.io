import { Metadata } from "next";
import ReactQueryProvider from "@/utils/reactQueryProvider";
import { VT323 } from "next/font/google";
import "normalize.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "@/globals.scss";

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--VT323-font",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Ali Tursucular GitHub blog website",
    description:
        "Hello stranger. I am a Senior Software Engineer in London, UK. Visit my site to explore more about me!",
    authors: [{ name: "Ali Tursucular", url: "https://github.com/alitursucular" }],
    robots: "index, follow",
    openGraph: {
        title: "Ali Tursucular GitHub blog website",
        description:
            "Hello stranger. I am a Senior Software Engineer in London, UK. Visit my site to explore more about me!",
        url: "https://alitursucular.github.io/",
        images: "/images/alitursucular-github-blog-social-image.png",
        locale: "en_GB",
        type: "website"
    }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en" className={vt323.className}>
        <body>
            <ReactQueryProvider>
                <main>{children}</main>
            </ReactQueryProvider>
        </body>
    </html>
);

export default RootLayout;
