import { reactive, ref, computed } from 'vue';
import { useTouristRegisterForm } from './useTouristRegisterForm';
import { useUserLoginForm } from './useUserLoginForm';
import { useUserRegisterForm } from './useUserRegisterForm';


/**
 * modal的类型
 */
const enum AuthModalType {
    /**
     * 登录
     */
    LOGIN,
    /**
     * 注册
     */
    REGISTER
}

interface Auth {
    updateAuthByRes(res: any): void; prepareTouristAccount?: () => Promise<void>; notifyUsingTouristAccount?: () => void; user: any; token: any; isLogin?: any; setToken?: any; hasToken?: any; clearToken?: any; isTourist: any; isAdmin?: any; isUser?: any; logout?: any;
}


export const useAuthModal = (auth: Auth) => {
    const authModalType = ref(AuthModalType.LOGIN)
    const visible = ref(false)
    const form = reactive({
        email: '',
        password: '',
    })


    //表单展示
    const showLogin = () => {
        authModalType.value = AuthModalType.LOGIN
        visible.value = true

    }
    const showRegister = () => {
        authModalType.value = AuthModalType.REGISTER
        visible.value = true
    }
    const hide = () => {
        visible.value = false
    }

    const userLoginForm = useUserLoginForm(form)

    const touristRegisterForm = useTouristRegisterForm(form)
    const userRegisterForm = useUserRegisterForm(form)

    const _getCurrentForm = () => {
        if (authModalType.value === AuthModalType.LOGIN) {
            return userLoginForm
        }
        if (auth.isTourist) {
            return touristRegisterForm
        }
        return userRegisterForm
    }
    const title = computed(() => _getCurrentForm().title)
    const submitBtnName = computed(() => _getCurrentForm().submitBtnName)
    const loading = computed(() => _getCurrentForm().loading)
    const submit = async () => {
        const res = await _getCurrentForm().submit()
        auth.updateAuthByRes(res)
        hide()
    }

    return reactive({
        //共同内容
        visible,
        form,
        //modal展示部分
        showLogin,
        showRegister,
        hide,
        //modal功能部分
        title,
        submit,
        submitBtnName,
        loading,
    })
}