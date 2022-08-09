import { useList, usePageList } from '@/modules/list';
import { reactive, ref, toRefs, type Ref } from 'vue';
import { userHttp } from '../http';
import { loadingMethod } from '../loading';
import type { ArticleDfe } from './article.interfaces';


export * from './useArticleSearch'



const useArticleScore = (article) => {

    const scoreUserNum = ref(article.scoreUserNum)
    const averageScore = ref(article.averageScore)
    const currentUserScore = ref(article.currentUserScore)

    const giveScoreLoading = ref(false)

    const giveScore = async (score: number) => {
        if (article.currentUserScore) throw '您已经打过分了！'
        if (giveScoreLoading.value) return Promise.reject('打分中')
        giveScoreLoading.value = true
        try {
            const res = await userHttp.post('article-scores/score', {
                articleId: article.id,
                score,
            })
            article.scoreUserNum = res.data.scoreUserNum
            article.averageScore = res.data.averageScore
            article.currentUserScore = res.data.currentUserScore
        } finally {
            giveScoreLoading.value = false
        }
    }

    return {
        giveScore,
        // scoreUserNum,
        // averageScore,
        // currentUserScore,
        giveScoreLoading,
    }

}


interface CreateArticleDto {
    title: string
    summary:string
}

export const useArticle = (article={}) => {
    
    const state = reactive({
        id: '',
        title: '',
        summary: '',
        content: '',
        scoreUserNum: 0,
        averageScore: 0,
        tags: [],
        category: {
            id: 0,
            name: ''
        },
        coverImage: {
            id: 0,
            src: ''
        },
        currentUserScore: '',
        viewNum: 0,
        commentNum: 0,
    })
    Object.assign(state,article)
    const refState = toRefs(state)

    const _fetch = async (id: number) => {
        return await userHttp.get<CreateArticleDto>('articles/' + id)
    }

    const [loading, initAsync] = loadingMethod(async (id: number) => {
        const res = await _fetch(id)   
        Object.assign(state,res.data)
        return res
    })

    return reactive({
        loading,
        ...refState,
        initAsync,
        ...useArticleScore(state)
    })
}

export function getHomeArticleList() {
    return useList('/articles/home', {
        http: userHttp,
        transform:useArticle
    })
}


// createTime: "2022-08-04 22:00:56"
// id: 48
// score: 2
// updateTime: "2022-08-04 22:00:56"

/**
 * 评分文章
 * @param id 
 * @param score 
 * @returns 
 */
export function scoreArticle(id: number, score: number) {
    return userHttp.post('article-scores/score', {
        articleId: id,
        score,
    })
}


/**
 * 加文章阅读量
 */
export const addArticleViewNum = (id:number|string)=>{
   return  userHttp.get('articles/view/'+id)
}

