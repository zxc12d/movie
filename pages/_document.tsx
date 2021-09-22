import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.png" />
                    <meta name="keywords" content="电影,日韩,欧美,猫视频" />
                    <meta name="description" content="电影,电影免费在线观看" /> 
                    <meta name="referrer" content="never" />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-Y7Q509F5JE"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                      window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-Y7Q509F5JE');
                    `,
                        }}
                    />
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
