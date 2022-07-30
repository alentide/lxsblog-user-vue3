import { ref } from "vue"

export const useLoadingHoc = () => {
    const loading = ref(false)
    const show = () => loading.value = true
    const hide = () => loading.value = false
    const loadingHoc = (fn:(...args:any[])=>any) => {
        return async () =>  {
            loading.value = true;
            try {
                const res = await fn();
                return res;
            } finally {
                loading.value = false;
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