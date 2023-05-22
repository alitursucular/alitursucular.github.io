import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { VT323 } from "next/font/google";
import "normalize.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "@/styles/globals.scss";

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--VT323-font",
    display: "swap"
});

export const siteTitle = "Ali Tursucular GitHub blog website";

export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <style jsx global>{`
                    :root {
                        --vt323-font: ${vt323.style.fontFamily};
                    }
                `}</style>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="author" content="Ali Tursucular" />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="en_GB" />
                    <link rel="icon" href="/pinecone-software-limited-favicon.ico" />
                    <meta name="robots" content="index, follow" />
                </Head>
                <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
