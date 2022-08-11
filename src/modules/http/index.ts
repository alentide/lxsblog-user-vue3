import { reactive, computed } from 'vue';

import axios from 'axios'
import { ref, type Ref } from 'vue'
import useToast from '../toast/useToast'
import type { ListResponseData, ProjectResponse } from './http.interfaces';
import IgnoreError from '../error/IgnoreError';
import { auth } from '../auth';
import { genUseGet } from './useGet';



export * from './useAdminPost'

const toast = useToast()
export class Http {
    private _axios: ReturnType<typeof axios.create>
    constructor({
        baseURL,
    }: {
        baseURL: string
    }) {
        this._axios= axios.create({
            baseURL,
        })
        axios.interceptors.request.use(function (config) {

            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        
        this._axios.interceptors.response.use(function (response) {
            if (response?.data?.needTipMsg) {
                toast.success(response.data.msg)
            }

            return response;
        }, function (error) {
            if (error.response?.data?.msg) {
                if(error.response?.data?.code===2){
                    // auth.clearToken()
                }
                toast.error(error.response.data.msg, 3)
                return Promise.reject(error.response.data);
            }
            if (error.code === 'ERR_NETWORK') {
                toast.error('未发现相关的网络服务，请检查请求路径和服务器状态！', 3)
                return Promise.reject(error);
            }
            return Promise.reject(error);
        });
    }
    getHeaders(){
        return {
            headers: {
                Authorization: auth.token
            }
        }
    }
    
    get<T>(url: string, params?: any): Promise<ProjectResponse<T>> {
        return this._axios.get(url, { params,...this.getHeaders()}).then((res: { data: any }) => res.data)
    }
    list<T>(url: string, params?: any): Promise<ProjectResponse<ListResponseData<T>>> {
        return this._axios.get(url, { params,...this.getHeaders() }).then((res: { data: any }) => res.data)
    }
    post<T>(url: string, params?: any): Promise<ProjectResponse<T>> {
        return this._axios.post(url, params,this.getHeaders()).then((res: { data: any }) => res.data)
    }
    put(url: string, params?: any) {
        return this._axios.put(url, params,this.getHeaders()).then((res: { data: any }) => res.data)
    }
    patch<T>(url: string, params?: any): Promise<ProjectResponse<T>> {
        return this._axios.patch(url, params,this.getHeaders()).then((res: { data: any }) => res.data)
    }
    delete(url: string, params?: any) {
        return this._axios.delete(url, {
            data: params,
            ...this.getHeaders()
        }).then((res: { data: any }) => res.data)
    }
}



export const commonHttp = new Http({
    baseURL: import.meta.env.VITE_BASE_URL+'/v1/common'
})

export const userHttp = new Http({
    baseURL: import.meta.env.VITE_BASE_URL+'/v1/user'
})

export const adminHttp = new Http({
    baseURL: import.meta.env.VITE_BASE_URL+'/v1/admin'
})




export function useUserPost<T>(url: string, required: any = {}) {
    const loading = ref(false);
    const result: Ref<ProjectResponse<T> | undefined> = ref();
    const data = computed(()=>result.value?.data)
    const request = (options: any = {}) => {
        loading.value = true;
        return userHttp.post<T>(url, { ...required, ...options, }).then((res: any) => result.value = res).finally(() => {
            loading.value = false;
        });
    };
    return {
        loading,
        result,
        data,
        request,
    };
}


export const useUserGet = genUseGet(userHttp)