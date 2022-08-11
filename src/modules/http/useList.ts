import { mergeDeepLeft } from "ramda"
import { computed, onMounted, provide, ref, type Ref } from "vue"
import { adminHttp } from "."
import useAdminTabs from "../adminTabs/useAdminTabs"
import type { ArticleDfe } from "../article/article.interfaces"
import IgnoreError from "../error/IgnoreError"
import type { FilterOption } from "../list/interfaces/FilterOption.interface"
import type { ListResponseData } from "./http.interfaces"

export const defaultPage = () => ({
    num: 1,
    limit: 10
})


export function useListRequest<T>(url: string) {
    const page = ref(defaultPage())
    const request = async (options:any={}) => {
        const { data } = await adminHttp.get<ListResponseData<T>>(url, {
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



export interface Sorter {
    column?: {
        dataIndex: string;
        sortDirections: string[];
        sorter: (a: any, b: any) => number;
        title: string;
        sortKey?: string,
        filterKey?:string
    };
    columnKey?: undefined;
    field: string;
    order?: 'descend'|'ascend';
}


interface SortOption {
    [key:string]: 'DESC'|'ASC'|undefined | SortOption
}


const defaultOptions = {
    
}
export function usePageList<T extends {id:number} >(url: string,listOptions={}) {
    listOptions = Object.assign(listOptions,defaultOptions)
    function useListRequest<T extends {id:number}>(url: string) {
        const page = ref(defaultPage())
        const request = async (options:any={}) => {
            const { data } = await adminHttp.get<ListResponseData<T>>(url, {
                pageNum: page.value.num,
                pageLimit: page.value.limit,
                ...mergeDeepLeft(options,listOptions,)
            })
            return {
                ...data,
                list: data.list.map(m=>({
                    ...m,
                    key: m.id,
                }))
            }
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

    let filterOption = {

    }

    const { page, request:_request } = useListRequest<T>(url)
    const request = ()=>_request({
        sort: sortOption,
        filter:filterOption,
    })

    const columns = [
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            sorter: true,
            sortDirections: ["descend", "ascend"],
            width: "400px",
            customFilterDropdown: true,
            filterKey: 'title',
            filterType: 'SingleLike',
            isRelationFilter: false
        }
    ]





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

    }

    /**
     * 当改变筛选条件时
     * @param  filter 
     */
    const onChangeFilter = (filter:FilterOption,sorter:Sorter)=>{
        // if(sorter.column?.filterKey){
        //     filterOption = 
        // }

        
        filterOption = Object.fromEntries(Object.entries(filter).filter(([key,value])=>value).map(([key,value])=>{
            
            const column = columns.find(m=>m.dataIndex===key)

            let type
            if(column && column.filterType){
                type = column.filterType
            }else {
                type = 'InArray'
            }

            if(column && !column.isRelationFilter) {
                let resultValue = value
                if(type==='SingleLike'||type==='SingleEqual'){
                    if(Array.isArray(resultValue)){
                        resultValue = resultValue[0]
                    }
                }

                return [
                    column.filterKey || 'id',
                    {
                        type,
                        value: resultValue
                    }
                ]
            }
            let filterKey 
            if(column && column.filterKey) {
                filterKey=column.filterKey
            }else {
                filterKey = 'id'
            }
            

            if(type==='SingleLike'){
                if(Array.isArray(value)){
                    value = value[0]
                }
            }
            return [key,{
                [filterKey]: {
                    value: value,
                    type,
                }
            }]
        }))
    }

    /**
     * 使用a-table时，onChange事件传递该函数即可
     * @param param0 
     */
    const onTableChange = (e: {
        current: number;
        pageSize: number;
        total: number;
    },filter:FilterOption,sorter:Sorter) => {
        const {
            current,
        }=e
        onChangeFilter(filter,sorter)
        onChangeSorter(sorter)
        return  goPageNum(current);
    };


    const remove = async (id: number) => {
        loading.value = true
        try {
            await adminHttp.delete(url + '/' + id)
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
