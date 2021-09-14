import {useRouter} from "next/router";
import {useVodDetail} from "../hooks/useVod";
import ReactPlayer from "react-player";
import {Spin} from "antd";
import Image from "next/image";
import {useState} from "react";


const Detail = () => {
    const router = useRouter()
    const {id} = router.query
    const {vodDetail, isLoading} = useVodDetail([+id!])
    console.log(vodDetail)
    const detail = vodDetail?.list[0]
    const [playUrl, setPlayUrl] = useState(detail?.vod_play_url.split('#')[0].split('$')[1])
    //当前选中集数
    const [currIndex, setCurrIndex] = useState(0)

    console.log(playUrl)

    if (isLoading || !vodDetail) return <div className={'text-center'}><Spin/></div>

    return <div id={'pid'}>
        <div className={'flex flex-wrap md:flex-nowrap items-center mb-10'}>
            <div className={'w-full md:w-1/2 mr-5 text-center'}>
                <Image src={detail?.vod_pic || ''} width={150} height={200} alt={detail?.vod_name}/>
            </div>
            <div>
                <div className={'text-2xl font-bold'}>{detail?.vod_name}</div>
                <div className={'my-1 font-medium'}>{detail?.vod_pubdate}</div>
                <div className={'mb-2 font-bold'}>{detail?.vod_actor}</div>
                <div>简介: {detail?.vod_blurb}</div>
            </div>
        </div>
        <ReactPlayer url={playUrl} playing={true} controls={true} width={'100%'} height={'100%'}/>

        <div className={'flex flex-wrap mt-4'}>
            {detail?.vod_play_url.split('#').map((i, index) => <div key={index} onClick={() => {
                setCurrIndex(index)
                setPlayUrl(i.split('$')[1])
            }} className={`border-2 border-gray-500 mr-2 mt-2 px-2 py-1 rounded-full hover:bg-blue-400
             ${currIndex === index ? 'bg-blue-300' : ''}`}>
                <span>{i.split('$')[0]}</span>
            </div>)}
        </div>
    </div>
}

export default Detail