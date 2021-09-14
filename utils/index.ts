import Axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {message} from "antd";
import {CommonResponse} from "../types";

let axios = Axios.create()

const getRequest = (method: string) => {
    return async (url: string, data: any = null, options: any = {}) => {
        try {
            // let res = await axios.request<any, CommonResponse<any>>({
            let res = await axios.request({
                // baseURL: process.env.NEXT_PUBLIC_BASE, // 请求域名地址
                // baseURL: '/japi/',
                baseURL: process.env.NODE_ENV === 'production' ? '/japi/' : 'https://api.apibdzy.com/api.php/',
                // baseURL: 'https://api.apibdzy.com/api.php/',
                // @ts-ignore
                method,
                url,
                ...(method === 'POST'
                    ? {
                        // data: options.string ? stringify(data) : data,
                        data: data,
                    }
                    : {}),
                params: method === 'GET' ? data : options.params,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': options.string
                        ? 'application/x-www-form-urlencoded'
                        : 'application/json',
                    ...options.headers,
                },
                withCredentials: true,
            })
            return res.data
        } catch (e: any) {
            message.error(JSON.stringify(e))
            return Promise.reject(e)
        }
    }
}

export const get = getRequest('GET')
// export const fetcher = (url: string) => fetch(url).then(i => i.json())
export const fetcher = get

export const post = getRequest('POST')

export function useGetSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])

    return size
}
