import Document, { Html, Head, Main, NextScript } from 'next/document'
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

class MyDocument extends Document {

  render() {
    return (
      <Html lang="pl">
        <Head>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
            <script dangerouslySetInnerHTML={{__html:`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', "${GA_TRACKING_ID}");
              `}}>
            </script>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
