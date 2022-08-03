import { useList, usePageList } from '@/modules/list';
import { userHttp } from '../http';

export function getHomeArticleList(){
    return useList('/articles/home',{
        http: userHttp,
    })
}