import type { ArticleDfe } from "@/modules/article/article.interfaces"
import { http } from "@/modules/http"
import type { ListResponseData } from "@/modules/http/http.interfaces"
import { defaultPage, usePageList } from "@/modules/http/useList"
import { ref } from "vue"


export const useArticleSearch = ()=>{

    const keywords = ref('')
    function useListRequest<T>(url: string) {
        const page = ref(defaultPage())
        const request = async () => {
            const { data } = await http.get<ListResponseData<T>>(url, {
                pageNum: page.value.num,
                pageLimit: page.value.limit,
                keywords: keywords.value,
            })
            return data
        }
        return {
            page,
            request,
        }
    }
    const pageList = usePageList<ArticleDfe>('/articles/search',useListRequest)
    
    
    return {
        ...pageList,
        keywords,
    }
}