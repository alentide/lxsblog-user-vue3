import type { ProjectResponse } from './../http/http.interfaces';
import { reactive, ref } from "vue"
import type { CommentDto } from './dto/CommentDto';


export interface CommentFormOption {
    submitRequest?: (content: string) => Promise<ProjectResponse<CommentDto>>
    afterSubmit (res:ProjectResponse<CommentDto>):any
}

export const defaultCommentFormOption = () => ({
    submitRequest: async (content: string) => ({code: 1,data: null,msg:'未发出请求'}),
    afterSubmit: (res: any) => res
})

export const useCommentForm = (commentFormOption: CommentFormOption) => {
    const {
        submitRequest,
        afterSubmit,
    } = Object.assign(defaultCommentFormOption(), commentFormOption)
    
    const content = ref('')
    const submitLoading = ref(false)

    const submit = async () => {
        submitLoading.value = true
        const res = await submitRequest(content.value).finally(() => submitLoading.value = false)
        content.value=''
        afterSubmit(res)
    }

    return reactive({
        content,
        submitLoading,
        submit,
    })
}