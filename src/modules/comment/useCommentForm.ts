import { reactive, ref } from "vue"


export interface CommentFormOption {
    submitRequest?: (content: string) => Promise<unknown>
    afterSubmit?: (...args: unknown[]) => unknown
}

export const defaultCommentFormOption = () => ({
    submitRequest: async (content: string) => { },
    afterSubmit: () => { }
})

export const useCommentForm = (commentFormOption: CommentFormOption={}) => {
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