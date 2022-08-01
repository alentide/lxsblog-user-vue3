import { loadingHook } from "../loading/loadingHook";
import { selectableTableList } from "./selectableTableList";
import { useBaseTableList } from "./useBaseTableList";

export function useTableList<T extends {
    id: number;
}>(...args: any[]) {
    return selectableTableList(loadingHook<typeof useBaseTableList<T>>(['refresh', 'goPageNum', 'remove'], useBaseTableList))(...args)
}