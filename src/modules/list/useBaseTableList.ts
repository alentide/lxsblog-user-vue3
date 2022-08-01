import { mergeDeepLeft, pick } from "ramda";
import { computed, onMounted, ref, type Ref, provide } from "vue";
import { http } from "../http";
import { usePageList } from "./usePageList";

export interface SortOption {
    [key: string]: 'DESC' | 'ASC' | undefined | SortOption
}



/**
 * 筛选时，所使用的类型。
 */
export const enum FilterType {
    /**
     * 单个相等性判断，比如a=b
     */
    'SINGLE_EQUAL' = 'SingleEqual',
    /**
     * 判断是否在数组中，比如 in (1,2,3)
     */
    'IN_ARRAY' = 'InArray',
    /**
     * 判断是否包含某内容，比如 like '%a%'
     */
    'SINGLE_LIKE' = 'SingleLike',
    
    BETWEEN = 'Between'
}

/**
 * 自定义过滤的选项。
 */
export interface CustomFilter {
    /**
     * 如果获得的资源是另一张表的，需要通过resource指定表名。
     * 比如在查articles时，我想根据标签过滤，那就要获得所有的标签，resource就传tags。
     * 但是如果不是另一张表的，而是当前表的字段，比如搜索article的标题title，那么resource就不传任何东西，
     * 同时，value要指定为title。
     */
    resource: string,
    /**
     * value指定选中选项时，选中的是哪个字段，通常是id。
     */
    value: string,
    /**
     * 指定要展示的字段。
     */
    text: string,
    /**
     * 过滤的方式
     */
    type: FilterType
    /**
     * 如果提供了默认选项，就不会发请求获取。
     */
    options: any[]
    /**
     * 用于存储所有选项的数组。不需要主动设定，内部自己添加该字段。
     */
    refOptions?: Ref<unknown[]>
}

export interface Pagination {
    current: number;
    pageSize: number;
    total: number;
}
export interface Column {
    title: string;
    dataIndex: string;
    key: string;
    sorter: boolean;
    sortDirections: string[];
    width: string;
    customFilterDropdown: boolean;
    filterKey: string;
    // filterType: FilterType;
    filter?: CustomFilter
}
export interface ListConfig {
    columns: Column[]
    filter: {
        [key: string]: CustomFilter
    }
}

export interface Sorter {
    column?: {
        dataIndex: string;
        sortDirections: string[];
        sorter: (a: any, b: any) => number;
        title: string;
        sortKey?: string,
        filterKey?: string
    };
    columnKey?: undefined;
    field: string;
    order?: 'descend' | 'ascend';
}

/**
 * 通过<ATable />拿到的过滤的值
 */
export interface FiltersValues {
    [key: string]: any[] | null
}


export const defaultPage = () => ({
    num: 1,
    limit: 10
})

/**
 * 转换排序关键字
 */
function transformOrderTypeToEndInSorter(sorter: Sorter) {
    const types = { descend: 'DESC', ascend: 'ASC' } as const
    const order = sorter.order && types[sorter.order]
    return {
        ...sorter,
        order,
    }
}



/**
 * 用于显示的字段恢复到真正的字段
 */
const keyRevertToPrevious = (key: string) => {
    return {
        createTimeDisplayed: 'createTime'
    }[key] || key
}

const getRelationFieldSortOption = (sorter: Sorter) => ({
    [keyRevertToPrevious(sorter.field)]: {
        [sorter.column?.sortKey]: transformOrderTypeToEndInSorter(sorter).order
    }
})

const getOwnFieldSortOption = (sorter: Sorter) => ({
    [keyRevertToPrevious(sorter.field)]: transformOrderTypeToEndInSorter(sorter).order
})

const getFieldSortOption = (sorter: Sorter) => {
    if (!transformOrderTypeToEndInSorter(sorter).order) {
        return {}
    }
    else if (sorter.column?.sortKey) {
        return getRelationFieldSortOption(sorter)
    } else {
        return getOwnFieldSortOption(sorter)
    }
}

export const mergeOptions = (page: Ref<{
    num: number;
    limit: number;
}>, { options, config }: { options: any, config: any } = { options: {}, config: {} }) => {
    return {
        pageNum: page.value.num,
        pageLimit: page.value.limit,
        ...mergeDeepLeft(options, config,)
    }
}

