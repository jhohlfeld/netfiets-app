import AuthStore from './AuthStore';
import NotifierStore from './NotifierStore';

export { default as AuthStore } from './AuthStore'
export { default as NotifierStore } from './NotifierStore'

export const createStores = () => {
  const notifierStore = new NotifierStore()
  const authStore = new AuthStore(notifierStore)

  return {
    authStore,
    notifierStore,
  }
}
