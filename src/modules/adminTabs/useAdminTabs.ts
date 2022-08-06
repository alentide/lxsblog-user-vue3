import router from "@/router"
import { type Ref, ref, computed, watch, onMounted, onBeforeUnmount } from "vue"
import useAdminMenu from "../adminMenu/useAdminMenu"
import { useNav } from "../nav/useNav"
import type { RendererElement, RendererNode, VNode } from 'vue';
import bus from './changeHistory.js'
import { useRoute, useRouter } from "vue-router";


const { fetchMenu, menu, findMenu } = useAdminMenu()

export type TabComponent = VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>
interface Tab {
    title: string
    fullPath: string
    closable: boolean
    component: TabComponent | null
}

const storeRef = (key: string, data: Ref<any>) => {
    const old = localStorage.getItem(key)
}

const tabs: Ref<Tab[]> = ref([
    {
        title: '首页',
        fullPath: '/admin',
        closable: false,
        component: null
    }
])

const current = ref('')

const currentIndex = computed(() => {
    return tabs.value.findIndex(existsTab => existsTab.fullPath === current.value)
})

const currentTab = computed(()=>tabs.value[currentIndex.value])



const add = async (fullPath: string, title: string = '无标题') => {
    current.value = fullPath
    if (!tabs.value.find(existsTab => existsTab.fullPath === fullPath)) {
        tabs.value.push({
            title: (await findMenu(m => m.key === fullPath))?.title || title,
            fullPath,
            closable: true,
            component: null
        })
    }
}

const addComponent = (fullPath: string, component: TabComponent) => {
    let i = tabs.value.findIndex(existsTab => existsTab.fullPath === fullPath)
    if (i === -1) {
        add(fullPath)
    }
    const tab = tabs.value[i]
    if (tab.component) return tab.component
    return tabs.value[i].component = component
}
const remove = (fullPath: string) => {

    let i
    if ((i = tabs.value.findIndex(existsTab => existsTab.fullPath === fullPath)) !== -1) {
        tabs.value.splice(i, 1)
    }
    let lastFullPath = tabs.value.slice(-1)[0]?.fullPath

    router.push(lastFullPath)
}



const pop = () => {
    remove(current.value)
}

const go = (fullPath: string, title: string) => {
    // current.value=fullPath
    add(fullPath, title)
    router.push(fullPath)

}



export default () => {
    // const route = useRoute()
    // const changeCurrentTabFullPath = () => {
    //     tabs.value[currentIndex.value].fullPath = route.fullPath
    // }

    // onMounted(() => {
    //     bus.on(changeCurrentTabFullPath)
    // })

    // onBeforeUnmount(() => bus.off(changeCurrentTabFullPath))



    return {
        current,
        tabs,
        add,
        remove,
        go,
        pop,
        currentIndex,
        currentTab,
        addComponent,
    }
}