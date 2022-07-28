import { reactive } from 'vue';

import axios from 'axios'
import { ref, type Ref } from 'vue'
import useToast from '../toast/useToast'
import type { ListResponseData, ProjectResponse } from './http.interfaces';
import IgnoreError from '../error/IgnoreError';

const toast = useToast()
class Http {
    private _axios: any
    constructor() {
        this._axios = axios.create({
            baseURL: 'http://localhost:3000'
        })

        this._axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, function (error) {
            if(error.response?.data?.msg){
                toast.error(error.response.data.msg)
                return Promise.reject(error.response.data);
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
    }
    get<T>(url: string, params?: any):Promise<ProjectResponse<T>> {
        return this._axios.get(url, {params}).then((res: { data: any }) => res.data)
    }
    post<T>(url: string, params?: any):Promise<ProjectResponse<T>>  {
        return this._axios.post(url, params).then((res: { data: any }) => res.data)
    }
    put(url: string, params?: any) {
        return this._axios.put(url, params).then((res: { data: any }) => res.data)
    }
    delete(url: string, params?: any) {
        return this._axios.delete(url, {
            data: params
        }).then((res: { data: any }) => res.data)
    }
}
export const http = new Http()


export const usePost = (url: string, required: any={}) => {
    const loading = ref(false)
    const result = ref()
    const request = (options: any={}) => {
        loading.value = true
        return http.post(url, { ...required, ...options, }).then((res: any) => result.value = res).finally(() => {
            loading.value = false
        })
    }

    return {
        loading,
        result,
        request,
    }
}



export function useList<T>(url: string) {
    const list:Ref<T[]> = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    const defaultPage = ()=>({
        num:1,
        limit:10
    })
    const page = ref(defaultPage())

    const refresh = async ()=>{
        loading.value = true
        page.value = defaultPage()
        try{
            const {data} = await http.get<ListResponseData<T>>(url,{
                pageNum: page.value.num,
                pageLimit: page.value.limit,
            });
            ({hasMore:hasMore.value} = data);
            list.value=data.list
            return data.list
        }finally{
            loading.value =false
        }
    }

    const nextPage = async ()=>{
        if(hasMore.value) return Promise.reject(new IgnoreError('没有更多了'))
        loading.value = true
        page.value.num++
        try{
            const {data} = await http.get<ListResponseData<T>>(url,{
                pageNum: page.value.num,
                pageLimit: page.value.limit,
            });
            ({hasMore:hasMore.value} = data);
            list.value.push(...data.list)
            return data.list
        }finally{
            loading.value =false
        }
    }
    return {
        list,
        refresh,
        loading,
        nextPage,
    }
}