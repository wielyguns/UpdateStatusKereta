import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View,StyleSheet,Image,ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../Dashboard/Dashboard'
import MockupUser from '../../mockup/User/MockupUser.json'

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View style={styles.SplashScreen}>
      <Image
        source={require('../../assets/image/pp.jpg')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

function JpmKeretaLogo() {
  return (
    <View style={styles.logo}>
      <Image
        source={require('../../assets/image/pp.jpg')}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.textLogo}>JPM - KERETA</Text>  
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <JpmKeretaLogo/>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize = 'none'
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize = 'none'
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            _token: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            _token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            _token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      _token: null,
    }
  );

  const showToastWithGravityAndOffset = (param) => {
    ToastAndroid.showWithGravityAndOffset(
      param,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50
    );
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let _token;
      
      try {
        _token = await AsyncStorage.getItem('_token');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: _token });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        if(data.username == '' || data.password == ''){
          return showToastWithGravityAndOffset("Username Dan Password Harus Diisi");
        }
        
        if(MockupUser.username == data.username && MockupUser.password == data.password){
          MockupUser._token = 'dummy-auth-token';
          AsyncStorage.setItem('user', JSON.stringify(MockupUser));
          dispatch({ type: 'SIGN_IN', token: MockupUser._token });
        }else{
          return showToastWithGravityAndOffset("Username Atau Password Yang Anda Masukan Salah !");
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer independent={true}>
        <Stack.Navigator headerMode="none" >
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state._token == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Login',
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
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
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  logo:{
    alignItems:'center',
    justifyContent: 'center',
  },
  SplashScreen:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textLogo:{
    fontWeight: 'bold',
    fontSize:30
  }
});
