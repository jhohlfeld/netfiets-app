import React, { useState, useEffect } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { observer, inject } from 'mobx-react'
import { TextInput } from 'react-native-gesture-handler'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

import { theme } from '../../theme'
import { AuthStore } from '../../stores'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.screenBackgroundColor,
  },
  inputGroup: {
    width: '75%',
    height: theme.spacing(4),
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
  },
  inputLabel: {
    fontSize: theme.fontSize('Body'),
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
  },
  input: {
    backgroundColor: 'whitesmoke',
    height: theme.spacing(2),
    paddingLeft: theme.spacing(.5),
    paddingRight: theme.spacing(.5),
  }
});

interface LoginScreenProps {
  authStore?: AuthStore
  navigation: NavigationScreenProp<NavigationState>
}

const LoginScreen: React.FC<LoginScreenProps> = ({ authStore, navigation }) => {
  const { user } = authStore!
  
  useEffect(() => {
    const { user } = authStore!

    if (user) {
      navigation.replace('Home')
    }
  }, [user])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, onLogin } = authStore!

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoFocus
          keyboardType="email-address"
          onChangeText={text => setUsername(text)}
          style={styles.input}
          textContentType="emailAddress"
          value={username}
          />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
          textContentType="password"
          value={password}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button
          onPress={() => onLogin(username, password)}
          title="Login"
        />
      </View>
    </View>
  )
}

LoginScreen.navigationOptions = {
  title: 'Login'
}

export default inject('authStore')(observer(LoginScreen))