const getEnumValues = (enumType: any) => {
    return Object.entries(enumType).filter(([key, value]) => !Number.isInteger(key)).map(([key, value]) => value)
}
// @ts-ignore
const FilterTypeValues = getEnumValues(FilterType) as FilterType[]

/**
 * 从列的信息里得到过滤类型FilterType
 * @param column 
 * @returns 
 */
function getColumnFilterType(column: Column | undefined): FilterType {
    if (column && column.filter && !!FilterTypeValues.find(m => column.filter?.type === m)) {
        return column.filter.type;
    } else {
        return FilterType.IN_ARRAY;
    }
}

/**
 * 得到要筛选的字段
 * @param column 
 * @returns 
 */
const getColumnFilterField = (column: Column | undefined) => {
    if (column && column.filter && column.filter.value) return column?.filter.value
    return 'id'
}

/**
 * 得到要筛选的值
 * @param column 
 * @returns 
 */
const getColumnFilterValue = (type: FilterType | undefined, value: unknown) => {
    if (Array.isArray(value) && [FilterType.SINGLE_LIKE, FilterType.SINGLE_EQUAL].includes(type)) {
        return value[0]
    }
    return value
}


function getFilterFieldOption(type: FilterType, filterValue: any) {
    return {
        value: filterValue,
        type,
    }
}


const initListConfig = (config: ListConfig) => {
    const { columns: columnsOrigin } = config
    const fetchRelations: ((...args: unknown[]) => Promise<unknown>)[] = []

    onMounted(() => {
        fetchRelations.forEach(m => m())
    });

    columnsOrigin.forEach(column => {
        if (column?.filter?.resource) {
            if (!column.filter) return
            const filter = column.filter
            filter.refOptions = ref([])
            const refOptions = filter.refOptions

            //没有默认选项，才会发请求获取
            if(!filter.options){
                fetchRelations.push(() => {
                    return http
                        .list("/" + filter.resource)
                        .then((res) => (refOptions.value = res.data.list));
                })
            }

        }
    })
    const columns = computed(() => {
        return columnsOrigin.map(m => {
            if (m?.filter?.options) return {
                ...m,
                filters: m?.filter?.options
            }

            if (m?.filter?.refOptions) return {
                ...m,
                filters: m.filter.refOptions.value.map((m1) => ({
                    value: m1[m.filter.value],
                    text: m1[m.filter.text]
                }))
            }
            return m
        })
    })



    return {
        ...config,
        columns,
        fetchRelations,
    }
}

/**
 * 当改变筛选条件时
 * @param  filter 
 */

const onChangeFilter = (filter: FiltersValues, columns: any[]) => {
    return Object.fromEntries(Object.entries(filter).filter(([key, value]) => value).map(([key, value]) => {
        const column = columns.find(m => m.dataIndex === key)
        const type = getColumnFilterType(column)
        const filterField = getColumnFilterField(column)
        const filterValue = getColumnFilterValue(type, value)

        const filterFieldOption = getFilterFieldOption(type, filterValue)
        if (column && !column?.filter?.resource) {
            return [
                filterField,
                filterFieldOption,
            ]
        }
        return [key, {
            [filterField]: filterFieldOption,
        }]
    }))
}




/**
 * 当改变排序时
 * @param sorter 
 */
const onChangeSorter = (sorter: Sorter) => {
    return getFieldSortOption(sorter)
}



export function useBaseTableList<T extends { id: number }>(url: string, config: ListConfig) {
    let sortOption: SortOption = {}

    let filterOption = {

    }
    const { columns } = initListConfig(config)
    const baseTableList = usePageList<T>(url)

    const requestExtraOptions = ()=>({
        options: {
            sort: sortOption,
            filter: filterOption,
        },
        config:pick(['filter'],config),
    })

    const refresh = ()=>baseTableList.refresh(requestExtraOptions())
    /**
     * 使用a-table时，onChange事件传递该函数即可
     * @param param0 
     */
    const onTableChange = ({ current }: Pagination, filter: FiltersValues, sorter: Sorter) => {
        console.log('filter',filter);
        filterOption = onChangeFilter(filter, columns.value)
        sortOption = onChangeSorter(sorter)
        return baseTableList.goPageNum(current,requestExtraOptions());
    };

    
    const remove = async (id: number) => {
        await http.delete(url + '/' + id)
        return await refresh()
    }

    const result = {
        ...baseTableList,
        refresh,
        columns,
        onTableChange,
        remove,
    }
    provide('list', result)

    return result
}