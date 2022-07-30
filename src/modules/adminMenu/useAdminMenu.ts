import { ref, type Ref } from "vue";
import { http } from "../http";



const fetchMenu = async () => {
    const res = await http.get<MenuItem[]>('/menus')
    return res.data
};

interface MenuItem {
    key: string
    title: string
    children?: MenuItem[],
}

const menu: Ref<MenuItem[]> = ref([]);


async function findMenu(callback: (...args: any[]) => any, lastMenu = menu.value) {
    if(!lastMenu.length){
       menu.value =  await fetchMenu()
       lastMenu = menu.value
    }
    let result 
     lastMenu.some(m => {
        if (callback(m)){
            result = m
            return true;
        }
        if (m.children)
            return result = findMenu(callback, m.children);
    });

    return result
}


export default () => {

    return {
        findMenu,
        fetchMenu,
        menu,
    }
}