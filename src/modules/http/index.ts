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
            // console.log('response', response);
            //             config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
            // data:
            // code: 0
            // data: {raw: Array(0), affected: 1}
            // msg: "删除成功"
            // needTipMsg: true
            // [[Prototype]]: Object
            // headers: {content-length: '80', content-type: 'application/json; charset=utf-8'}
            // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
            // status: 200
            // statusText: "OK"
            if (response?.data?.needTipMsg) {
                toast.success(response.data.msg)
            }

            return response;
        }, function (error) {
            if (error.response?.data?.msg) {
                toast.error(error.response.data.msg)
                return Promise.reject(error.response.data);
            }
            if(error.code==='ERR_NETWORK'){
                toast.error('未发现相关的网络服务，请检查请求路径和服务器状态！',3000)
                return Promise.reject(error);
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }
    get<T>(url: string, params?: any): Promise<ProjectResponse<T>> {
        return this._axios.get(url, { params }).then((res: { data: any }) => res.data)
    }
    list<T>(url: string, params?: any): Promise<ProjectResponse<ListResponseData<T>>> {
        return this._axios.get(url, { params }).then((res: { data: any }) => res.data)
    }
    post<T>(url: string, params?: any): Promise<ProjectResponse<T>> {
        return this._axios.post(url, params).then((res: { data: any }) => res.data)
    }
    put(url: string, params?: any) {
        return this._axios.put(url, params).then((res: { data: any }) => res.data)
    }
    patch<T>(url: string, params?: any): Promise<ProjectResponse<T>> {
        return this._axios.patch(url, params).then((res: { data: any }) => res.data)
    }
    delete(url: string, params?: any) {
        return this._axios.delete(url, {
            data: params
        }).then((res: { data: any }) => res.data)
    }
}
export const http = new Http()


export const usePost = (url: string, required: any = {}) => {
    const loading = ref(false)
    const result = ref()
    const request = (options: any = {}) => {
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



