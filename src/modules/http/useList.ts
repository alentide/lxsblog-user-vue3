import { computed, provide, ref, type Ref } from "vue"
import { http } from "."
import IgnoreError from "../error/IgnoreError"
import type { ListResponseData } from "./http.interfaces"

export const defaultPage = ()=>({
    num:1,
    limit:10
})


export function useListRequest<T>(url: string) {
    const page = ref(defaultPage())
    const request = async () => {
        const { data } = await http.get<ListResponseData<T>>(url, {
            pageNum: page.value.num,
            pageLimit: page.value.limit,
        })
        return data
    }
    return {
        page,
        request,
    }
}

export function usePageList<T>(url: string,_useListRequest=useListRequest){

    const {page,request} = _useListRequest<T>(url)
    const list:Ref<T[][]> = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    const total = ref(0)

    
    

    const currentList = computed(()=>list.value[page.value.num])

    const pagination =computed(()=>({
        total:total.value,
        pageSize: page.value.limit
    }))

    const updatePagination = (data:ListResponseData<T>)=>{
        ({hasMore:hasMore.value,total:total.value} = data);
    }

    const refresh = async ()=>{
        loading.value = true
        page.value = defaultPage()
        try{
            const data = await request();
            updatePagination(data)
            list.value=[[],data.list]
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
            const data = await request();
            updatePagination(data)
            list.value[page.value.num] = data.list
            return data.list
        }finally{
            loading.value =false
        }
    }

    const goPageNum = async (num:number)=>{
        loading.value = true
        page.value.num=num
        try{
            const data = await request();
            updatePagination(data)
            list.value[page.value.num] = data.list
            return data.list
        }finally{
            loading.value =false
        }
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
    }
    provide('list',result)
    return result
}
export function useList<T>(url: string) {
    const list:Ref<T[]> = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    const total = ref(0)
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
            ({hasMore:hasMore.value,total:total.value} = data);
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

    const result = {
        list,
        refresh,
        loading,
        nextPage,
        hasMore,
        total,
    }
    provide('list',result)
    return result
}