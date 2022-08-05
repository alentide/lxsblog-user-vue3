import { useList, usePageList } from '@/modules/list';
import { reactive, ref, toRefs, type Ref } from 'vue';
import { userHttp } from '../http';
import { loadingMethod } from '../loading';
import type { ArticleDfe } from './article.interfaces';




const useArticleScore = (article) => {
    const scoreUserNum = ref(article.scoreUserNum)
    const averageScore = ref(article.averageScore)
    const currentUserScore = ref(article.currentUserScore)

    const giveScoreLoading = ref(false)

    const giveScore = async (score: number) => {
        if (currentUserScore.value) throw '您已经打过分了！'
        if (giveScoreLoading.value) return Promise.reject('打分中')
        giveScoreLoading.value = true
        try {
            const res = await userHttp.post('article-scores/score', {
                articleId: article.id,
                score,
            })
            scoreUserNum.value = res.data.scoreUserNum
            averageScore.value = res.data.averageScore
            currentUserScore.value = res.data.currentUserScore
        } finally {
            giveScoreLoading.value = false
        }
    }

    return {
        giveScore,
        scoreUserNum,
        averageScore,
        currentUserScore,
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
        category: null,
        coverImage: null,
        currentUserScore: null
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

    return {
        loading,
        ...article,
        ...refState,
        initAsync,
        ...useArticleScore(state)
    }
}

export function getHomeArticleList() {
    return useList('/articles/home', {
        http: userHttp,
        transform(list) {

            return list.map(useArticle)
        }
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