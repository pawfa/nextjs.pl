import '../styles/globals.css'
import {Analytics} from "./components/Analytics";
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <html lang="en">
        <head>
            <title>Next.js PL</title>
            <meta name="description" content="Nextjs.pl"/>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
            <script dangerouslySetInnerHTML={{__html:`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', "${GA_TRACKING_ID}");
              `}}>
            </script>
        </head>
        <body>{children}</body>
        <Analytics/>
        </html>
    );
}