import * as React from 'react';
import { View, Text, Button, StyleSheet,Image, AsyncStorage, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';



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

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
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
    paddingRight:5,
    paddingTop:5,
    width:250
  }
});

