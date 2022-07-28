import { ref } from "vue"

export default ()=>{
    const loading = ref(false)
    const show = ()=>loading.value =true
    const hide = ()=>loading.value =false
    return {
        loading,
        show,
        hide,
    }
}