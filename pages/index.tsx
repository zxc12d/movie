import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import {useContext} from "react";
import {CommonResponse, Vod, VodDetail} from "../types";
import Image from "next/image";
import {GlobalCxt} from "./_app";
import Link from 'next/link'
import {get} from "../utils";

type VodAndDetail = Vod & {
    vod_pic: string
}

//列表项
const Item = ({img, id, title}: { img: string, id: number, title: string }) => {
    return <Link href={`/${id}`} passHref={true}>
        <div className={'flex flex-col justify-center items-center px-1 cursor-pointer'}>
            <Image src={img} alt={title} width={160} height={240} className={'object-cover'}/>
            <div className={'truncate w-40 text-center text-xl my-2 mb-10'}>{title}</div>
        </div>
    </Link>
}

export const getStaticProps: GetStaticProps = async (context) => {
    let vod: CommonResponse<Vod> = await get(`https://api.apibdzy.com/api.php/provide/vod/?ac=list&pg=1`)

    async function getData(name: string) {
        let typeId = vod.class.find(i => i.type_name.endsWith(name))?.type_id
        let movies: CommonResponse<Vod> = await get(`https://api.apibdzy.com/api.php/provide/vod/?ac=list&pg=1&t=${typeId}`)
        let movieDetail: CommonResponse<VodDetail> = await get(`https://api.apibdzy.com/api.php/provide/vod/?ac=detail&ids=${movies.list.map(i => i.vod_id).join(',')}`)

        let movieData: VodAndDetail[] = movies.list.map(i => {
            let detail = movieDetail.list.find(j => j.vod_id === i.vod_id)
            return {...i, vod_pic: detail?.vod_pic || ''}
        })
        return movieData
    }

    //电影列表
    let movieData = await getData('片')
    // console.log('moivdata:',movieData)
    //电视剧列表
    let serialsData = await getData('剧')
    //娱乐列表
    let funData = await getData('综艺')
    //动漫列表
    let cartoonData = await getData('动漫')

    return {
        props: {
            classList: vod.class,
            // vodDataInit,
            total: vod.total,
            movieData,
            serialsData,
            funData,
            cartoonData
        },
    }
}

//标题
const HomeTitle = ({name}: { name: string }) => {
    return <div className={'flex items-center mb-2'}>
        <div className={'font-semibold text-3xl mr-5'}>{name}</div>
        <div className={'font-medium'}>{'查看更多 >'}</div>
    </div>
}

//列表
const HomeList = ({list}: { list: VodAndDetail[] }) => {
    return <div className={'flex flex-wrap'}>
        {list.slice(0, 8).map(i => <Item id={i.vod_id} img={i.vod_pic} title={i.vod_name} key={i.vod_id}/>)}
    </div>
}

const Home: NextPage = ({
                            total,
                            classList,
                            movieData,
                            serialsData,
                            funData,
                            cartoonData
                        }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const global = useContext(GlobalCxt)

    return <div>
        {/* 分类 */}
        {/*<div className={'flex flex-wrap mb-8'}>*/}
        {/*    {classList.map((i: ClassType) => <div*/}
        {/*        className={'cursor-pointer mr-8 mb-2 hover:bg-blue-100 border-2 rounded-full px-3 py-1'}*/}
        {/*        key={i.type_id}>*/}
        {/*        {i.type_name}*/}
        {/*    </div>)}</div>*/}

        <div>
            <HomeTitle name={'电影'}/>
            <HomeList list={movieData}/>
        </div>
        <div>
            <HomeTitle name={'电视剧'}/>
            <HomeList list={serialsData}/>
        </div>
        <div>
            <HomeTitle name={'综艺'}/>
            <HomeList list={funData}/>
        </div>
        <div>
            <HomeTitle name={'动漫'}/>
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
