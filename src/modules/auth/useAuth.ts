import router from "@/router"
import { useStorage, type RemovableRef } from "@vueuse/core"
import { computed,reactive } from "vue"
import { userHttp } from "../http"
import { EmptyUser, User, UserTypes,  } from "../user"

export const useAuth = () => {
    const user: RemovableRef<User> = useStorage('user', new EmptyUser)
    const token = useStorage('token', '')
    const isLogin = computed(() => !!token.value)

    const updateUserByRes = (res: { data: { user: User | null | undefined } })=>{
        user.value = res.data.user
    }
    const updateTokenByRes = (res: { data: any })=>{
        setToken(res.data.token.access_token) 
    }
    const updateAuthByRes = (res: { data: any })=>{
        updateUserByRes(res)
        updateTokenByRes(res)
    }
    /**
     * 获取一个游客账号
     * @returns 
     */
    async function fetchTourist() {
        return await userHttp.post<{
            user: User,
            token: {
                access_token: string
            }
        }>('auth/register/tourist')
    }
    /**
     * 设置token
     * @param data 
     */
    function setToken(data: string) {
        token.value = 'Bearer ' + data
    }
    const hasToken = computed(() => token.value !== 'Bearer ' && token.value)
    function clearToken() {
        token.value = ''
    }
    /**
     * 准备好游客账号：获取游客账号，并保存。
     */
    async function prepareTouristAccount() {
        const res = await fetchTourist()
        user.value = new User(res.data.user)
        setToken(res.data.token.access_token)

    }
    const isTourist = computed(() => isLogin.value && user.value.type === UserTypes.TOURIST)
    const isAdmin = computed(() => isLogin.value && user.value.type === UserTypes.ADMIN)
    const isUser = computed(() => isLogin.value && user.value.type === UserTypes.USER)

    function logout() {
        user.value = new EmptyUser()
        clearToken()
        router.replace('/')
    }

    return reactive({
        user,
        token,
        isLogin,
        setToken,
        hasToken,
        clearToken,
        prepareTouristAccount,
        isTourist,
        isAdmin,
        isUser,
        logout,
        updateAuthByRes,
    })
}

