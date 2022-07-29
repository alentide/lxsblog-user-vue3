
import { ref, type Ref } from "vue"
import { http } from "../http"
import type { CreateArticleDto } from "./article.interfaces"

export const useArticleForm = ()=>{
    const form:Ref<CreateArticleDto> = ref({
        title: '',
        summary: '',
        coverImageSrc: '',
        content: '',
    })
    const save = async ()=>{
       const res = await  http.post('/articles',form.value)
        console.log('res',res);
       return res
    }
    return {
        form,
        save,
    }
}