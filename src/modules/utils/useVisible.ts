import { ref } from "vue"

export default (_visible:boolean=false)=>{
    const visible = ref(_visible)
    const show = ()=>visible.value =true
    const hide = ()=>visible.value =false
    return {
        visible,
        show,
        hide,
    }
}