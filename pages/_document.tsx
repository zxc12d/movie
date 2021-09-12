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
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta
                        name="keywords"
                        content="电影文案网,文案网"
                    />
                    <meta
                        name="description"
                        content="电影文案网,文案，电影"
                    />
                    <meta name="baidu-site-verification" content="code-OD1Ep4Bm7W" />
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