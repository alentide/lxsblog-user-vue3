import { reactive } from 'vue';
import { userHttp } from '../http';


export const useHighestViewNumArticleList = ()=>{
    userHttp.get
    
    return reactive({
        list,
        refresh,
    })
}