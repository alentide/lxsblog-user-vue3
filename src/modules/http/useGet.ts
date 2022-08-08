import { computed, ref, type Ref ,reactive} from "vue";
import type { Http } from ".";
import type { ProjectResponse } from "./http.interfaces";


export function genUseGet(userHttp: Http) {
    return function <T>(url: string, required: any = {}) {
        const loading = ref(false);
        const result: Ref<ProjectResponse<T> | undefined> = ref();
        const data = computed(() => result.value?.data);
        const request = (options: any = {}) => {
            loading.value = true;
            return userHttp.get<T>(url, { ...required, ...options, }).then((res: any) => result.value = res).finally(() => {
                loading.value = false;
            });
        };
        return reactive({
            loading,
            result,
            request,
            data,
        });
    }

}