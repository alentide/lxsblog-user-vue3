// import { mergeDeepLeft } from "ramda"
// import { ref, type Ref } from "vue"
// import { http } from "../http"
// import type { ListResponseData } from "../http/http.interfaces"

// /**
//  * 筛选时，所使用的类型。
//  */
// const enum FilterType {
//     /**
//      * 单个相等性判断，比如a=b
//      */
//     'SINGLE_EQUAL' = 'singleEqual',
//     /**
//      * 判断是否在数组中，比如 in (1,2,3)
//      */
//     'IN_ARRAY' = 'inArray',
//     /**
//      * 判断是否包含某内容，比如 like '%a%'
//      */
//     'SINGLE_LIKE' = 'singleLike'
// }

// interface OwnFieldFilter {
//     value: unknown,
//     type: FilterType,
// }

// interface RelationFieldFilter {
//     [key: string]: {
//         value: unknown,
//         type: FilterType,
//     }
// }

// type FieldFilter = OwnFieldFilter | RelationFieldFilter
// interface FieldFilters {
//     [key: string]: FieldFilter
// }


// interface TableListOriginConfig {
//     url: string,
//     filter?: FieldFilters
// }
// type TableListConfig = Required<TableListOriginConfig>

// interface Pagination {
//     current: number;
//     pageSize: number;
//     total: number;
// }

// interface TableFilterOption {
//     [key: string]: any[] | null
// }

// interface Sorter {
//     column?: {
//         dataIndex: string;
//         sortDirections: string[];
//         sorter: (a: any, b: any) => number;
//         title: string;
//         sortKey?: string,
//         filterKey?: string
//     };
//     columnKey?: undefined;
//     field: string;
//     order?: 'descend' | 'ascend';
// }




// function isOwnFieldFilter(filter: FieldFilter): filter is OwnFieldFilter {
//     return filter.type && !(filter.type as unknown as RelationFieldFilter).type
// }

// // function isRelationFieldFilter(filter: FieldFilter): filter is RelationFieldFilter {
// //     return !isOwnFieldFilter(filter)
// // }


// function removeNullValueFilterField(filters: FieldFilters): [string, FieldFilter][] {
//     return Object.entries(filters).filter(([key, filter]) => {
//         if (isOwnFieldFilter(filter)) {
//             return filter.value
//         } else {
//             return true
//         }
//     }).map(([key, filter]) => {
//         if (isOwnFieldFilter(filter)) {
//             return [key, filter]
//         } else {
//             return [key, Object.fromEntries(removeNullValueFilterField(filter) as any)]
//             // return [key,filter]
//         }
//     })
// }

// function initFilter(filters: FieldFilters | undefined): FieldFilters {
//     if (filters == null)
//         return {}
//     return Object.fromEntries(removeNullValueFilterField(filters))
// }



// function initConfig(config: TableListOriginConfig): TableListConfig {

//     return {
//         url: config.url,
//         filter: initFilter(config.filter)
//     }
// }


// interface PageState {
//     num: Number
//     limit: Number
// }
// const defaultPage = () => ({
//     num: 1,
//     limit: 10
// })

// function mapListDataAddKeyField<T extends { id: number }>(data: ListResponseData<T>) {
//     return {
//         ...data,
//         list: data.list.map(m => ({
//             ...m,
//             key: m.id,
//         }))
//     }
// }

// const listHttp = (page: PageState) => {

// }

// export function useTableList<T extends { id: number }>(config: TableListOriginConfig) {
//     const { url, filter } = initConfig(config)
//     function useListRequest<T extends { id: number }>(url: string) {
//         const page = ref(defaultPage())
//         const request = async (options: any = {}) => {
//             const { data } = await http.get<ListResponseData<T>>(url, {
//                 pageNum: page.value.num,
//                 pageLimit: page.value.limit,
//                 ...mergeDeepLeft(options, filter,)
//             })
//             return mapListDataAddKeyField<T>(data)
//         }
//     }
//     return {
//         page,
//         request,
//     }
// }




// const list: Ref<T[][]> = ref([])
// const loading = ref(false)
// const hasMore = ref(true)
// const total = ref(0)


// let sortOption: SortOption = {}

// let filterOption = {

// }

// const { page, request: _request } = useListRequest<T>(url)
// const request = () => _request({
//     sort: sortOption,
//     filter: filterOption,
// })

// const columns = [
//     {
//         title: "标题",
//         dataIndex: "title",
//         key: "title",
//         sorter: true,
//         sortDirections: ["descend", "ascend"],
//         width: "400px",
//         customFilterDropdown: true,
//         filterKey: 'title',
//         filterType: 'SingleLike',
//         isRelationFilter: false
//     }
// ]





// const currentList = computed(() => list.value[page.value.num])

// const pagination = computed(() => ({
//     total: total.value,
//     pageSize: page.value.limit
// }))

// const updatePagination = (data: ListResponseData<T>) => {
//     ({ hasMore: hasMore.value, total: total.value } = data);
// }

// const refresh = async () => {
//     loading.value = true
//     // page.value = defaultPage()
//     try {
//         const data = await request();
//         updatePagination(data)
//         list.value[page.value.num] = data.list
//         return data.list
//     } finally {
//         loading.value = false
//     }
// }

