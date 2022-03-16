import React, {useState} from "react"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { service } from '../config/index'

const ForgotPassword = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [loadingLogin, setLoading]   = useState("false")

    const forgotPass = () => {
        setLoading("true")
        if(username !== "") {

            service.postData("auth/forgot-password", null, {
                username : username
            }).then(res => {
                if(res.data.statusCode === 400) {
                    setLoading("false")
                    Alert.alert("Failed Username", "Please fill username correcly")
                } else {
                    setLoading("false")
                    Alert.alert("Success", "Please check your email.")
                    setUsername("")
                }
            }).catch(error => {
                setLoading("false")
                Alert.alert("Failed Username", error.message)
            })

        } else {
            setLoading("false")
            Alert.alert("Failed Username", "Please fill username correcly")
        }
    }

    return (
        <View style={style.container}>
            <View style={style.containerForm}>
                <View style={{
                    flexDirection: 'row',
                    margin: 5,
                }}>
                    <Text style={{
                        fontSize:12,
                        color: '#34495e',
                        fontWeight: 'bold'
                    }}>Insert username, and click send.</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    margin: 5
                }}>
                    <View style={{
                        backgroundColor: '#ecf0f1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:35,
                        borderRightColor: '#95a5a6',
                        borderRightWidth:1
                    }}>
                        <Icon name="at" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Username"
                            placeholderTextColor="#95a5a6"
                            onChangeText={(value) => setUsername(value)}
                            value={username}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => forgotPass()}>
                        {
                            loadingLogin === "true" &&
                            <ActivityIndicator size="small" color="#3498db" style={{marginRight:10}}/>
                        }
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
        fontSize : hp('1.5%'),
        color: '#34495e'
    },
    loginButton : {
        backgroundColor: '#2980b9',
        height : hp('5%'),
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : hp('1.5%'),
        width : wp('69%'),
        flexDirection:'row'
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