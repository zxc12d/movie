import {useCallback, useContext, useEffect, useState} from "react";
import useSwr from "swr";
import {fetcher, get} from "../utils";
import {CommonResponse, Vod} from "../types";
import {useVod} from "../hooks/useVod";
import {GlobalCxt} from "../pages/_app";
import {useRouter} from "next/router";

const MyHeader = () => {
    const global = useContext(GlobalCxt)
    const router = useRouter()

    const {vod, isError, isLoading} = useVod()
    // const [type, setType] = useState()
    const handleClickType = useCallback(async (tid) => {
        global.setTid(tid)
        await router.push('/')
    }, [global, router])

    const handleGoHome = useCallback(async () => {
        global.setTid(undefined)
        await router.push('/')
    }, [global, router])


    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return <div className={'md:w-2/3 mx-auto'}>
        <div onClick={handleGoHome} className={'text-5xl my-10 cursor-pointer'}>小草影院</div>
        <div className={'hidden md:grid md:grid-cols-7'}>
            {vod?.class.map(i =>
                <div
                    className={`py-3 px-2 mt-2 border w-40 text-center cursor-pointer text-xl font-bold ${global.tid === i.type_id ? 'bg-red-100' : ''}`}
                    key={i.type_id} onClick={() => handleClickType(i.type_id)}>{i.type_name}</div>
            )}
        </div>
    </div>
}

export default MyHeader;