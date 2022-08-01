import type {Ref } from "vue"
interface AsyncFunction {
    (...args: any[]): Promise<unknown>
}

export const loadingHoc = (loading: Ref<boolean>, method: AsyncFunction) => {
    loading.value = true
    return async function (...args: any[]) {
        loading.value = true
        try {
            return await method(...args)
        } finally {
            loading.value = false
        }
    }

}