import { StyleSheet } from 'react-native';
import Device from './device';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function Devices(props) {

    const {navigation, route} = props;
    const isFocused = useIsFocused();
  
    const [deviceItems, setDeviceItems] = useState([]);

    useEffect(() => {
        console.log("READ ASYNC")
        AsyncStorage.getItem("devices")
            .then((res) => {
                const devices = JSON.parse(res)
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
  
    const handleClick=(a)=>{
  
      
    }
    return (
      <GestureHandlerRootView style={{ alignItems: 'baseline' }} >
        <ScrollView style={{height: "100%", width: 320, alignSelf: 'center'}} contentContainerStyle={[styles.scroll]}>
            {deviceItems.map((x,i)=>{return(<Device key={i} content={x} action={() => {}} longPressAction={() => {openEditMenu(x)}}/>)})}
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