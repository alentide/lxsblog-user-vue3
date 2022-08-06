import { getCurrentInstance, onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export * from './useList'
export * from './usePageList'




export const onReachBottom = (callback: (...args: any[]) => any,el:Ref<HTMLElement|null>  =ref(document.documentElement)) => {
    
    const handler = (e) => {
        console.log('e',e);
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
        console.log('el',el);
        el.value.addEventListener("scroll", handler);
    });
    onBeforeUnmount(() => {
        if(!el.value) return
        // el.value.removeEventListener("scroll", handler);
    });
}