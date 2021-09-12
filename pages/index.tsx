import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {useVod, useVodDetail} from "../hooks/useVod";
import {useCallback, useContext, useEffect, useState} from "react";
import {CommonResponse, Vod, VodDetail} from "../types";
import Image from "next/image";
import {Pagination, Spin} from "antd";
import {GlobalCxt} from "./_app";
import Link from 'next/link'
import useSwr from "swr";
import {get} from "../utils";

type VodAndDetail = Vod & {
    vod_pic: string
}

const Item = ({img, id, title}: { img: string, id: number, title: string }) => {
    return <Link href={`/${id}`} passHref={true}>
        <div className={'flex flex-col justify-center items-center px-1 cursor-pointer'}>
            <Image src={img} alt={title} width={170} height={240} className={'object-cover'}/>
            <div className={'truncate w-40 text-center text-xl my-2 mb-10'}>{title}</div>
        </div>
    </Link>
}

export const getStaticProps: GetStaticProps = async (context) => {
    let vod: CommonResponse<Vod> = await get(`https://apihjzy.com/api.php/provide/vod/?ac=list&pg=1`)
    let vodDetail: CommonResponse<VodDetail> = await get(`https://apihjzy.com/api.php/provide/vod/?ac=detail&ids=${vod.list.map(i => i.vod_id)}`)

    let vodDataInit: VodAndDetail[] = vod.list.map(i => {
        let detail = vodDetail.list.find(j => j.vod_id === i.vod_id)
        return {...i, vod_pic: detail?.vod_pic || ''}
    })

    return {
        props: {
            fallback: {
                vodDataInit
            }
        }, // will be passed to the page component as props
    }
}

const Home: NextPage = ({vodDataInit}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const global = useContext(GlobalCxt)
    //当前页
    const [currPage, setCurrPage] = useState(1)
    const {vod, isLoading} = useVod(currPage, global.tid)
    const [total, setTotal] = useState(vod?.total || 0)
    const {vodDetail} = useVodDetail(vod?.list.map(i => i.vod_id))
    const [vodData, setVodData] = useState<VodAndDetail[]>(vodDataInit)

    const handleChangePage = useCallback((v) => {
        setCurrPage(v)
    }, [])

    useEffect(() => {
        if (!vod) return
        setTotal(vod?.total || 0)
    }, [vod, vod?.total])

    useEffect(() => {
        if (!vod || !vodDetail) return

        let res: VodAndDetail[] = vod.list.map(i => {
            let detail = vodDetail.list.find(j => j.vod_id === i.vod_id)
            return {...i, vod_pic: detail?.vod_pic || ''}
        })
        setVodData(res)
    }, [vod, vodDetail])

    // if (isLoading) {
    //     return <div className={'text-center'}><Spin/></div>
    // }

    return <div>
        <div className={'grid grid-cols-2 md:grid-cols-5'}>
            {vodData?.map(i => <Item id={i.vod_id} img={i.vod_pic} title={i.vod_name} key={i.vod_id}/>)}
        </div>

        {/* 分页*/}
        <Pagination showQuickJumper current={currPage} pageSize={20} showSizeChanger={false} total={total}
                    onChange={handleChangePage}/>
    </div>;
}

export default Home
