import React, { useState, useEffect } from "react"
import { Text, Image, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import jwt_decode from "jwt-decode";
import { service } from '../config/index'

const storage = new MMKVStorage.Loader().initialize();
const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loadingLogin, setLoadingLogin] = useState("false")
    const [token, setToken] = useMMKVStorage("user", storage, "null");

    useEffect(() => {
        if(token !== "null") {
            const decodeJwt = jwt_decode(token)
            if(decodeJwt.role === "owner"){
                navigation.navigate("HomeScreen")
            } else {
                navigation.navigate("HomeRoutes")
            }
        }
    }, [])

    const postUser = async () => {

        setLoadingLogin("true")
        if(username !== "" && password !== "") {

            service.postData("auth/login", null, {
                username : username,
                password :password
            }).then(res => {
                setLoadingLogin("false")
                if(res.data.statusCode === 400) {
                    Alert.alert("Failed Login", "Please fill correctly username and password.")    
                } else {
                    const decodeJwt = jwt_decode(res.data.data.token)
                    setToken(res.data.data.token)
                    
                    if(decodeJwt.role === "owner"){
                        navigation.navigate("HomeScreen")
                    } else {
                        navigation.navigate("HomeRoutes")
                    }
                }
            }).catch(error => {
                setLoadingLogin("false")
                Alert.alert("Failed Login", error.message)
            })

        } else {
            setLoadingLogin("false")
            Alert.alert("Failed Login", "Please fill username and password")
        }
    }

    return (
        <View style={style.container}>
            <View style={{ justifyContent: 'center', alignItems:'center' }}>
                <Image source={require("../assets/images/laundry.png")} style={{ width:190, height:75 }}/>
            </View>
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
                        <Icon name="at" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            onChangeText={value => setUsername(value)}
                            value={username}
                            placeholder="Username"
                            placeholderTextColor="#95a5a6"
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
                            onChangeText={value => setPassword(value)}
                            value={password}
                            secureTextEntry
                            placeholder="********"
                            placeholderTextColor="#95a5a6"
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => postUser()}>
                        {
                            loadingLogin === "true" &&
                            <ActivityIndicator size="small" color="#3498db" style={{marginRight:10}}/>
                        }
                        <Text style={style.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={{
                            fontSize: 12,
                            color: '#ffffff'
                        }}>Fotgot Password ?</Text>
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
        backgroundColor : "#3498db",
        justifyContent: 'center',
    },
    containerForm : {
        marginTop : hp('2%'),
        marginHorizontal : wp('10%'),
        alignItems:'center'
    },
    inputFiled : {
        padding: 10,
        borderWidth :0,
        borderColor: '#bdc3c7',
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

export default LoginScreen