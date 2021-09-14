import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import {get} from "../../../utils";
import {CommonResponse, Vod} from "../../../types";
import {getDataByTypeId, VodAndDetail} from "../../index";
import MyList from "../../../components/MyList";

export const getStaticPaths: GetStaticPaths = async () => {
    let vod: CommonResponse<Vod> = await get(`/provide/vod/?ac=list`)
    let types = vod.class
    let paths = types?.map(i => ({params: {typeId: '' + i.type_id}}))

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let typeId = params!.type_id
    let data = await getDataByTypeId(+typeId!)
    let vod: CommonResponse<Vod> = await get(`/provide/vod/?ac=list`)
    return {
        props: {
            data,
            total: vod.total
        }
    }
}


const TypeList = ({data, total}: { data: VodAndDetail[], total: number }) => {
    const router = useRouter()
    const {typeId} = router.query

    const handleChangePage = async (v: number) => {
        await router.prefetch('/type/[typeId]/[page]', `/type/${typeId}/${v}`)
    }

    return <MyList data={data} page={1} handleChangePage={handleChangePage} total={total}/>
}

export default TypeList