import { StyleSheet } from 'react-native';
import Device from './device';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { manager } from './connectScreen';

export default function Devices(props) {

    const {navigation, route} = props;
    const isFocused = useIsFocused();
  
    const [deviceItems, setDeviceItems] = useState([]);

    useEffect(() => {
        console.log("READ ASYNC")
        AsyncStorage.getItem("devices")
            .then((res) => {
                const devices = JSON.parse(res)
                if(devices === undefined) return;
                // console.log(devices)
                setDeviceItems(devices)
            })
    } ,[isFocused])
    
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
        AsyncStorage.getItem("device")
            .then(dev => {
                dev = JSON.parse(dev);
                if(dev) {
                    manager.writeCharacteristicWithResponseForDevice(
                        dev.id, dev.serviceUUIDs, dev.characteristicsUUID, btoa(data.command)
                    ).then(resposne => {
                        console.log("response: ", resposne)
                    }).catch(err => {
                        console.error(err)
                    })
                }
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