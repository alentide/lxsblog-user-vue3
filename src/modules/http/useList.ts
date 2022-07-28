import { provide, ref, type Ref } from "vue"
import { http } from "."
import IgnoreError from "../error/IgnoreError"
import type { ListResponseData } from "./http.interfaces"

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
        if(!hasMore.value) return []
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

    provide('list',{
        list,
        refresh,
        loading,
        nextPage,
        hasMore,
    })
    return {
        list,
        refresh,
        loading,
        nextPage,
        hasMore,
    }
}