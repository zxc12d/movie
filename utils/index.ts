import Axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {message} from "antd";
import {CommonResponse} from "../types";
import getConfig from "next/config";

let axios = Axios.create()

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

const getRequest = (method: string) => {
    return async (url: string, data: any = null, options: any = {}) => {
        try {
            // let res = await axios.request<any, CommonResponse<any>>({
            let res = await axios.request({
                // baseURL: process.env.NODE_ENV === 'production' ? '/api1/' : 'https://api.apibdzy.com/api.php/',
                // baseURL: 'https://api.apibdzy.com/api.php/',
                baseURL: serverRuntimeConfig.baseUrl || '/api1/',
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
            // message.error(JSON.stringify(e))
            return Promise.reject(e)
        }
    }
}

export const get = getRequest('GET')
// export const fetcher = (url: string) => fetch(url).then(i => i.json())
export const fetcher = get

export const post = getRequest('POST')

