import { mergeLeft } from 'ramda';
import { userHttp } from './../http/index';
import type { Http } from './../http/index';
import { provide, ref, type Ref } from "vue"
import { adminHttp } from "../http"
import type { ListResponseData } from "../http/http.interfaces"
import { identity } from 'ramda';

interface UseListOption<T,R> {
    http: Http,
    transform(data:T): (T|R)
}

function defaultUseListOption<T>() {
    return {
        http: adminHttp,
        transform: identity<T>
    }
}

export function useList<T,R>(url: string,originOption:Partial<UseListOption<T,R>> ={}) {
    const options = mergeLeft(originOption,defaultUseListOption<R>())
    const {http,transform} = options

    const list: Ref<T[]> = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    const total = ref(0)
    const defaultPage = () => ({
        num: 1,
        limit: 10
    })

    const page = ref(defaultPage())


    const _request = async ()=>{
        const { data:_data } = await http.get<ListResponseData<T>>(url, {
            pageNum: page.value.num,
            pageLimit: page.value.limit,
        });
        const data = {
            ..._data,
            list: _data.list.map(transform)
        };
        ({ hasMore: hasMore.value, total: total.value } = data);
        return data
    }

    /**
     * 刷新
     * @returns 
     */
    const refresh = async () => {
        loading.value = true
        page.value = defaultPage()
        try {
            const data = await _request()
            list.value = data.list
            return data.list
        } finally {
            loading.value = false
        }
    }


    /**
     * 下一页
     * @returns 
     */
    const nextPage = async () => {
        if (!hasMore.value) return []
        if(loading.value) return []
        loading.value = true
        page.value.num++
        try {
            const data = await _request()
            list.value.push(...data.list)
            return data.list
        } finally {
            loading.value = false
        }
    }

    const result = {
        list,
        refresh,
        loading,
        nextPage,
        hasMore,
        total,
    }
    provide('list', result)
    return result
}