import * as React from 'react';
import { View, Text, Button, StyleSheet,Image, AsyncStorage, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Login from '../Login/Login'
import UpdateStatus from '../UpdateStatus/UpdateStatus'

function GambarUser(){
  return (
    <Image
      source={require('../../assets/image/pp.jpg')}
      style={{ width: 100, height: 100 }}
    />
  );
}

function Feed({ navigation }) {
  const [user, setUser] = React.useState(null);
  AsyncStorage.getItem('user').then( res => {
    setUser(JSON.parse(res));
  });
  if(user != null){
    return (
      <View style={styles.container}>
        <View style={styles.boxSaldo}>
          <GambarUser/>
          <View style={styles.textContainerBoxSaldo}>
            <Text style={styles.textDataAgen} >{user.nama}</Text>
            <Text style={styles.textDataAgenAlamat} >{user.alamat}</Text>
          </View>
        </View>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <View style={styles.boxSaldo}>
          <GambarUser/>
          <View style={styles.textContainerBoxSaldo}>
          </View>
        </View>
      </View>
    );
  }
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Feed} options={{
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'home' : 'ios-list'}></Icon>
        }}/>

      <Drawer.Screen name="UpdateStatus" component={UpdateStatus} options={{
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'truck' : 'ios-list'}></Icon>
        }} />
      <Drawer.Screen name="Logout" component={Logout} options={{
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'power-off' : 'ios-list'}></Icon>
        }} onPress={() => setIsStarted(true)}/>
    </Drawer.Navigator>
  );
}

function Logout() {
  

  React.useEffect(() => {
    // AsyncStorage.clear();
  },[]);
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Logout" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Dashboard() {
  return (
    <NavigationContainer independent={true}>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:5,
    height:25
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  boxSaldo:{
    justifyContent:'space-between',
    flexDirection: 'row',
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    backgroundColor: '#fff',
    marginTop:20,
    backgroundColor:'#61dafb',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  boxShortcut:{
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor:'#00c8ff',
    height:100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textDataAgen:{
    textAlign:'right',
    color:'white',
    fontSize: 30,
    fontWeight: "bold"
  },
  textDataAgenAlamat:{
    textAlign:'right',
    color:'white',
    fontSize: 15,
    fontWeight: "bold",
  },
  textContainerBoxSaldo:{
    paddingRight:15,
    paddingTop:5,
    width:250
  }
});

