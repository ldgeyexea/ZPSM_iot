import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

            const filtered = newDevices.filter((val, idx, slf) => slf.findIndex(val2 => (val2.id === val.id)) === idx).filter(el => {
                return el.name !== null
            })
            
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
        return AsyncStorage.setItem('device', JSON.stringify(device))
            .then(() => {
                navigation.goBack()
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
        <View style={{width: '100%',  flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            

             
            <View style={[styles.container, ]}>
                <Text style={[styles.header]}>DEVICE FOUND</Text>
                {searching && 
                <Text>Searching...</Text>}
                {
                    devices.map((device, idx) =>  {
                        return <TouchableOpacity style={[styles.button]} key={idx} onPress={() => saveDevice(device)}>
                            <Text>{device.name}</Text>
                            <Text>({device.id})</Text>
                        </TouchableOpacity>})
                }
            </View>
            <View>
                <TouchableOpacity style={[styles.button2]} onPress={() => {scanAndConnect()}}><Text>Wyszukaj urządzenia</Text></TouchableOpacity>
                
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:20,
        textAlign: 'center'
    },

    button: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        margin:10,
        backgroundColor: "#dddddd",
        borderRadius: 10,

    },

    button2: {
        width: "50%",
        padding: 5,
        borderWidth: 1,
        borderRadius: 10
    }
})