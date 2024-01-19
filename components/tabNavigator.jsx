import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';


import Devices from './devices';
import ConnectScreen from './connectScreen'


const Tab = createBottomTabNavigator();


  
  function Connection() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>a!</Text>
      </View>
    );
  }

export default function TabNavigator() {
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Devices') {
              iconName = focused
                ? ''
                : '';
            } else if (route.name === 'Connection') {
              iconName = focused ? '' : '';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Group>   
          <Tab.Screen name="Devices" component={Devices} />
          <Tab.Screen name="Connection" component={ConnectScreen} />
        </Tab.Group>
      </Tab.Navigator>
    )
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