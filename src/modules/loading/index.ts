import { ref } from "vue"


interface AsyncFunction {
    (...args: any[]): Promise<unknown>
}



export function loadingMethod<P,R>(method: (...args:P[])=>R) {
    const loading = ref(false)

    async function decoratedMethod(...args: P[]) {
        loading.value = true
        try {
            return await method(...args)
        } finally {
            loading.value = false
        }
    }

    return [
        loading,
        decoratedMethod,
    ] as const
}