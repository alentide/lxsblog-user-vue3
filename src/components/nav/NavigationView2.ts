import { getCurrentInstance, onMounted, watch } from 'vue';
import { defineComponent, h, onUpdated, type SetupContext, toRefs } from 'vue'


export function isVNode(value: any): value is VNode {
    return value ? value.__v_isVNode === true : false
}

function getInnerChild(vnode: VNode) {
    return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent! : vnode
}


export const enum ShapeFlags {
    ELEMENT = 1,
    FUNCTIONAL_COMPONENT = 1 << 1,
    STATEFUL_COMPONENT = 1 << 2,
    TEXT_CHILDREN = 1 << 3,
    ARRAY_CHILDREN = 1 << 4,
    SLOTS_CHILDREN = 1 << 5,
    TELEPORT = 1 << 6,
    SUSPENSE = 1 << 7,
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
    COMPONENT_KEPT_ALIVE = 1 << 9,
    COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}


export const NavigationView2 = defineComponent({
    props: {
        fullPath: String,
    },
    setup(props, { slots }: SetupContext) {
        const instance = getCurrentInstance()
        const cache = new Map()
        const { fullPath } = props
        const cacheSubtree = () => {
            // fix #1621, the pendingCacheKey could be 0
            if (fullPath != null) {
                cache.set(fullPath, getInnerChild(instance.subTree))
            }
        }
        onMounted(cacheSubtree)
        onUpdated(cacheSubtree)


        return () => {
            const hasDefaultSlots = () => {
                return !!slots.default
            }
            const hasJustOneChild = () => {
                const children = slots.default()
                return children.length === 1
            }

            const getChildren = () => {
                return slots.default()
            }
            const getRawNode = () => {
                const children = slots.default()
                const rawVNode = children[0]
                return rawVNode
            }

            const getVNode = (rawVNode) => {
                let vnode = getInnerChild(rawVNode)
                const cachedVNode = cache.get(vnode.key == null ? vnode.type : vnode.key)
                if (cachedVNode) {
                    vnode.el = cachedVNode.el
                    vnode.component = cachedVNode.component
                    vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE
                }

                vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
                return vnode
            }
            const getResult = () => {
                if (!hasDefaultSlots()) return null
                if (!hasJustOneChild()) return getChildren()
                if (!isVNode(getRawNode())) return getRawNode()
                return getVNode(getRawNode())
            }


            return getResult()


        }
    }
})