import { loadingMethod } from './../loading/index';
import type { Http } from './../http/index';
import { provide, reactive, ref, type Ref } from "vue"
import type { ListResponseData } from "../http/http.interfaces"



const defaultPage = () => ({
    num: 1,
    limit: 10
})


export function useBaseList<T>(http:Http,url: string) {

    const list: Ref<T[]> = ref([])
    const hasMore = ref(true)
    const total = ref(0)
    const page = ref(defaultPage())

    const [loading,_request] = loadingMethod(async ()=>{
        const { data } = await http.get<ListResponseData<T>>(url, {
            pageNum: page.value.num,
            pageLimit: page.value.limit,
        });
        ({ hasMore: hasMore.value, total: total.value } = data);
        return data
    })

    /**
     * 刷新
     * @returns 
     */
    const refresh = async () => {
        page.value = defaultPage()
        const data = await _request()
        list.value = data.list
        return data.list
    }


    /**
     * 下一页
     * @returns 
     */
    const nextPage = async () => {
        if (!hasMore.value) return []
        if(loading.value) return []
        page.value.num++
        const data = await _request()
        list.value.push(...data.list)
        return data.list
    }

    const result = reactive({
        list,
        refresh,
        loading,
        nextPage,
        hasMore,
        total,
    })
    provide('list', result)
    return result
}