import { ref, type Ref } from "vue";



const fetchMenu = async () => {
    return [
        {
            key: "/admin/article",
            title: "文章管理",
            children: [
                { key: "/admin/article/edit", title: "新建文章" },
                { key: "/admin/article/list", title: "文章列表" },
                { key: "/admin/article/draft", title: "草稿箱" },
            ],
        },
        {
            key: "/admin/category",
            title: "分类管理",
            children: [
                { key: "/admin/category/edit", title: "新建分类" },
                { key: "/admin/category/list", title: "分类列表" },
            ],
        },
        {
            key: "/admin/tag",
            title: "标签管理",
            children: [
                { key: "/admin/tag/edit", title: "新建标签" },
                { key: "/admin/tag/list", title: "标签列表" },
            ],
        },
        {
            key: "/admin/comment",
            title: "评价管理",
            children: [{ key: "/admin/comment/list", title: "评价列表" }],
        },
    ];
};

interface MenuItem {
    key: string
    title: string
    children?: MenuItem[],
}

const menu: Ref<MenuItem[]> = ref([
    {
        key: "/admin/article",
        title: "文章管理",
        children: [
            { key: "/admin/article/edit", title: "新建文章" },
            { key: "/admin/article/list", title: "文章列表" },
            { key: "/admin/article/draft", title: "草稿箱" },
        ],
    },
    {
        key: "/admin/category",
        title: "分类管理",
        children: [
            { key: "/admin/category/edit", title: "新建分类" },
            { key: "/admin/category/list", title: "分类列表" },
        ],
    },
    {
        key: "/admin/tag",
        title: "标签管理",
        children: [
            { key: "/admin/tag/edit", title: "新建标签" },
            { key: "/admin/tag/list", title: "标签列表" },
        ],
    },
    {
        key: "/admin/comment",
        title: "评价管理",
        children: [{ key: "/admin/comment/list", title: "评价列表" }],
    },
]);

const findMenu = (callback: (...args: any[]) => any, lastMenu = menu.value) => {
    console.log('lastMenu', lastMenu);

    return lastMenu.find(m => {
        console.log('callback(m)',m,callback(m));
        
        if (callback(m)) return callback(m)
        if (m.children) return findMenu(callback, m.children)
    })
}


export default () => {




    return {
        findMenu,
        fetchMenu,
        menu,
    }
}