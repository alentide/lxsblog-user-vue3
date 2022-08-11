import { changeEnd } from "codemirror";
import { assocPath, clone, mergeDeepLeft, mergeDeepRight, pipe } from "ramda";
import { computed, reactive, ref, type Ref } from "vue";
import { adminHttp, Http } from "../http";
import type { ListResponseData } from "../http/http.interfaces";
import { FilterType } from "./useBaseTableList";
import { defaultPage, mergeOptions } from "./usePageList";





export function usePageList2<T extends {id:number}>(url: string, {
    http,
    config,
}: {
    config?: any
    http?: Http
} = {
        config: reactive({}),
        http: adminHttp
    }) {
    const _http  = http || adminHttp 
    
    config = config || reactive({})
    const list: Ref<T[][]> = ref([]);
    const page = ref(defaultPage());
    const currentList = computed(() => list.value[page.value.num]);
    const onChange= (page:number,pageSize: number)=>{

        return goPageNum(page)
    }
    const pagination = computed(() => ({
        total: total.value,
        pageSize: page.value.limit,
        onChange,
    }));

    const hasMore = ref(true);
    const total = ref(0);
    const updatePagination = (data: ListResponseData<T>) => {
        ({ hasMore: hasMore.value, total: total.value } = data);
    }
    const loading = ref(false)

    const request = async (options?: any) => {
        try {
            loading.value = true
            return await _http.get<ListResponseData<T>>(url, mergeOptions(page, { options, ...config })).then(res => res.data)
        } finally {
            loading.value = false
        }

    }

    const genFilter = (type: FilterType) => {
        return (keys: string[]) => {
            return (value: any) => {
                const newFilter = pipe(
                    assocPath(keys.concat('value'), value),
                    assocPath(keys.concat('type'), type),
                )({})
                Object.assign(config,mergeDeepLeft({
                    filter: newFilter
                }, config))
                return refresh()
            }
        }
    }



    const equal = genFilter(FilterType.SINGLE_EQUAL)
    const inArray = genFilter(FilterType.IN_ARRAY)


    const sort = (value: {
        [key: string]: 'DESC' | 'ASC'
    }) => {

        Object.assign(config, {
            sort: value
        })
        return refresh()
    }


    const refresh = async (option?: any) => {
        const data = await request(option);
        updatePagination(data)
        const _list = data.list.map(m => ({
            ...m,
            key: m.id
        }))
        list.value[page.value.num] = _list
        return _list
    }

    const goPageNum = async (num: number, option?: any) => {
        page.value.num = num
        const data = await request(option);
        updatePagination(data)
        const _list = data.list.map(m => ({
            ...m,
            key: m.id
        }))
        list.value[page.value.num] = _list
        return _list
    }


    return {
        list,
        refresh,
        hasMore,
        total,
        pagination,
        currentList,
        goPageNum,
        loading,
        equal,
        inArray,
        sort,
    }
}
