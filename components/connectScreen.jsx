import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BleManager, Characteristic } from "react-native-ble-plx";

export default function ConnectScreen({navigation}) {

    const manager = new BleManager()
    const [device, setDevice] = useState({})
    const [searching, setSearching] = useState(true)

    const checkBluetoothState = () => {
        const subscription = manager.onStateChange((state) => {
            // console.log("CHANGE")
            if(state === 'PoweredOn') {
                scanAndConnect()
                subscription.remove()
        }
    }, true)}

    const scanAndConnect = () => {
        console.log("SEARCH BTN")
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("SEARCH BTN")

            console.log(device);
            if(true) {

                manager.stopDeviceScan()
            }

            return device.connect()
                .then((device) => {
                    return device.discoverAllServicesAndCharacteristics();
                }).then((characteristic) => {
                    setDevice(characteristic)

                }).catch(err => {
                    console.error(err);
                })
        })
    }

    const saveDevice = () => {
        return AsyncStorage.setItem('device', JSON.stringify(device))
            .then(() => {
                navigation.goBack()
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={checkBluetoothState()}><Text>Wyszukaj urządzenia</Text></TouchableOpacity>
            {searching && 
            <Text>Searching...</Text>}

             
            <View>
                <Text>DEVICE FOUND: {JSON.stringify(device)}</Text>
                <TouchableOpacity>
                    <Text>SAVE DEVICE</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}