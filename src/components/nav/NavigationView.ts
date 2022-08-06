import { getCurrentInstance, onMounted, provide, watch } from 'vue';
import { defineComponent, h, onUpdated, type SetupContext, toRefs } from 'vue'
import { string } from 'vue-types';

export const Hello = h('div', 'hello1')

export const H1 = (slots) => h('h1', slots)



export const NavigationView = defineComponent({
    props: {
        fullPath: String,
    },
    setup(props, { slots }: SetupContext) {
        const instance = getCurrentInstance()
        const cacheViews = new Map()
        const get = cacheViews.get.bind(cacheViews)
        // cacheViews.get  = (key:string)=>{
        //     const value = get(key)

        // }

        const {fullPath} = toRefs(props)

        
        const cache = ()=>cacheViews.set(props.fullPath, instance.subTree)
        provide('cacheViews',cacheViews)
        provide('fullPath',fullPath)
        onMounted(cache)
        onUpdated(cache)
        return () => {
            const vnode = slots.default()
            if (cacheViews.has(props.fullPath)) {
                return cacheViews.get(props.fullPath)          
            }
            return vnode
        }
    }
})