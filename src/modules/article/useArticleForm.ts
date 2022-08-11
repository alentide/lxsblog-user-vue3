
import router from "@/router"
import { computed, onMounted, ref, watch, type Ref } from "vue"
import { useRoute } from "vue-router"
import useAdminTabs from "../adminTabs/useAdminTabs"
import { adminHttp } from "../http"
import { emptyImage } from "../upload/useImageUploader"
import type { ArticleDfe, CreateArticleDto, UpdateArticleDto } from "./article.interfaces"


/**
 * 从缓存中提取草稿文章
 */
const getArticleFormFromCache = () => {
    return localStorage.getItem('caogao') || ''

}

/**
 * 缓存未提交的文章
 */
const cacheArticleForm = (form: Ref<CreateArticleDto>) => {
    watch(form.value, (newVal) => {
        localStorage.setItem("caogao", newVal.content);
    });
    onMounted(() => {
        form.value.content = localStorage.getItem("caogao") || "";
    });
}

const emptyArticleForm = () => ({
    title: '',
    summary: '',
    coverImage: undefined,
    content: '',
    category: undefined,
    tags: [],
})

/**
 * 用于新建文章的表单
 * @returns 
 */
export const useArticleNewForm = () => {
    const form: Ref<CreateArticleDto> = ref({
        ...emptyArticleForm(),
        // content: getArticleFormFromCache(),
    })
    // cacheArticleForm(form)

    const loading = ref(false)
    const save = async () => {
        loading.value = true
        try {
            const res = await adminHttp.post<ArticleDfe>('/articles', form.value)
            return res
        } finally {
            loading.value = false
        }

    }

    /**
     * 对于新建表单来说，fetch啥也不做
     */
    const fetch = async () => {
        return form.value
    }

    return {
        form,
        save,
        loading,
        fetch,
    }
}




/**
 * 用于更新文章的表单
 * @returns 
 */
export const useArticleEditForm = () => {
    const route = useRoute()
    const id = parseInt(route.params.id as string)

    const form: Ref<UpdateArticleDto> = ref({
        id: 0,
        ...emptyArticleForm(),
    })


    const loading = ref(false)

    const initLoading = ref(false)
    const fetch = async () => {
        initLoading.value = true
        try {
            const res = await adminHttp.get<UpdateArticleDto>('/articles/' + id)
            form.value = {
                ...res.data,
                // coverImage: res.data.coverImage || emptyImage()
            }
            return res.data
        } finally {
            initLoading.value = false
        }

    }
    const save = async () => {
        loading.value = true
        try {
            const res = await adminHttp.patch<ArticleDfe>('/articles/' + form.value.id, form.value)
            return res
        } finally {
            loading.value = false
        }

    }
    
    return {
        form,
        save,
        loading,
        fetch,
        initLoading,
    }
}


const enum ArticleFormType {
    'NEW',
    'EDIT'
}

type  NewFormType = ReturnType <typeof useArticleNewForm>

export function useAutoCreateArticleForm():NewFormType {
    const type = ref(ArticleFormType.NEW)

    const createForm = useArticleNewForm()
    const editForm = useArticleEditForm()

    const adminTabs =  useAdminTabs()
    const getCurrentForm = ()=>{
        if(type.value===ArticleFormType.NEW) return createForm
        if(type.value===ArticleFormType.EDIT) return editForm
        else return editForm
    }
    const form = computed(()=>{
        return getCurrentForm().form.value
    })

    const save = async ()=>{
        const res = await getCurrentForm().save()
        if(type.value===ArticleFormType.NEW){
            editForm.form.value=res.data
            type.value=ArticleFormType.EDIT
            const newFullPath = '/admin/article/edit/'+res.data.id
            history.replaceState(null,'',newFullPath)
            adminTabs.tabs.value[adminTabs.currentIndex.value].fullPath = newFullPath
            // router.replace(newFullPath)
        }
        return res
        
    }
    const loading = computed(()=>getCurrentForm().loading.value)
    const fetch = ()=>{
        return getCurrentForm().fetch()
    }

    return {
        form,
        save,
        loading,
        fetch,
    }

}