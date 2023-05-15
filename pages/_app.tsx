import React from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Raleway, IBM_Plex_Sans, VT323 } from "next/font/google";
import "normalize.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "@/styles/globals.scss";

const raleway = Raleway({ subsets: ["latin"] });

const ibmSans = IBM_Plex_Sans({
    weight: "700",
    subsets: ["latin"]
});

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--VT323-font",
    display: "swap"
});

export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <style jsx global>{`
                    :root {
                        --raleway-font: ${raleway.style.fontFamily};
                        --ibmSans-font: ${ibmSans.style.fontFamily};
                        --vt323-font: ${vt323.style.fontFamily};
                    }
                `}</style>
                <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
