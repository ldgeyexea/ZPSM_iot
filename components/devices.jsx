import { StyleSheet } from 'react-native';
import Device from './device';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { manager } from './connectScreen';
import {decode as atob, encode as btoa} from 'base-64'


export default function Devices(props) {

    const {navigation, route} = props;
    const isFocused = useIsFocused();
  
    const [deviceItems, setDeviceItems] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState({})

    useEffect(() => {
        console.log("READ ASYNC")
        AsyncStorage.getItem("devices")
            .then((res) => {
                const devices = JSON.parse(res)
                if(devices === undefined) return;
                // console.log(devices)
                setDeviceItems(devices)
            })
        AsyncStorage.getItem("device")
            .then(res => {
                console.debug(res)
                const dev = JSON.parse(res)
                setConnectedDevice(dev)
            })
    } ,[isFocused])

    useEffect(() => {
        console.info("CONNECTED DEVICE: ", connectedDevice)
    }, [connectedDevice])
    
    const openAddMenu = () => {
      console.log("OPEN POPUP");
  
      console.log(navigation)
      navigation.navigate("add")
    }

    const openEditMenu = (data) => {
        console.log(data)

        navigation.navigate("add", {data})
    }
  
    const handleClick =(data)=>{
        console.info("BUTTON CLICKED: ", data)
        console.log("DEV: ", connectedDevice.name, " ", connectedDevice.id);

        const connectionData = {
            serviceUUID: 'FFE0',
            characteristicUUID: 'FFE1',
        }

        manager.connectToDevice(connectedDevice.id)
            .then(async dev => {
                console.info("DEVICE CONNECTED")
                const char = await dev.discoverAllServicesAndCharacteristics();
                // console.log(char)


                // return char

                manager.writeCharacteristicWithResponseForDevice(
                    char.id, connectionData.serviceUUID, connectionData.characteristicUUID,
                    btoa(data.command)
                ).then(res => {
                    console.log("ARDUINO", res)
                }).catch(err => {
                    console.error(err)
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
    return (
      <GestureHandlerRootView style={{ alignItems: 'baseline' }} >
        <ScrollView style={{height: "100%", width: 320, alignSelf: 'center'}} contentContainerStyle={[styles.scroll]}>
            {deviceItems?.map((x,i)=>{return(<Device key={i} content={x} action={() => {handleClick(x)}} longPressAction={() => {openEditMenu(x)}}/>)})}
            <Device  content={{name: "Dodaj"}} action={() => {openAddMenu()}}/>
        </ScrollView>
      </GestureHandlerRootView>
    );


}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1, 
        flexDirection: "row", 
        justifyContent: 'left', 
        alignItems: 'center', 
        flexWrap: "wrap",

    }
})