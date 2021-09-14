import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {useContext, useState} from "react";
import {ClassType, CommonResponse, Vod, VodDetail} from "../types";
import Image from "next/image";
import {GlobalCxt} from "./_app";
import Link from 'next/link'
import {get} from "../utils";
import {Tag} from "antd";
import {DownOutlined} from "@ant-design/icons";

export type VodAndDetail = Vod & {
    vod_pic: string
}

//列表项
const Item = ({img, id, title}: { img: string, id: number, title: string }) => {
    return <Link href={`/${id}`}>
        <a>
            <div className={'flex flex-col justify-center items-center px-1 cursor-pointer relative '}>
                <Image src={img} alt={title}
                       width={160} height={240}
                       className={'object-cover'}/>
                <div className={'truncate w-40 text-center text-xl my-2 mb-10'}>{title}</div>
            </div>
        </a>
    </Link>
}
//标题
const HomeTitle = ({name, typeId}: { name: string, typeId?: number }) => {
    return <div className={'flex items-center mb-2'}>
        <div className={'font-semibold text-3xl mr-5'}>{name}</div>
        {typeId ?
            <Link href={`/type/${typeId}/1`}>
                <a>
                    <div className={'font-medium text-lg cursor-pointer select-none'}>{'查看更多 >'}</div>
                </a>
            </Link> : null}
    </div>
}

//列表
const HomeList = ({list, count}: { list: VodAndDetail[], count?: number }) => {
    return <div className={'flex flex-wrap justify-between'}>
        {list.slice(0, count || 10).map(i => <Item id={i.vod_id} img={i.vod_pic} title={i.vod_name} key={i.vod_id}/>)}
    </div>
}

export async function getDataByTypeId(typeId: number): Promise<VodAndDetail[]> {
    return getDataByTypeIdAndPage(typeId, 1)
}

async function getDataByList(movies: CommonResponse<Vod>) {
    let movieDetail: CommonResponse<VodDetail> = await get(`provide/vod/?ac=detail&ids=${movies.list.map(i => i.vod_id).join(',')}`)

    return movies.list.map(i => {
        let detail = movieDetail.list.find(j => j.vod_id === i.vod_id)
        return {...i, vod_pic: detail?.vod_pic || ''}
    })
}

export async function getDataByTypeIdAndPage(typeId: number, page: number): Promise<VodAndDetail[]> {
    let movies: CommonResponse<Vod> = await get(`provide/vod/?ac=list&t=${typeId}&pg=${page}`)
    return await getDataByList(movies)
}

export async function getDataByName(name: string, vod?: CommonResponse<Vod>) {
    if (!vod) {
        vod = await get(`provide/vod/?ac=list&pg=1`)
    }
    let typeId = vod!.class.find(i => i.type_name.endsWith(name))?.type_id

    return await getDataByTypeId(typeId!)
}

//24小时最新电影
async function getLatestData() {
    let movies: CommonResponse<Vod> = await get(`provide/vod/?ac=list&pg=1&h=24`)
    return await getDataByList(movies)
}

export const getStaticProps: GetStaticProps = async (context) => {
    let vod: CommonResponse<Vod> = await get(`https://api.apibdzy.com/api.php/provide/vod/?ac=list&pg=1`)

    //最新列表
    let latestData = await getLatestData()
    //电影列表
    let movieData = await getDataByName('片')
    //电视剧列表
    let serialsData = await getDataByName('剧')
    //娱乐列表
    let funData = await getDataByName('综艺')
    //动漫列表
    let cartoonData = await getDataByName('动漫')

    return {
        props: {
            classList: vod.class,
            // vodDataInit,
            total: vod.total,
            latestData,
            movieData,
            serialsData,
            funData,
            cartoonData
        },
        revalidate: 86400
    }
}

const Home: NextPage = ({
                            total,
                            classList,
                            latestData,
                            movieData,
                            serialsData,
                            funData,
                            cartoonData
                        }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const global = useContext(GlobalCxt)
    const [showAllTypes, setShowAllTypes] = useState(false)
    const [typeList, setTypeList] = useState(classList.slice(0, 9))

    const getTypeIdByName = (name: string): number => {
        return classList.find((i: ClassType) => i.type_name.endsWith(name)).type_id
    }

    const toggleShowAllType = () => {
        setShowAllTypes(i => !i)
        if (showAllTypes) {
            setTypeList(classList.slice(0, 9))
        } else {
            setTypeList(classList)

        }
    }


    return <div>
        {/* 分类 */}
        <div onClick={toggleShowAllType} className={'mb-2 select-none cursor-pointer flex items-center transition-all duration-500'}>
            <span>{showAllTypes ? '隐藏 ' : '展开全部 '}</span>
            <DownOutlined/>
        </div>
        <div className={'flex flex-wrap mb-8'}>
            {typeList.map((i: ClassType) => <Link href={'/type/[typeId]/[page]'} as={`/type/${i.type_id}/1`}
                                                  key={i.type_id}>
                <a>
                    <div
                        className={'cursor-pointer mr-5 mb-2 hover:bg-blue-200 border-2 border-gray-500 rounded-full px-3 py-1'}>
                        {i.type_name}
                    </div>
                    {/*<Tag*/}
                    {/*    className={'mr-8 mb-2 hover:bg-blue-100  rounded-full px-3 py-1'}*/}
                    {/*>{i.type_name}</Tag>*/}
                </a>
            </Link>)}
        </div>

        <div>
            <HomeTitle name={'最新影视'}/>
            <HomeList list={latestData} count={5}/>
        </div>

        <div>
            <HomeTitle name={'电影'} typeId={getTypeIdByName('片')}/>
            <HomeList list={movieData}/>
        </div>
        <div>
            <HomeTitle name={'电视剧'} typeId={getTypeIdByName('剧')}/>
            <HomeList list={serialsData}/>
        </div>
        <div>
            <HomeTitle name={'综艺'} typeId={getTypeIdByName('综艺')}/>
            <HomeList list={funData}/>
        </div>
        <div>
            <HomeTitle name={'动漫'} typeId={getTypeIdByName('动漫')}/>
            <HomeList list={cartoonData}/>
        </div>
        {/*<div className={'flex flex-wrap'}>*/}
        {/*    {vodData?.map(i => <Item id={i.vod_id} img={i.vod_pic} title={i.vod_name} key={i.vod_id}/>)}*/}
        {/*</div>*/}

        {/* 分页*/}
        {/*<Pagination showQuickJumper current={currPage} pageSize={20} showSizeChanger={false} total={total}*/}
        {/*            onChange={handleChangePage}/>*/}
    </div>;
}

export default Home
