import { useToast } from 'bootstrap-vue-next'
const { show } = useToast()

export const errorToast = (
  msg = '系统异常！',
  title = '错误：',
  value = 5000
) => {
  show(msg, {
    title,
    variant: 'danger',
    pos: 'top-center',
    value,
    interval: 100,
    progressProps: {
      variant: 'warning'
    }
  })
}

export const successToast = (msg = '操作成功！', title, value = 2000) => {
  show(msg, {
    title,
    variant: 'success',
    pos: 'top-center',
    value,
    interval: 100,
    progressProps: {
      variant: 'success'
    }
  })
}

export const infoToast = (msg = '操作成功！', title, value = 2000) => {
  show(msg, {
    title,
    variant: 'info',
    pos: 'top-center',
    value,
    interval: 100,
    progressProps: {
      variant: 'info'
    }
  })
}
