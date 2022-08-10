import { reactive, ref } from 'vue';
import { useUserPost } from "../http"
import type { LoginResData } from "./useUserLoginForm"

export const useUserRegisterForm = (form: { email: string; password: string })=>{
    const title = '注册'
    const submitBtnName = '注册'
    const { loading, request: submit } = useUserPost<LoginResData>('auth/register/user', form)

    return reactive({
        title,
        submitBtnName,
        loading,
        submit,
    })
}