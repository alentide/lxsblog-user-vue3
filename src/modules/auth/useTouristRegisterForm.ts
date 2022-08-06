import { useUserPost } from "../http"
import type { LoginResData } from "./useUserLoginForm"
import { reactive } from 'vue'


export const useTouristRegisterForm = (form: { email: string; password: string }) => {
    const title = '转为正式账号'
    const submitBtnName = '游客转为正式账号'
    const { loading, request: submit } = useUserPost<LoginResData>('auth/tourist-to-user', form)

    return reactive({
        title,
        submitBtnName,
        loading,
        submit,
    })
}