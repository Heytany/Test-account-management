// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import { camelize, computed, getCurrentInstance, toHandlerKey, toRef } from 'vue'

// fixed functions for run build stage

function useEmitAsProps(emit) {
  const vm = getCurrentInstance()
  const events = vm?.type.emits
  const result = {}
  if (!events?.length) {
    console.warn(
      `No emitted event found. Please check component: ${vm?.type.__name}`,
    )
  }
  events?.forEach((ev) => {
    result[toHandlerKey(camelize(ev))] = (...arg) => emit(ev, ...arg)
  })
  return result
}

function useForwardProps(props) {
  const vm = getCurrentInstance()
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr])?.default
    if (defaultValue !== undefined)
      prev[curr] = defaultValue
    return prev
  }, {})
  const refProps = toRef(props)
  return computed(() => {
    const preservedProps = {}
    const assignedProps = vm?.vnode.props ?? {}
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key)] = assignedProps[key]
    })
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      if (refProps.value[curr] !== undefined)
        prev[curr] = refProps.value[curr]
      return prev
    }, {})
  })
}

function useForwardPropsEmits(props, emit) {
  const parsedProps = useForwardProps(props)
  const emitsAsProps = emit ? useEmitAsProps(emit) : {}
  return computed(() => ({
    ...parsedProps.value,
    ...emitsAsProps,
  }))
}

export { useEmitAsProps }
export { useForwardProps }
export { useForwardPropsEmits }
