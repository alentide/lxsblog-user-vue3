import { ref } from "vue"


interface AsyncFunction {
    (...args: any[]): Promise<unknown>
}



export const loadingMethod = (method: AsyncFunction)=>{
    const loading = ref(false)
    
    const decoratedMethod = (...args:unknown[])=>{
        loading.value=true
        return method(...args).finally(()=>loading.value=false)
    }
    
    return [
        loading,
        decoratedMethod,
    ] as const
}