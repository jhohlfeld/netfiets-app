import { decorate, observable, action } from 'mobx'
import firebase from 'firebase/app'
import 'firebase/auth'

import NotifierStore from './NotifierStore'

export interface User {
  [key: string]: any
}

export default class AuthStore {
  user: User | null = null
  isLoading: boolean = false
  error: any
  notifierStore: NotifierStore

  constructor(notifierStore: NotifierStore) {
    this.notifierStore = notifierStore
    this.init()
  }

  async onLogin(username: string, password: string) {
    try {
      this.isLoading = true
      await firebase.auth().signInWithEmailAndPassword(username, password)
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = true
    }
  }

  onSignInError(error: any) {
    this.error = error
    this.notifierStore.addError(error.message)
  }

  onAuthStateChanged(user: any) {
    console.log('onAuthStateChanged')
    this.user = user
    this.error = undefined
  }

  init() {
    const auth = firebase.auth()

    console.log('auth.currentUser', auth.currentUser)

    auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
    this.user = auth.currentUser
  }
}

decorate(AuthStore, {
  user: observable,
  isLoading: observable,
  init: action,
  onLogin: action,
  onAuthStateChanged: action,
  onSignInError: action,
})
