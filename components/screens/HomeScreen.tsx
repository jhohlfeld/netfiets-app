import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { inject, observer } from 'mobx-react'

import { AuthStore } from '../stores'

interface HomeScreenProps {
  authStore?: AuthStore
  navigation: NavigationScreenProp<NavigationState>
}

const HomeScreen: React.FC<HomeScreenProps> = ({ authStore, navigation }) => {
  const { user } = authStore!

  console.log('Home: user', user)

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!user ?
        <Button
          title="Go login yourself"
          onPress={() => navigation.navigate('Login')}
        />
        : <Text>Hello {user.email}</Text>
      }
    </View>
  )
}

export default inject('authStore')(observer(HomeScreen))
