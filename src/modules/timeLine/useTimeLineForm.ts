
// export default ()=>{

import { clone } from "ramda"
import { computed, ref, type Ref } from "vue"
import type { CreateTimeLineDto, TimeLine } from "./timeline.interface"
import timeLineRepo from "./timeLineRepo"

    
// const {
//     add: _add,
//     addLoading,
//     remove: _remove,
//   } = useTimeLine();
  
//   /**
//    * 用于新建时间线节点的表单
//    */
//   const timeLineForm = reactive(
//     Object.assign(
//       {},
//       props?.form || {
//         title: "",
//         content: "",
//       }
//     )
//   );
  
//   /**
//    * 清空表单
//    */
//   const clearTimeLineForm = () =>
//     Object.assign(timeLineForm, {
//       title: "",
//       content: "",
//     });
  
//   /**
//    * 添加新的时间线节点
//    */
//   const add = pipe(
//     _add,
//     andThen(clearTimeLineForm),
//     andThen(() => emit("after-add"))
//   );
// }



// export default ()=>{
//     const form =ref({

//     })
//     const save
//     return {
//         form,save,loading,visible,hide,show,clear
//     }
// }


const useTimeLineNewForm = ()=>{
    const title = ref('新建时间线')
    const defaultForm = ()=>({
        content: '',
    })
    const form:Ref<CreateTimeLineDto> = ref(defaultForm())
    const clear = ()=>form.value= defaultForm()
    const save = async ()=>{
        const res = await timeLineRepo.add(form.value)
        clear()
        return res
    }
    return {
        title,
        form,
        save,
    }
}

const useTimeLineEditForm = ()=>{
    const title = ref('编辑时间线')
    const defaultForm = ()=>({
        id: 0,
        content: '',
        createTime: '',
        iconColor: '',
        createTimeDisplayed:'',
    })

    const form:Ref<TimeLine> = ref(defaultForm())
    const save = async ()=>{
        return await timeLineRepo.add(form.value)
    }
    return {
        title,
        form,
        save,
    }
}

const enum TimeLineFormType {
    'NEW',
    'EDIT'
}

export default ()=>{
    const visible = ref(false)
    const loading = ref(false)

    const formForCreate = useTimeLineNewForm()
    const formForEdit = useTimeLineEditForm()

    const type = ref(TimeLineFormType.NEW)

    const getCurrentForm = ()=>{
        switch(type.value){
            case TimeLineFormType.NEW: return formForCreate;
            case TimeLineFormType.EDIT: return formForEdit;
        }
    }

    const openCreate = ()=>{
        type.value = TimeLineFormType.NEW
        visible.value = true
    }

    const openEdit = (item:TimeLine)=>{
        type.value = TimeLineFormType.EDIT
        getCurrentForm().form.value=clone(item)
        visible.value=true
    }
    
    const title = computed({
        get: () => {
            return getCurrentForm().title.value
        },
        set: (val:string) => {
            getCurrentForm().title.value =val
        }
    })

    const form = computed(()=>getCurrentForm().form.value)
    const save = async ()=>{
        const res =  await getCurrentForm().save()
        visible.value=false
        return res
    }


    
    return {
        title,
        form,
        save,
        visible,
        loading,

        openCreate,
        openEdit,
    }
}