import { ref } from "vue"

export default ()=>{
    const loading = ref(false)
    const nextPage = ()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve([
                    
                ])
            },1000)
        })
    }

    const refresh = ()=>{
        
    }

    return {
        loading,
        nextPage,
    }
}