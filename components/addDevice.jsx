import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";


export default function AddDevice({navigation, route}) {

    const data = route.params?.data;

    const [nameInput, setName] = useState("")
    const [placeInput, setPlace] = useState("")
    const [commandInput, setCommand] = useState("")

    useEffect(() => {
        console.log(data)
        if(data !== undefined) {
            
            setName(data.name);
            setPlace(data.place);
            setCommand(data.command)
        }
    }, [])

    const handleNameChange = (value) => {
        setName(value);
    }

    const handlePlaceChange = (value) => {
        setPlace(value);
    }

    const handleCommandChange = (value) => {
        setCommand(value);
    }

    const handleCancel = () => {
        navigation.goBack();
    }

    const checkIfEdit = () => {
        return (data !== undefined)
    }

    const handleDelete = async () => {
        if(!checkIfEdit()) return;

        const res = await AsyncStorage.getItem('devices').then();

        if(res !== null) {
        
            let devices = JSON.parse(res)
            console.log(devices);
            const index = devices.findIndex(el => el.name = nameInput);
            console.log(index)

            if(index == -1) return

            devices.splice(index, 1);

            AsyncStorage.setItem('devices', JSON.stringify(devices));
        }

        navigation.goBack();

    }

    const handleSave = async () => {
        const res = await AsyncStorage.getItem('devices')
        
        if(res !== null) {
            let devices = JSON.parse(res);
            console.log(devices);

            if(checkIfEdit()) {
                console.log("EDIT")
                console.log(devices)
                const index = devices.findIndex(el => el.name = nameInput) 
                if(index == -1) return
                console.log(index)

                const update = {
                    name: nameInput,
                    place: placeInput,
                    command: commandInput,
                }

                devices[index] = update
                   
            } else {
                devices.push({
                    name: nameInput,
                    place: placeInput,
                    command: commandInput,
                })
            }
            console.log(devices);

            AsyncStorage.setItem('devices', JSON.stringify(devices));

        } else {
            const devices = [{
                name: nameInput,
                place: placeInput,
                command: commandInput, 
            }]

            AsyncStorage.setItem('devices', JSON.stringify(devices))
        }

        navigation.goBack();
    }

    return(
        <View style={[styles.container]}>
            <Text style={[styles.heading]}>ADD DEVICE</Text>
            <View>
            <GestureHandlerRootView>
                <TextInput
                    editable
                    placeholder="Name..."
                    onChangeText={(text) => {handleNameChange(text)}}
                    value={nameInput}
                    style={[styles.input]}
                />
                <TextInput
                    editable
                    placeholder="Place..."
                    onChangeText={(text) => {handlePlaceChange(text)}}
                    value={placeInput}
                    style={[styles.input]}
                />
                <TextInput
                    editable
                    placeholder="Command..."
                    onChangeText={(text) => {handleCommandChange(text)}}
                    value={commandInput}
                    style={[styles.input]}
                />
            </GestureHandlerRootView>

            <View style={[styles.btnContainer]}>
                <TouchableOpacity style={[styles.button]}>
                    <Text onPress={() => {handleCancel()}} style={[styles.buttonText]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                {checkIfEdit() && 
                <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={() => {handleDelete()}}>
                    <Text style={[styles.buttonText]}>
                        Delete
                    </Text>
                </TouchableOpacity>}

                <TouchableOpacity style={[styles.button, styles.buttonSucess]} onPress={() => handleSave()}>
                    <Text style={[styles.buttonText]}>
                        Save
                    </Text>
                </TouchableOpacity>
           </View>
            </View>

        </View>
    )     

}

const styles = StyleSheet.create({
    container: {
        margin:5,
        padding: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    btnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"

    },

    heading: {
        fontSize: 20,
        
    },

    input: {
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        borderRadius: 10
    }, 
    
    button: {
        width: "20%",
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
    },

    buttonText: {
        textAlign: 'center',
    },

    buttonDanger: {
        backgroundColor: "red",
    },

    buttonSucess: {
        backgroundColor: "green"
    }
})