// const nextPage = async () => {
//     if (!hasMore.value) return []
//     loading.value = true
//     page.value.num++
//     try {
//         const data = await request();
//         updatePagination(data)
//         list.value[page.value.num] = data.list
//         return data.list
//     } finally {
//         loading.value = false
//     }
// }

// const goPageNum = async (num: number) => {
//     loading.value = true
//     page.value.num = num
//     try {
//         const data = await request();
//         updatePagination(data)
//         list.value[page.value.num] = data.list
//         return data.list
//     } finally {
//         loading.value = false
//     }
// }
// const adminTabs = useAdminTabs()

// const go = (record: ArticleDfe) => {
//     adminTabs.go('/admin/article/edit/' + record.id, record.title)
// }


// /**
//  * 转换排序关键字
//  */
// function transformOrderTypeToEndInSorter(sorter: Sorter) {
//     const types = { descend: 'DESC', ascend: 'ASC' } as const
//     const order = sorter.order && types[sorter.order]
//     return {
//         ...sorter,
//         order,
//     }
// }

// /**
//  * 用于显示的字段恢复到真正的字段
//  */
// const keyRevertToPrevious = (key: string) => {
//     return {
//         createTimeDisplayed: 'createTime'
//     }[key] || key
// }

// /**
//  * 当改变排序时
//  * @param sorter 
//  */
// const onChangeSorter = (sorter: Sorter) => {

//     const sorterTransformed = transformOrderTypeToEndInSorter(sorter)
//     if (sorter.column?.sortKey) {
//         sortOption = {
//             [keyRevertToPrevious(sorter.field)]: {
//                 [sorter.column?.sortKey]: sorterTransformed.order
//             }
//         }
//     } else {
//         sortOption = {
//             [keyRevertToPrevious(sorter.field)]: sorterTransformed.order
//         }
//     }

//     if (!sortOption[keyRevertToPrevious(sorter.field)]) {
//         delete sortOption[keyRevertToPrevious(sorter.field)]
//     }
//     console.log('sortOption', sorter, sortOption);

//     // console.log('sorter',sorter);
//     // const sorterTransformed = transformOrderTypeToEndInSorter(sorter)
//     // if(sorter.column?.sortKey){
//     //     sortOption[keyRevertToPrevious(sorter.field)] = {
//     //         [sorter.column?.sortKey]: sorterTransformed.order
//     //     }
//     // }else {
//     //     sortOption[keyRevertToPrevious(sorter.field)] = sorterTransformed.order
//     // }

//     // if(!sortOption[keyRevertToPrevious(sorter.field)]){
//     //     delete sortOption[keyRevertToPrevious(sorter.field)]
//     // }
//     // console.log('sortOption',sorter,sortOption);
// }

// /**
//  * 当改变筛选条件时
//  * @param  filter 
//  */
// const onChangeFilter = (filter: TableFilterOption, sorter: Sorter) => {
//     // if(sorter.column?.filterKey){
//     //     filterOption = 
//     // }


//     filterOption = Object.fromEntries(Object.entries(filter).filter(([key, value]) => value).map(([key, value]) => {

//         const column = columns.find(m => m.dataIndex === key)

//         let type
//         if (column && column.filterType) {
//             type = column.filterType
//         } else {
//             type = 'InArray'
//         }

//         if (column && !column.isRelationFilter) {
//             let resultValue = value
//             if (type === 'SingleLike' || type === 'SingleEqual') {
//                 if (Array.isArray(resultValue)) {
//                     resultValue = resultValue[0]
//                 }
//             }

//             console.log('column.filterKey', column.filterKey);
//             return [
//                 column.filterKey || 'id',
//                 {
//                     type,
//                     value: resultValue
//                 }
//             ]
//         }
//         let filterKey
//         if (column && column.filterKey) {
//             filterKey = column.filterKey
//         } else {
//             filterKey = 'id'
//         }


//         if (type === 'SingleLike') {
//             if (Array.isArray(value)) {
//                 value = value[0]
//             }
//         }
//         return [key, {
//             [filterKey]: {
//                 value: value,
//                 type,
//             }
//         }]
//     }))
//     console.log('filter', filter, '======', sorter);
// }

// /**
//  * 使用a-table时，onChange事件传递该函数即可
//  * @param param0 
//  */
// const onTableChange = ({ current }: Pagination, filter: TableFilterOption, sorter: Sorter) => {
//     onChangeFilter(filter, sorter)
//     onChangeSorter(sorter)
//     return goPageNum(current);
// };


// const remove = async (id: number) => {
//     loading.value = true
//     try {
//         await http.delete(url + '/' + id)
//     } finally {
//         loading.value = false
//     }
//     await refresh()
//     return
// }

// const result = {
//     list,
//     refresh,
//     loading,
//     nextPage,
//     hasMore,
//     total,
//     goPageNum,
//     pagination,
//     currentList,
//     go,
//     onTableChange,
//     remove,
// }
// provide('list', result)
// onMounted(refresh)
// return result
// }

// // /**
// //  * 给<a-table />组件使用的list
// //  */
// // export const useTableList = (config:TableListConfig)=>{
// //     return {
// //         columns,
// //         onChange,
// //         loading,
// //         dataSource,
// //         pagination,
// //         rowSelection
// //     }
// // }



