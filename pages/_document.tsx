import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-9D39SH9D7J"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-9D39SH9D7J');
                    `}
                </Script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
