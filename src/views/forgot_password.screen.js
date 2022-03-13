import React from "react"
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ForgotPassword = ({ navigation }) => {
    return (
        <View style={style.container}>
            <View style={style.containerForm}>
                <View style={{
                    flexDirection: 'row',
                    margin: 5
                }}>
                    <Text style={{
                        fontSize:12,
                        color: '#34495e'
                    }}>Hei, you just insert email, and we will send you link to change your password !</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    margin: 5
                }}>
                    <View style={{
                        backgroundColor: '#ecf0f1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:30,
                        borderRightColor: '#95a5a6',
                        borderRightWidth:1
                    }}>
                        <Icon name="at" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Username"
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={style.loginText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        justifyContent: 'center',
        backgroundColor: '#bdc3c7'
    },
    containerForm : {
        marginTop : hp('2%'),
        marginHorizontal : wp('10%'),
        alignItems:'center'
    },
    inputFiled : {
        padding: 10,
        borderWidth :1,
        borderColor: '#ecf0f1',
        backgroundColor : '#ffffff',
        height : hp('5%'),
        width : wp('60%'),
        fontSize : hp('1.5%')
    },
    loginButton : {
        backgroundColor: '#2980b9',
        height : hp('5%'),
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : hp('1.5%'),
        width : wp('67%'),
    },
    loginText : {
        color: '#ffffff'
    },
    forgotPassword : {
        justifyContent: 'center',
        alignItems : 'center'
    }
})

export default ForgotPassword