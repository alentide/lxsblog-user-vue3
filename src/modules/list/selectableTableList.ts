import { andThen, pipe, tap } from "ramda";
import { computed, reactive, ref, type ComputedRef, type Ref } from "vue";
import { http } from "../http";

/**
 * 这个高阶函数，可以让useBaseTableList变成带批量操作的。
 * @param useHook 
 * @returns 
 */
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
        console.log("changedSelectedRowKeys", changedSelectedRowKeys);
        selectedRowKeys.value = changedSelectedRowKeys;
    };
    const matchOperationDisabled = computed(() => !selectedRowKeys.value.length);
    const rowSelection = reactive({
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        selections: true,
    });
    return function (...args: any[]) {
        const hook = useHook(...args)
        const onTableChange = pipe(
            hook.onTableChange,
            // andThen(tap(res=>console.log(res))),
            andThen(tap(() => (selectedRowKeys.value = [])))
        );

        const removeSelected = async () => {
            await http.delete(args[0], {
                ids:selectedRowKeys.value
            });
            return await hook.refresh();
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