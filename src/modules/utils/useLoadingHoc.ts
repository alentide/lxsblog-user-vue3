// @ts-nocheck
import { ref } from "vue"

export const useLoadingHoc = () => {
    const loading = ref(false)
    const show = () => loading.value = true
    const hide = () => loading.value = false
    function loadingHoc<T extends (...args: any[]) => Promise<any> >(fn: T):T extends (...args: any[]) => infer Return? (...args: any[]) =>Return : (...args: any[]) =>any{
        return async (...args: any[]) => {
            loading.value = true
            try {
                const res = await fn(...args) 
                return res 
            } finally {
                loading.value = false
            }
        }
    }
    return {
        loading,
        show,
        hide,
        loadingHoc,
        
    }
}