import React, { useRef, useEffect } from 'react'
import { Provider } from 'mobx-react'
import {
  createStackNavigator,
  createAppContainer,
  NavigationContainerComponent,
  StackActions,
} from 'react-navigation'
import firebase from 'firebase/app'

import { ThemeContext, theme, createStores } from './components'
import { HomeScreen, LoginScreen } from './components/screens'
import firebaseConfig from './firebase.config'

firebase.initializeApp(firebaseConfig)

const stores = createStores()

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Home'
  },
)

const AppContainer = createAppContainer(AppNavigator)

const App: React.FC = () => {
  const appContainer = useRef(null)
  const { user } = stores.authStore!
  
  useEffect(() => {

    if (!appContainer.current) {
      return
    }

    if (!user) {
      (appContainer.current! as NavigationContainerComponent).dispatch(
        StackActions.replace({ routeName: 'Login' })
      )
    }
  }, [user])

  return (
    <Provider {...stores}>
      <ThemeContext.Provider value={theme}>
        <AppContainer ref={appContainer} />
      </ThemeContext.Provider>
    </Provider>
  )
}

export default App
