import { onBeforeUnmount, onMounted } from 'vue';

export * from './useList'
export * from './usePageList'




export const onReachBottom = (callback: (...args: any[]) => any) => {
    const handler = () => {
        if (
            document.documentElement.scrollHeight -
            window.innerHeight -
            document.documentElement.scrollTop <
            50
        ) {
            callback()
        }
    };
    onMounted(() => {
        window.addEventListener("scroll", handler);
    });
    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handler);
    });
}