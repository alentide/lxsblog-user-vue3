
import { computed, onMounted, ref, watch, type Ref } from "vue"
import { useRoute } from "vue-router"
import useAdminTabs from "../adminTabs/useAdminTabs"
import { http } from "../http"
import { emptyImage } from "../upload/useImageUploader"
import type { CreateArticleDto, UpdateArticleDto } from "./article.interfaces"

export const useArticleForm = () => {
    const form: Ref<CreateArticleDto> = ref({
        title: '',
        summary: '',
        coverImage: {
            id: 0,
            src: '',
        },
        content: '',
    })
    const save = async () => {
        const res = await http.post('/articles', form.value)
        console.log('res', res);
        return res
    }
    return {
        form,
        save,
    }
}

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
    coverImage: null,
    content: '',
})

/**
 * 用于新建文章的表单
 * @returns 
 */
export const useArticleNewForm = () => {
    const form: Ref<CreateArticleDto> = ref({
        ...emptyArticleForm(),
        content: getArticleFormFromCache(),
    })
    cacheArticleForm(form)

    const loading = ref(false)
    const save = async () => {
        loading.value = true
        try {
            const res = await http.post('/articles', form.value)
            return res
        } finally {
            loading.value = false
        }

    }

    /**
     * 对于新建表单来说，fetch啥也不做
     */
    const fetch = async () => {

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
            const res = await http.get<UpdateArticleDto>('/articles/' + id)
            form.value = {
                ...res.data,
                // coverImage: res.data.coverImage || emptyImage()
            }
            return res
        } finally {
            initLoading.value = false
        }

    }
    const save = async () => {
        loading.value = true
        try {
            const res = await http.patch('/articles/' + form.value.id, form.value)
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