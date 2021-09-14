import {GetStaticPaths, GetStaticProps} from "next";
import {CommonResponse, Vod} from "../../../types";
import {get} from "../../../utils";
import {getDataByTypeId, getDataByTypeIdAndPage, VodAndDetail} from "../../index";
import {useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {Pagination} from "antd";
import MyList from "../../../components/MyList";

export const getStaticPaths: GetStaticPaths = async () => {
    let vod: CommonResponse<Vod> = await get(`/provide/vod/?ac=list`)
    let types = vod.class

    //最多取5页
    let pages = Array.from({length: (vod.pagecount < 5) ? vod.pagecount : 5}, (_, i) => i + 1)
    let paths: any[] = []
    for (let type of types) {
        let list = pages.map(i => ({params: {page: '' + i, typeId: '' + type.type_id}}))
        paths = paths.concat(list)
    }

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let typeId = params!.type_id
    let page = params!.page
    let data = await getDataByTypeIdAndPage(+typeId!, +page!)
    let vod: CommonResponse<Vod> = await get(`/provide/vod/?ac=list`)
    return {
        props: {
            data,
            total: vod.total
        }
    }
}


const TypeListPage = ({data, total}: { data: VodAndDetail[], total: number }) => {
    const router = useRouter()
    const {typeId, page} = router.query

    const handleChangePage = async (v: number) => {
        await router.push('/type/[typeId]/[page]', `/type/${typeId}/${v}`)
    }

    return <MyList data={data} page={+page!} handleChangePage={handleChangePage} total={total}/>
}

export default TypeListPage