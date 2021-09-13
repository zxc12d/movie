import {useRouter} from "next/router";
import {useVodDetail} from "../hooks/useVod";
import ReactPlayer from "react-player";
import {Spin} from "antd";


const Detail = () => {
    const router = useRouter()
    const {id} = router.query
    const {vodDetail, isLoading} = useVodDetail([+id!])

    const detail = vodDetail?.list[0]
    const pUrl = detail?.vod_play_url.split('$')[1]
    if (isLoading || !vodDetail) return <div className={'text-center'}><Spin/></div>

    return <div id={'pid'}>
        <ReactPlayer url={pUrl} playing={true} controls={true} width={'100%'} height={'100%'}/>
    </div>
}

export default Detail