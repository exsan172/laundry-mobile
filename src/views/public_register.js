import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { service } from '../config/index'

const PublicRegister = ({ navigation }) => {
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState("false")

    const createUsr = () => {
        setLoading("true")
        if(name !== null && username !== null && password !== null) {

            service.postData("auth/public-register", null, {
                name : name,
                username : username,
                password : password,
            }).then(res => {

                if(res.data.statusCode !== 400) {
                    setLoading("false")
                    Alert.alert("Success", "Account created, you can login now.", [
                        {
                            text: 'OK',
                            onPress : () => {
                                navigation.navigate("LoginScreen")
                            }
                        }
                    ])
                    setName(null)
                    setUsername(null)
                    setPassword(null)
                } else {
                    setLoading("false")
                    Alert.alert("Failed", "Please fill all correctly")
                }

            }).catch(error => {
                setLoading("false")
                Alert.alert("Failed", error.message)
            })

        } else {
            setLoading("false")
            Alert.alert("Failed", "Please fill all.")
        }
    }

    return (
        <View style={style.container}>
            <View style={style.containerForm}>
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
                        <Icon name="signature" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Name"
                            placeholderTextColor="#95a5a6"
                            onChangeText={(value) => setName(value)}
                            value={name}
                        />
                    </View>
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
                        <Icon name="user-alt" width="20" color="#34495e"/>
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
                        <Icon name="lock" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Password"
                            placeholderTextColor="#95a5a6"
                            secureTextEntry
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => createUsr()}>
                        {
                            loading === "true" &&
                            <ActivityIndicator size="small" color="#3498db" style={{marginRight:10}}/>
                        }
                        <Text style={style.loginText}>Create Account</Text>
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
        backgroundColor : "#bdc3c7",
        justifyContent: 'center',
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
        color: '#34495e',
        borderRadius:0
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

export default PublicRegister