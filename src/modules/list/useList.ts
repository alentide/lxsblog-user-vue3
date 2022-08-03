import { userHttp } from './../http/index';
import { provide, ref, type Ref } from "vue"
import { adminHttp } from "../http"
import type { ListResponseData } from "../http/http.interfaces"

export function useList<T>(url: string,{
    http
}:{
    http: Http
}={
    http: adminHttp
}) {
    const list: Ref<T[]> = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    const total = ref(0)
    const defaultPage = () => ({
        num: 1,
        limit: 10
    })

    const page = ref(defaultPage())

    const refresh = async () => {
        loading.value = true
        page.value = defaultPage()
        try {
            const { data } = await http.get<ListResponseData<T>>(url, {
                pageNum: page.value.num,
                pageLimit: page.value.limit,
            });
            ({ hasMore: hasMore.value, total: total.value } = data);
            list.value = data.list
            return data.list
        } finally {
            loading.value = false
        }
    }

    const nextPage = async () => {
        if (!hasMore.value) return []
        if(loading.value) return []
        loading.value = true
        page.value.num++
        try {
            const { data } = await http.get<ListResponseData<T>>(url, {
                pageNum: page.value.num,
                pageLimit: page.value.limit,
            });
            ({ hasMore: hasMore.value } = data);
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