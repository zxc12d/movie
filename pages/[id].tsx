import {useRouter} from "next/router";
import {useVodDetail} from "../hooks/useVod";
import {Spin} from "antd";
// import Player from 'xgplayer'
import {useEffect} from "react";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
// let Player:any
// if (process.browser){
//     Player = import('xgplayer')
// }

// const a= dynamic(()=>import('xgplayer'))


const Detail = () => {
    const router = useRouter()
    const {id} = router.query
    const {vodDetail, isLoading} = useVodDetail([+id!])

    // if (isLoading || !vodDetail) return <Spin/>
    const detail = vodDetail?.list[0]
    const pUrl = detail?.vod_play_url.split('$')[1]

    return <div id={'pid'}>
        <ReactPlayer url={pUrl} playing={true} controls={true} width={'100%'} height={'100%'}/>
    </div>
}

export default Detail