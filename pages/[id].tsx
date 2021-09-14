import ReactPlayer from "react-player";
import Image from "next/image";
import {useState} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {CommonResponse, Vod, VodDetail} from "../types";
import {get} from "../utils";

export const getStaticPaths: GetStaticPaths = async () => {
    let vod: CommonResponse<Vod> = await get(`/provide/vod/?ac=list`)
    vod?.list?.map(i => i.vod_id)
    let pages = vod?.list?.map(i => i.vod_id).splice(0, 50)
    let paths = pages?.map(i => ({params: {id: '' + i}}))

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let id = params!.id
    let res: CommonResponse<VodDetail> = await get(`/provide/vod/?ac=detail&ids=${id}`)
    let detail = res.list[0]

    return {
        props: {
            detail
        }
    }
}

interface PlayItem {
    name: string,
    url: string
}

const PlayList = ({list, setPlayUrl}: { list: PlayItem[], setPlayUrl: (i: string) => void }) => {
    const [currIndex, setCurrIndex] = useState<number>(0)

    return <div className={'flex flex-wrap mt-4'}>
        {list.map((i, index) =>
            <div key={index} onClick={() => {
                setCurrIndex(index)
                setPlayUrl(i.url)
            }} className={`border-2 border-gray-500 mr-2 mt-2 px-2 py-1 rounded-full hover:bg-blue-400 cursor-pointer
             ${currIndex === index ? 'bg-blue-300' : ''}`}>
                <span>{i.name}</span>
            </div>)}
    </div>
}

const computeUrl = (url: string | undefined) => {
    if (!url) return []
    let a = url.split('$$$')
    let res = []
    for (let u of a) {
        let tmp = u.split('#')?.map(i => {
            let tmp = i.split('$')
            return {name: tmp[0], url: tmp[1]}
        })
        res.push(tmp)
    }
    return res
}

const Detail = ({detail}: { detail: VodDetail }) => {

    const [playUrl, setPlayUrl] = useState(detail?.vod_play_url?.split('#')[0].split('$')[1])
    // console.log('play url:', playUrl)

    return <div id={'pid'}>
        <div className={'flex flex-wrap md:flex-nowrap items-center mb-10'}>
            <div className={'w-full md:w-1/2 mr-5 text-center'}>
                <Image src={detail?.vod_pic || ''} width={150} height={200} alt={detail?.vod_name}/>
            </div>
            <div className={'flex flex-col flex-wrap'}>
                <div className={'text-2xl font-bold'}>{detail?.vod_name}</div>
                <div className={'my-1 font-medium'}>{detail?.vod_pubdate}</div>
                <div className={'mb-2 font-bold'}>{detail?.vod_actor}</div>
                <div>简介: {detail?.vod_blurb}</div>
            </div>
        </div>
        {process.browser ?
            <ReactPlayer url={playUrl} playing={true} controls={true} width={'100%'} height={'100%'}/>
            : null}

        <PlayList list={computeUrl(detail?.vod_play_url)[1]} setPlayUrl={setPlayUrl}/>
        {/*{computeUrl(detail.vod_play_url).map((i, index) => <PlayList list={i} setPlayUrl={setPlayUrl} key={index}/>)}*/}
    </div>

}

export default Detail