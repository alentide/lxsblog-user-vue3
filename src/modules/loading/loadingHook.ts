import { ref, type Ref } from "vue";
import {loadingHoc} from './loadingHoc'
/**
 * 将hook指定的方法包装在loading之下
 * @param methods 
 * @param useHook 
 * @returns 
 */
export function loadingHook<T extends (...args: any[]) => any>(methods: string[], useHook: T): (...args: any[]) => { loading: Ref<boolean>; } & ReturnType<T> {
    const loading = ref(false)
    return function (...args: any[]) {
        return {
            loading,
            ...Object.fromEntries(Object.entries(useHook(...args)).map(([key, value]) => {
                if (methods.includes(key)) {
                    // @ts-ignore
                    return [key, loadingHoc(loading, value)]
                }
                return [key, value]
            })) as any as ReturnType<T>
        }
    }
}

