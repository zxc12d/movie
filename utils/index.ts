import Axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {message} from "antd";
import {CommonResponse} from "../types";

let axios = Axios.create()


// 拦截请求，给所有的请求都带上token
// if (process.browser) {
//     axios.interceptors.request.use((request) => {
//         const jwt_token = localStorage.getItem('jwt_token')
//         if (jwt_token) {
//             // request.headers['Authorization'] = `Bearer ${jwt_token}`
//             request.headers['Authorization'] = `${jwt_token}`
//         }
//         return request
//     })
// }

// 添加响应拦截器
// axios.interceptors.response.use(
//     (res) => {
//         // return res.data
//         let data = res.data
//         if (data.code !== 0) {
//             return Promise.reject(data.msg)
//         } else {
//             return data
//         }
//     },
//     async (error) => {
//         console.log('response interceptors err:', JSON.stringify(error))
//         // 对响应错误做点什么
//         return Promise.reject(error)
//     }
// )

const getRequest = (method: string) => {
    return async (url: string, data: any = null, options: any = {}) => {
        try {
            // let res = await axios.request<any, CommonResponse<any>>({
            let res = await axios.request({
                // baseURL: process.env.NEXT_PUBLIC_BASE, // 请求域名地址
                baseURL: '/japi/',
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
