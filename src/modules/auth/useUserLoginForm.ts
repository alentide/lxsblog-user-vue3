import { useUserPost } from "../http"
import type { User } from "../user"
import {reactive} from 'vue'

export interface LoginResData {
    token: {
        access_token: string,
    },
    user: User
}
export const useUserLoginForm = (form: { email: string; password: string }) => {
    const title = '登录'
    const submitBtnName = '登录'
    const { loading, request: submit } = useUserPost<LoginResData>('auth/login', form)
    
    return reactive({
        title,
        submitBtnName,
        loading,
        submit,
    })
}