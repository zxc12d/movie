import ReactPlayer from 'react-player'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { CommonResponse, Vod, VodDetail } from '../types'
import { get } from '../utils'
import { Tabs } from 'antd'
import { TabPane } from 'rc-tabs'
import MovieItem from '../components/MovieItem'

export const getStaticPaths: GetStaticPaths = async () => {
    let vod: CommonResponse<Vod> = await get(`/provide/vod/?ac=list`)
    vod?.list?.map((i) => i.vod_id)
    let pages = vod?.list?.map((i) => i.vod_id).splice(0, 50)
    let paths = pages?.map((i) => ({ params: { id: '' + i } }))

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let id = params!.id
    let res: CommonResponse<VodDetail> = await get(
        `/provide/vod/?ac=detail&ids=${id}`
    )
    let detail = res.list[0]

    //获取5个推荐
    let ids = []
    for (let index = 1; index <= 5; index++) {
        ids.push(+id! + index)
    }
    res = await get(`/provide/vod/?ac=detail&ids=${ids}`)

    return {
        props: {
            detail,
            moreItem: res.list,
        },
    }
}

interface PlayItem {
    name: string
    url: string
}

const PlayList = ({
    list,
    setPlayUrl,
}: {
    list: PlayItem[]
    setPlayUrl: (i: string) => void
}) => {
    const [currIndex, setCurrIndex] = useState<number>(0)

    return (
        <div className={'flex flex-wrap mt-4'}>
            {list?.map((i, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setCurrIndex(index)
                        setPlayUrl(i?.url)
                    }}
                    className={`border-2 border-gray-500 mr-2 mt-2 px-2 py-1 rounded-full hover:bg-blue-400 cursor-pointer
             ${currIndex === index ? 'bg-blue-300' : ''}`}
                >
                    <span>{i?.name}</span>
                </div>
            ))}
        </div>
    )
}

const computeUrl = (url: string | undefined) => {
    if (!url) return []
    let a = url.split('$$$')
    let res = []
    for (let u of a) {
        let tmp = u.split('#')?.map((i) => {
            let tmp = i.split('$')
            return { name: tmp[0], url: tmp[1] }
        })
        res.push(tmp)
    }
    return res
}

const Detail = ({
    detail,
    moreItem,
}: {
    detail: VodDetail
    moreItem: VodDetail[]
}) => {
    const url = detail?.vod_play_url
        ?.split('$$$')[1]
        .split('#')[0]
        .split('$')[1]
    const [playUrl, setPlayUrl] = useState(url)

    useEffect(() => {
        if (!playUrl) {
            setPlayUrl(url)
        }
    }, [playUrl, url])

    const [p1Playing, setP1Playing] = useState(true)
    const handleChangePlayer = (i: string) => {
        if (i === 'p1') {
            setP1Playing(true)
        } else {
            setP1Playing(false)
        }
    }

    return (
        <div className={'mb-10'}>
            <div className={'flex flex-wrap md:flex-nowrap items-center mb-10'}>
                <div className={'w-full md:w-1/2 mr-5 text-center'}>
                    <Image
                        src={detail?.vod_pic || ''}
                        width={150}
                        height={200}
                        alt={detail?.vod_name}
                    />
                </div>
                <div className={'break-words w-full'}>
                    <p className={'text-2xl font-bold'}>{detail?.vod_name}</p>
                    <p className={'my-1 font-medium'}>{detail?.vod_pubdate}</p>
                    <p className={'mb-2 font-bold'}>{detail?.vod_actor}</p>
                    <p>简介: {detail?.vod_blurb}</p>
                </div>
            </div>

            <Tabs defaultActiveKey={'p1'} onChange={handleChangePlayer}>
                <TabPane tab={'播放器1'} key={'p1'}>
                    <ReactPlayer
                        url={playUrl}
                        playing={p1Playing}
                        controls={true}
                        width={'100%'}
                        height={'100%'}
                    />
                </TabPane>
                <TabPane tab={'播放器2'} key={'p2'}>
                    <iframe
                        src={'https://jx.jxbdzyw.com/m3u8/?url=' + playUrl}
                        width={'100%'}
                        height={400}
                        allowFullScreen={true}
                    />
                </TabPane>
            </Tabs>
            {/*<ReactPlayer url={playUrl} playing={true} controls={true} width={'100%'} height={'100%'}/>*/}

            <PlayList
                list={computeUrl(detail?.vod_play_url)[1]}
                setPlayUrl={setPlayUrl}
            />

            {/* add link */}
            <div className="mt-10 mb-5 text-xl ">猜你想看 :</div>
            <div className="flex flex-wrap space-x-5">
                {moreItem.map((i: VodDetail) => (
                    <div key={i.type_id}>
                        <MovieItem
                            img={i.vod_pic}
                            id={i.vod_id}
                            title={i.vod_name}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Detail
