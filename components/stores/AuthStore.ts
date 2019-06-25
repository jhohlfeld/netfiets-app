import { decorate, observable } from 'mobx'
import firebase from 'firebase/app'
import 'firebase/auth'

import NotifierStore from './NotifierStore'

export interface User {
  [key: string]: any
}

export default class AuthStore {
  user: User | null = null
  error: any
  notifierStore: NotifierStore

  constructor(notifierStore: NotifierStore) {
    this.notifierStore = notifierStore

    this.init()
  }

  login() {
    // AsyncStorage.getItem('user')
    // .then(data => {
    //   if (!data) {
    //     return
    //   }
    //   return JSON.parse(data)
    // })
  }

  onSignInError(error: any) {
    this.error = error
    this.notifierStore.addError(error.message)
  }

  onAuthStateChanged(user: any) {
    this.user = user
    this.error = undefined
  }

  init() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this))

    // AsyncStorage.getItem('user')
    //   .then(data => {
    //     if (data) {
    //       return
    //     }
    //     (appContainer.current! as NavigationContainerComponent).dispatch(
    //       StackActions.replace({ routeName: 'Login' })
    //     )
    //   })
  }
}

decorate(AuthStore, {
  user: observable,
})
