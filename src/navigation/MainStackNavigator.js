
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../components/Dashboard/Dashboard'
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer initialRouteName='Dashboard'>
      <Stack.Navigator>
        <Stack.Screen name='Dashboard' component={Dashboard}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator