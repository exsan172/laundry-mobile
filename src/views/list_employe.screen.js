import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const EmployeScreen = ({ navigation }) => {
    return (
        <View style={style.container}>
            <View style={style.centerBtn}>
                
            </View>
            <View>
                <View>

                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        backgroundColor: '#ecf0f1',
        flex:1,
        flexDirection:'column'
    },
    centerBtn : {
        alignItems: 'center',
        justifyContent : 'center',
        margin:10
    },
    btnNewStore : {
        backgroundColor : '#3498db',
        height: 40,
        width: 140,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent : 'center',
    },
    textBtn : {
        color: '#ffffff',
        fontSize: 12
    }
})

export default EmployeScreen