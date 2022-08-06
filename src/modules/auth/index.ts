import { computed } from 'vue';
import router from '@/router';
import { userHttp } from './../http/index';
import { useStorage, type RemovableRef } from '@vueuse/core';
import { EmptyUser, User, UserTypes, type UserType } from '../user';
import { LoginModal } from './LoginModal';

//好像没能自动加入notification的css，所以需要手动加载这个css
import 'ant-design-vue/lib/notification/style/css'
import { notification } from 'ant-design-vue';
import useToast from '../toast/useToast';



class UserDto {
    id!: number
    username!: string
    email!: string
    type!: UserType
}
// class User {
//     id!: number
//     username!: string
//     email!: string
//     constructor(data: UserDto) {
//         Object.assign(this, data)
//     }
//     isEmpty() {
//         return !!this.id
//     }
// }


class AuthModal extends LoginModal {

    user: RemovableRef<User> = useStorage('user', new EmptyUser)
    token = useStorage('token', '')
    toast = useToast()
    constructor(user, token) {
        super()
        this.user = user
        this.token = token
    }
    async login() {
        return super.login().then(res => {
            this.user.value = new User(res.data.user)
            this.token.value = 'Bearer ' + res.data.token.access_token
            this.toast.success('登录成功')
            this.hide()
            return res
        })
    }
}





class Auth {
    user: RemovableRef<User> = useStorage('user', new EmptyUser)
    token = useStorage('token', '')
    get isLogin() {
        return !!this.token.value
    }
    /**
     * 获取一个游客账号
     * @returns 
     */
    async fetchTourist() {
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
    setToken(data: string) {
        this.token.value = 'Bearer ' + data
    }
    get hasToken() {
        return this.token.value !== 'Bearer ' && this.token.value
    }
    clearToken() {
        this.token.value = ''
    }
    /**
     * 准备好游客账号：获取游客账号，并保存。
     */
    async prepareTouristAccount() {
        const res = await this.fetchTourist()
        this.user.value = new User(res.data.user)
        this.setToken(res.data.token.access_token)

    }
    isTourist() {
        return this.isLogin && this.user.value.type === UserTypes.TOURIST
    }
    isAdmin() {
        return this.isLogin && this.user.value.type === UserTypes.ADMIN
    }
    isUser() {
        return this.isLogin && this.user.value.type === UserTypes.USER
    }
    logout() {
        this.user.value = new EmptyUser()
        this.clearToken()
        router.replace('/')
    }
}

class AuthComponent extends Auth {
    async prepareTouristAccount() {
        await super.prepareTouristAccount()
        this.notifyUsingTouristAccount()
    }
    /**
     * 警告正在使用游客账户
     */
    notifyUsingTouristAccount() {
        notification.warning({
            message: '警告！',
            description:
                '您正在使用游客账号。您可以点赞，评论。如果不转为正式账号，一旦清空缓存，无法找回。',
            duration: 0,
        });
    }
}

// export const auth = new AuthComponent()

export const useAuth = () => {
    const user: RemovableRef<User> = useStorage('user', new EmptyUser)
    const token = useStorage('token', '')
    const isLogin = computed(() => !!token.value)
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
    const isTourist = computed(() => isLogin && user.value.type === UserTypes.TOURIST)
    const isAdmin = computed(() => isLogin && user.value.type === UserTypes.ADMIN)
    const isUser = computed(() => isLogin && user.value.type === UserTypes.USER)

    function logout() {
        user.value = new EmptyUser()
        clearToken()
        router.replace('/')
    }

    return {
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
    }
}

export const useAuthView = (auth: ReturnType<typeof useAuth>) => {
    async function prepareTouristAccount() {
        await auth.prepareTouristAccount()
        notifyUsingTouristAccount()
    }
    /**
     * 警告正在使用游客账户
     */
    function notifyUsingTouristAccount() {
        notification.warning({
            message: '警告！',
            description:
                '您正在使用游客账号。您可以点赞，评论。如果不转为正式账号，一旦清空缓存，无法找回。',
            duration: 0,
        });
    }
    return {
        ...auth,
        prepareTouristAccount,
        notifyUsingTouristAccount,
    }
}

export const auth = useAuthView(useAuth())


export const authModal = new AuthModal(auth.user,auth.token)
export const loginModal = authModal