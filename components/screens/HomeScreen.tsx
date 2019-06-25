import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface HomeScreenProps {
  navigation: NavigationScreenProp<NavigationState>
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go login yourself"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  )
}

export default HomeScreen
