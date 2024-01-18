import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/tabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDevice from './components/addDevice';
import { Platform, PermissionsAndroid} from 'react-native';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true
    }
    if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
      const apiLevel = parseInt(Platform.Version.toString(), 10)
  
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        return granted === PermissionsAndroid.RESULTS.GRANTED
      }
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ])
  
        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        )
      }
    }
  
    // showErrorToast('Permission have not been granted')
  
    return false
  }

  useEffect(() => {
    requestBluetoothPermission()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,}}>
        <Stack.Screen name="home" component={TabNavigator}/>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='add' component={AddDevice}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
