import type {AppProps} from 'next/app'
import Head from "next/head";
import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css";
import MyLayout from "../components/MyLayout";
import React, {useState} from "react";

export const GlobalCxt = React.createContext<{ tid: number|undefined, setTid: (i: number|undefined) => void }>({
    tid:undefined,
    setTid: () => {}
})

function MyApp({Component, pageProps}: AppProps) {
    const [tid, setTid] = useState<number>()

    return <GlobalCxt.Provider value={{tid, setTid}}>
        <Head>
            <title>猫视频</title>
        </Head>
        <MyLayout>
            <Component {...pageProps} />
        </MyLayout>
    </GlobalCxt.Provider>
}

export default MyApp
