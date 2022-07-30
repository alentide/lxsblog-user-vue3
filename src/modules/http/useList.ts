import { computed, onMounted, provide, ref, type Ref } from "vue"
import { http } from "."
import useAdminTabs from "../adminTabs/useAdminTabs"
import type { ArticleDfe } from "../article/article.interfaces"
import IgnoreError from "../error/IgnoreError"
import type { ListResponseData } from "./http.interfaces"

export const defaultPage = () => ({
    num: 1,
    limit: 10
})


export function useListRequest<T>(url: string) {
    const page = ref(defaultPage())
    const request = async (options:any={}) => {
        const { data } = await http.get<ListResponseData<T>>(url, {
            pageNum: page.value.num,
            pageLimit: page.value.limit,
            ...options,
        })
        return data
    }
    return {
        page,
        request,
    }
}



interface Sorter {
    column?: {
        dataIndex: string;
        sortDirections: string[];
        sorter: (a: any, b: any) => number;
        title: string;
        sortKey?: string,
    };
    columnKey?: undefined;
    field: string;
    order?: 'descend'|'ascend';
}


interface SortOption {
    [key:string]: 'DESC'|'ASC'|undefined | SortOption
}


const defaultOptions = {
    all:false
}
export function usePageList<T>(url: string,listOptions={}) {
    listOptions = Object.assign(listOptions,defaultOptions)
    function useListRequest<T>(url: string) {
        const page = ref(defaultPage())
        const request = async (options:any={}) => {
            const { data } = await http.get<ListResponseData<T>>(url, {
                pageNum: page.value.num,
                pageLimit: page.value.limit,
                ...options,
            })
            return data
        }
        return {
            page,
            request,
        }
    }



    
    const list: Ref<T[][]> = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    const total = ref(0)


    let sortOption:SortOption = {}

    const { page, request:_request } = useListRequest<T>(url)
    const request = ()=>_request({
        sort: sortOption,
    })





    const currentList = computed(() => list.value[page.value.num])

    const pagination = computed(() => ({
        total: total.value,
        pageSize: page.value.limit
    }))

    const updatePagination = (data: ListResponseData<T>) => {
        ({ hasMore: hasMore.value, total: total.value } = data);
    }

    const refresh = async () => {
        loading.value = true
        // page.value = defaultPage()
        try {
            const data = await request();
            updatePagination(data)
            list.value[page.value.num] = data.list
            return data.list
        } finally {
            loading.value = false
        }
    }

    const nextPage = async () => {
        if (!hasMore.value) return []
        loading.value = true
        page.value.num++
        try {
            const data = await request();
            updatePagination(data)
            list.value[page.value.num] = data.list
            return data.list
        } finally {
            loading.value = false
        }
    }

    const goPageNum = async (num: number) => {
        loading.value = true
        page.value.num = num
        try {
            const data = await request();
            updatePagination(data)
            list.value[page.value.num] = data.list
            return data.list
        } finally {
            loading.value = false
        }
    }
    const adminTabs = useAdminTabs()

    const go = (record: ArticleDfe) => {
        adminTabs.go('/admin/article/edit/' + record.id, record.title)
    }


    /**
     * 转换排序关键字
     */
    function transformOrderTypeToEndInSorter(sorter: Sorter) {
        const types = { descend: 'DESC', ascend: 'ASC' } as const
        const order = sorter.order && types[sorter.order]
        return {
            ...sorter,
            order,
        }
    }

    /**
     * 用于显示的字段恢复到真正的字段
     */
    const keyRevertToPrevious = (key:string)=>{
        return {
            createTimeDisplayed: 'createTime'
        }[key] || key
    }

    /**
     * 当改变排序时
     * @param sorter 
     */
    const onChangeSorter = (sorter:Sorter)=>{

        const sorterTransformed = transformOrderTypeToEndInSorter(sorter)
        if(sorter.column?.sortKey){
            sortOption = {
                [keyRevertToPrevious(sorter.field)]:{
                    [sorter.column?.sortKey]: sorterTransformed.order
                }
            }
        }else {
            sortOption = {
                [keyRevertToPrevious(sorter.field)]:sorterTransformed.order
            }
        }
        
        if(!sortOption[keyRevertToPrevious(sorter.field)]){
            delete sortOption[keyRevertToPrevious(sorter.field)]
        }
        console.log('sortOption',sorter,sortOption);

        // console.log('sorter',sorter);
        // const sorterTransformed = transformOrderTypeToEndInSorter(sorter)
        // if(sorter.column?.sortKey){
        //     sortOption[keyRevertToPrevious(sorter.field)] = {
        //         [sorter.column?.sortKey]: sorterTransformed.order
        //     }
        // }else {
        //     sortOption[keyRevertToPrevious(sorter.field)] = sorterTransformed.order
        // }
        
        // if(!sortOption[keyRevertToPrevious(sorter.field)]){
        //     delete sortOption[keyRevertToPrevious(sorter.field)]
        // }
        // console.log('sortOption',sorter,sortOption);
    }

    /**
     * 使用a-table时，onChange事件传递该函数即可
     * @param param0 
     */
    const onTableChange = (e: {
        current: number;
        pageSize: number;
        total: number;
    },filter,sorter:Sorter) => {
        const {
            current,
        }=e
        onChangeSorter(sorter)
        goPageNum(current);
    };


    const remove = async (id: number) => {
        loading.value = true
        try {
            await http.delete(url + '/' + id)
        } finally {
            loading.value = false
        }
        await refresh()
        return
    }

    const result = {
        list,
        refresh,
        loading,
        nextPage,
        hasMore,
        total,
        goPageNum,
        pagination,
        currentList,
        go,
        onTableChange,
        remove,
    }
    provide('list', result)
    onMounted(refresh)
    return result
}
export function useList<T>(url: string) {
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