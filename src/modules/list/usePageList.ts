import { clone, mergeDeepLeft } from "ramda";
import { computed, ref, type Ref } from "vue";
import { http } from "../http";
import type { ListResponseData } from "../http/http.interfaces";

export const defaultPage = () => ({
    num: 1,
    limit: 10
})

export const mergeOptions = (page: Ref<{
    num: number;
    limit: number;
}>, { options, config }: { options: any, config: any } = { options: {}, config: {} }) => {
    console.log('options,config',options,config);
    return {
        pageNum: page.value.num,
        pageLimit: page.value.limit,
        ...mergeDeepLeft(options, config,)
    }
}




export function usePageList<T>(url: string,) {
    const list: Ref<T[][]> = ref([]);
    const page = ref(defaultPage());
    const currentList = computed(() => list.value[page.value.num]);
    const pagination = computed(() => ({
        total: total.value,
        pageSize: page.value.limit
    }));

    const hasMore = ref(true);
    const total = ref(0);
    const updatePagination = (data: ListResponseData<T>) => {
        ({ hasMore: hasMore.value, total: total.value } = data);
    }

    const request = async (option?: any) => http.get<ListResponseData<T>>(url, mergeOptions(page, option)).then(res => res.data)


    const refresh = async (option?: any) => {
        const data = await request(option);
        updatePagination(data)
        const _list = data.list.map(m=>({
            ...m,
            key:m.id
        }))
        list.value[page.value.num] = _list
        return _list
    }

    const goPageNum = async (num: number, option?: any) => {
        page.value.num = num
        const data = await request(option);
        updatePagination(data)
        const _list = data.list.map(m=>({
            ...m,
            key:m.id
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
    }
}
