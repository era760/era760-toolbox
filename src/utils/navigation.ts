import router from '../router'

export function returnPage() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}