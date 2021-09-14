import type {AppProps} from 'next/app'
import Head from "next/head";
import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css";
import MyLayout from "../components/MyLayout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Spin} from "antd";

export const GlobalCxt = React.createContext<{ tid: number | undefined, setTid: (i: number | undefined) => void }>({
    tid: undefined,
    setTid: () => {
    }
})

function MyApp({Component, pageProps}: AppProps) {
    const [tid, setTid] = useState<number>()
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setIsLoading(true)
            console.log('App is changing to: ', url)
        }
        const handleRouteFinish = (url: string) => {
            setIsLoading(false)
            console.log(`${url} finish`)
        }

        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteFinish)
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])


    return <GlobalCxt.Provider value={{tid, setTid}}>
        <Head>
            <title>猫视频</title>
        </Head>
        <MyLayout>
            {/*<div className={'text-center absolute inset-0 z-10 m-auto w-10 h-10 flex justify-center items-center'}>*/}
            {/*    <Spin/>*/}
            {/*</div>*/}
            {isLoading ? <div className={'text-center absolute inset-0 z-10 m-auto w-10 h-10 flex justify-center items-center'}>
                <Spin/>
            </div> : null }
            <Component {...pageProps} />
        </MyLayout>
    </GlobalCxt.Provider>
}

export default MyApp
