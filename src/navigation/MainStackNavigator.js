
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../components/Dashboard/Dashboard'
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer initialRouteName='JPM KERETA'>
      <Stack.Navigator headerMode="none">
        < Stack.Screen
          name = "JPM KERETA"
          component = {
            Dashboard
          }
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
            headerTitleAlign : "center"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator