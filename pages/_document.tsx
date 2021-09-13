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
                        content="电影,日韩,欧美,猫视频"
                    />
                    <meta
                        name="description"
                        content="电影"
                    />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P0J47625QQ"/>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                      window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-P0J47625QQ');
                    `
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