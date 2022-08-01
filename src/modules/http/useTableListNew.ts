import { andThen, mergeDeepLeft, pipe, tap } from "ramda"
import { computed, onMounted, provide, reactive, ref, type ComputedRef, type Ref } from "vue"
import { http } from "."
import type { FilterOption } from "../list/interfaces/FilterOption.interface"
import type { ListResponseData } from "./http.interfaces"

export const defaultPage = () => ({
    num: 1,
    limit: 10
})


async function requestNew<T>(url: string, options: any) {
    return http.get<ListResponseData<T>>(url, options).then(res => res.data)
}

const mergeOptions = (page: Ref<{
    num: number;
    limit: number;
}>, options: any = {}, config: any) => {
    return {
        pageNum: page.value.num,
        pageLimit: page.value.limit,
        ...mergeDeepLeft(options, config,)
    }
}


interface Sorter {
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


interface SortOption {
    [key: string]: 'DESC' | 'ASC' | undefined | SortOption
}


interface Pagination {
    current: number;
    pageSize: number;
    total: number;
}

interface AsyncFunction {
    (...args: any[]): Promise<unknown>
}

const loadingHoc = (loading: Ref<boolean>, method: AsyncFunction) => {
    loading.value = true
    return async function (...args: any[]) {
        loading.value = true
        try {
            return await method(...args)
        } finally {
            loading.value = false
        }
    }

}

function loadingHook<T extends (...args: any[]) => any>(methods: string[], useHook: T): (...args: any[]) => { loading: Ref<boolean>; } & ReturnType<T> {
    const loading = ref(false)
    return function (...args: any[]) {
        return {
            loading,
            ...Object.fromEntries(Object.entries(useHook(...args)).map(([key, value]) => {
                if (methods.includes(key)) {
                    return [key, loadingHoc(loading, value)]
                }
                return [key, value]
            })) as any as ReturnType<T>
        }
    }
}


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


interface Column {
    title: string;
    dataIndex: string;
    key: string;
    sorter: boolean;
    sortDirections: string[];
    width: string;
    customFilterDropdown: boolean;
    filterKey: string;
    filterType: FilterType;
    isRelationFilter: boolean;
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
}

const getEnumValues = (enumType: any) => {
    return Object.entries(enumType).filter(([key, value]) => !Number.isInteger(key)).map(([key, value]) => value)
}
// @ts-ignore
const FilterTypeValues = getEnumValues(FilterType) as FilterType[]
const getColumnFilterType = (column: Column | undefined) => {
    if (column && !!FilterTypeValues.find(m => column.filterType === m)) {
        return column.filterType
    } else {
        return FilterType.IN_ARRAY
    }
}

const getColumnFilterValue = (type: FilterType, value: unknown) => {
    if (Array.isArray(value) && [FilterType.SINGLE_LIKE, FilterType.SINGLE_EQUAL].includes(type)) {
        return value[0]
    }
    return value
}

function isRelationFieldFilter(column: Column | undefined) {
    return column && column.isRelationFilter
}

function getFilterFieldOption(type: FilterType, filterValue: any) {
    return {
        value: filterValue,
        type,
    }
}

const getColumnFilterField = (column: Column | undefined) => {
    if (column && column?.filter.value) return column?.filter.value
    return 'id'
}


export function useLoadingPageList<T extends {
    id: number;
}>(...args: any[]) {
    return  selectableTableList(loadingHook<typeof usePageList<T>>(['refresh', 'goPageNum', 'remove'], usePageList))(...args)
}

// {
//     selectedRowKeys: selectedRowKeys,
//     onChange: onSelectChange,
//     selections: true,
//   }


export function selectableTableList<T extends (...args: any[]) => any>(useHook: T): (...args: any[]) => {
    rowSelection: {
        selectedRowKeys: any[];
        onChange: (changedSelectedRowKeys: any[]) => void;
        selections: boolean;
    };
    removeSelected: () => Promise<any>;
    matchOperationDisabled: ComputedRef<boolean>;
} & ReturnType<T> {
    const selectedRowKeys: Ref<any[]> = ref([]);
    const onSelectChange = (changedSelectedRowKeys: any[]) => {
        selectedRowKeys.value = changedSelectedRowKeys;
    };
    const matchOperationDisabled = computed(() => !selectedRowKeys.value.length);
    const rowSelection = reactive({
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        selections: true,
    })
    return function (...args: any[]) {
        const hook = useHook(...args)
        const onTableChange = pipe(
            hook.onTableChange,
            // andThen(tap(res=>console.log(res))),
            andThen(tap(() => (selectedRowKeys.value = [])))
        );

        const removeSelected = async () => {
            await http.delete(args[0], selectedRowKeys.value);
            return await hook.refresh();
        }
        const a= {
            rowSelection,
            removeSelected,
            matchOperationDisabled,
            ...hook as ReturnType<T>,
            onTableChange,
        }
        return {
            rowSelection,
            removeSelected,
            matchOperationDisabled,
            ...hook as ReturnType<T>,
            onTableChange,
        }
    }
}

interface ListConfig {
    columns: Column[]
}

export function usePageList<T extends { id: number }>(url: string, config: ListConfig) {



    const list: Ref<T[][]> = ref([])
    const hasMore = ref(true)
    const total = ref(0)
    const page = ref(defaultPage())

    let sortOption: SortOption = {}

    let filterOption = {

    }
    const { columns: columnsOrigin } = config


    const fetchRelations = []
    onMounted(() => {
        fetchRelations.forEach(m => m())
    });

    columnsOrigin.forEach(column => {
        if (column?.filter?.resource) {
            column.filter.ref = ref([])
            fetchRelations.push(() => {
                http
                    .list("/" + column.filter.resource)
                    .then((res) => (column.filter.ref.value = res.data.list));
            })
        }
    })

    const columns = computed(() => {
        return columnsOrigin.map(m => {

            if (m?.filter?.resource) return {
                ...m,
                filters: m.filter.ref.value.map((m1) => ({
                    value: m1[m.filter.value],
                    text: m1[m.filter.text]
                }))
            }
            return m
        })
    })

    const currentList = computed(() => list.value[page.value.num])

    const pagination = computed(() => ({
        total: total.value,
        pageSize: page.value.limit
    }))





    const request = async () => requestNew<T>(url, mergeOptions(page, {
        sort: sortOption,
        filter: filterOption,
    }, {
        filter: config.filter || {}
    }))


    const updatePagination = (data: ListResponseData<T>) => {
        ({ hasMore: hasMore.value, total: total.value } = data);
    }


    const refresh = async () => {
        const data = await request();
        updatePagination(data)
        list.value[page.value.num] = data.list
        return data.list
    }

    const goPageNum = async (num: number) => {
        page.value.num = num
        const data = await request();
        updatePagination(data)
        list.value[page.value.num] = data.list
        return data.list
    }






    /**
     * 当改变排序时
     * @param sorter 
     */
    const onChangeSorter = (sorter: Sorter) => {
        sortOption = getFieldSortOption(sorter)
    }

    /**
     * 当改变筛选条件时
     * @param  filter 
     */
    const onChangeFilter = (filter: FilterOption, columns: any[]) => {
        filterOption = Object.fromEntries(Object.entries(filter).filter(([key, value]) => value).map(([key, value]) => {
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
     * 使用a-table时，onChange事件传递该函数即可
     * @param param0 
     */
    const onTableChange = ({ current }: Pagination, filter: FilterOption, sorter: Sorter) => {
        onChangeFilter(filter, columns.value)
        onChangeSorter(sorter)
        return goPageNum(current);
    };

    const remove = async (id: number) => {
        await http.delete(url + '/' + id)
        return await refresh()
    }

    const result = {
        columns,
        list,
        refresh,
        hasMore,
        total,
        pagination,
        currentList,
        onTableChange,
        remove,
    }
    provide('list', result)
    
    return result
}