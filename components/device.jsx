import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Device(props) {
    const {content, action, longPressAction = () => {}} = props;

    return(
        <TouchableOpacity onPress={action} onLongPress={longPressAction} style={styles.tile}>
            <Text style={[styles.heading]}>{content?.name}</Text>
            <Text>{content?.place}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    tile: {
        margin: 5,
        height: 150,
        width: 150,
        backgroundColor: "#dddddd",
        borderRadius: 10,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },

    heading: {
        textAlign: "center",
        fontSize: 25,
    }
})