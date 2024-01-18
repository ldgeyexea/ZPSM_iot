import * as React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

function Devices() {
  const blocks=[
    'lampa','okno','piec','drzwi','test'
  ]
  const handleClick=(a:string)=>{
    
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.page}>
        {blocks.map((x)=>{return(<View  style={styles.container}><Text>{x}</Text></View>)})}
        <View  style={styles.container}><TouchableOpacity onPress={()=>handleClick("add")}><Text>dodaj</Text></TouchableOpacity></View>
      </View>
    </View>
  );
}

function Connection() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>a!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Devices') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Connection') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Devices" component={Devices} />
        <Tab.Screen name="Connection" component={Connection} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}
const styles= StyleSheet.create({
container:{
  width:'40%',
  height:100,
  justifyContent:'center',
  marginLeft:'5%',
  marginBottom:10,
  borderColor:'black',
  borderWidth:3,

},
page:{
  width:'100%',
  flexDirection:'row',
  flexWrap:'wrap',
  justifyContent:'left',
}
})