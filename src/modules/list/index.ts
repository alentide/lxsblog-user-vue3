import { getCurrentInstance, onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export * from './useList'
export * from './usePageList'
export * from './usePageList2'




export const onReachBottom = (callback: (...args: any[]) => any,el:Ref<HTMLElement|null>  =ref(document.documentElement)) => {
    
    const handler = () => {
        if(!el.value) return
        if (
            el.value.scrollHeight -
            el.value.clientHeight -
            el.value.scrollTop <
            50
        ) {
            callback()
        }
    };
    onMounted(() => {
        if(!el.value) return
        if(el.value === document.documentElement){
            window.addEventListener("scroll", handler);
        }else {
            el.value.addEventListener("scroll", handler);
        }
        
    });
    onBeforeUnmount(() => {
        if(!el.value) return
        if(el.value === document.documentElement){
            window.removeEventListener("scroll", handler);
        }else {
            el.value.removeEventListener("scroll", handler);
        }
    });
}