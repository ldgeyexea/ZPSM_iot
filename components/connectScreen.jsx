import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BleManager, Characteristic } from "react-native-ble-plx";
import { ColorSpace } from "react-native-reanimated";

export const manager = new BleManager()

export default function ConnectScreen({navigation}) {

    const [devices, setDevices] = useState([])
    const [deviceid, setDevice] = useState({})
    const [searching, setSearching] = useState(true)

    useEffect(() => {
        const subscription = manager.onStateChange(state => {
          if (state === 'PoweredOn') {
            scanAndConnect()
            subscription.remove()
          }
        }, true)
        return () => subscription.remove()
    }, [manager])

    const scanAndConnect = () => {
        // manager.cancelDeviceConnection(deviceid);
        setSearching(true)
        console.log("SEARCH")
        const newDevices = []
        setTimeout(() => {
            manager.stopDeviceScan();

            const filtered = newDevices.filter((val, idx, slf) => slf.findIndex(val2 => (val2.id === val.id)) === idx)

            setDevices(filtered)
        }, 5000)

        manager.startDeviceScan(null, {allowDuplicates: false}, (error, scannedDevice) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("SEARCH BTN2")
            newDevices.push({
                id: scannedDevice.id,
                name: scannedDevice.name,
                dev: scannedDevice,
            })
        })

        setSearching(false)
    }

    const saveDevice = async (device) => {
        console.log("Connect START")
        console.log(device.id)
        setDevice(device.id)
        const newDev = await manager.connectToDevice(device.id)
            .then((res) => {
                console.log(res);
                console.log("Connect DONE") 
                return AsyncStorage.setItem('device', JSON.stringify(device))
                    .then(() => {
                        navigation.goBack()
                    })
            }).catch(err => {
                console.log("Connect ERROR") 
                console.error(err)
            })

        // device.dev.connent().then(res => {
        //     console.log("Connect DONE2") 
        //     console.log(res)
        // }).catch(err => {
        //     console.log("Connect ERROR2") 
        //     console.error(err)
        // })
                    
        

        // console.log(newDev)
        // const newDev = await device.dev.connect()
        //     .then(async (device) => {
        //         return await device.discoverAllServicesAndCharacteristics();
        //     }).catch(err => {console.error(err)})

        // console.log(newDev)

        
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {scanAndConnect()}}><Text>Wyszukaj urządzenia</Text></TouchableOpacity>
            {searching && 
            <Text>Searching...</Text>}

             
            <View>
                <Text>DEVICE FOUND:</Text>
                {
                    devices.map(device =>  {
                        return <TouchableOpacity onPress={() => saveDevice(device)}>
                            <Text>{device.name} - ({device.id})</Text>
                        </TouchableOpacity>})
                }
                
                <TouchableOpacity>
                    <Text>SAVE DEVICE</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}