// 防抖
export function debounce(fnName, time) {
  let timeout = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => fnName.call(this, ...arguments), time)
  }
}
