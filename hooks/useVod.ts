import useSwr from "swr";
import {CommonResponse, Vod, VodDetail} from "../types";
import {fetcher} from "../utils";
import useSWRImmutable from 'swr/immutable'

export const useVod = (page: number = 1, tid?: number) => {
    const {
        data,
        error
    } = useSwr<CommonResponse<Vod>>(`provide/vod/?ac=list&pg=${page}${tid ? '&t=' + tid : ''}`, fetcher)

    console.log(data)
    return {
        vod: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export const useVodDetail = (ids: number[] | undefined) => {
    const {data, error} = useSWRImmutable<CommonResponse<VodDetail>>(`provide/vod/?ac=detail&ids=${ids?.join(',')}`, fetcher);
    return {
        vodDetail: data,
        isLoading: !error && !data,
        isError: error,
    }
}