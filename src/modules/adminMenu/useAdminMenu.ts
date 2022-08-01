import { ref, type Ref } from "vue";
import { adminHttp } from "../http";



const fetchMenu = async () => {
    const res = await adminHttp.get<MenuItem[]>('/menus')
    return res.data
};

interface MenuItem {
    key: string
    title: string
    children?: MenuItem[],
}

const menu: Ref<MenuItem[]> = ref([]);


async function findMenu(callback: (...args: any[]) => any, lastMenu = menu.value) {
    if (!lastMenu.length) {
        menu.value = await fetchMenu()
        lastMenu = menu.value
    }
    const flatMenu: MenuItem[] = []
    lastMenu.forEach((m)=>{
        flatMenu.push(m)
        if(m.children && m.children.length){
            flatMenu.push(...m.children)
        }
    })
    return flatMenu.find(callback)
    let result
    lastMenu.some(m => {
        if (callback(m)) {
            result = m
            return true;
        }
        if (m.children) {
            console.log('m', m);
            return result = findMenu(callback, m.children);
        }
    });
    console.log('result', result);

    return result
}


export default () => {

    return {
        findMenu,
        fetchMenu,
        menu,
    }
}