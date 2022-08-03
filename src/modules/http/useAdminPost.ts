import { ref, type Ref } from "vue"
import { adminHttp } from "."
import type { ProjectResponse } from "./http.interfaces"

export function useAdminPost<T>(url: string, required: any = {}) {
    const loading = ref(false)
    const result:Ref<ProjectResponse<T>|undefined> = ref()
    const request = (options: any = {}) => {
        loading.value = true
        return adminHttp.post<T>(url, { ...required, ...options, }).then((res: any) => result.value = res).finally(() => {
            loading.value = false
        })
    }
    return {
        loading,
        result,
        request,
    }
}



