import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico"/>
                    <meta
                        name="keywords"
                        content="AV,av,女优,日本,欧美"
                    />
                    <meta
                        name="description"
                        content="AV,av,女优,日本,欧美"
                    />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            <!-- Global site tag (gtag.js) - Google Analytics -->
                            <script async src="https://www.googletagmanager.com/gtag/js?id=G-P0J47625QQ"></script>
                            <script>
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                            
                              gtag('config', 'G-P0J47625QQ');
                            </script>`
                    }}/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument