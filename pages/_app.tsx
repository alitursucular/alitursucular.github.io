import React from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";
import { Raleway, IBM_Plex_Sans } from "next/font/google";
// import "@/styles/globals.css";

const raleway = Raleway({ subsets: ["latin"] });
const ibmSans = IBM_Plex_Sans({
    weight: "700",
    subsets: ["latin"]
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
                    }
                `}</style>
                <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
