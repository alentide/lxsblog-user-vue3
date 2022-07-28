
// export default ()=>{

import { ref } from "vue"

    
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



export default ()=>{
    const form =ref({

    })
    const save
    return {
        form,save,loading,visible,hide,show,clear
    }
}