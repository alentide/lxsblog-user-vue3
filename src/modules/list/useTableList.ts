
/**
 * 给<a-table />组件使用的list
 */
export const useTableList = ()=>{
    return {
        columns,
        onChange,
        loading,
        dataSource,
        pagination,
    }
}