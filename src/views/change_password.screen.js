import React, { useState } from "react"
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import jwt_decode from "jwt-decode";
import { service } from '../config/index'

const storage = new MMKVStorage.Loader().initialize();
const ChangePassword = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loadingLogin, setLoadingLogin] = useState("false")
    const [token, setToken] = useMMKVStorage("user", storage, "null");

    const changePwd = () => {
        setLoadingLogin("true")
        if(oldPassword !== "" && newPassword !== "") {
            service.postData("auth/change-password", token, {
                newPassword : newPassword,
                confirmNewPassword : newPassword
            }).then(res => {
                setLoadingLogin("false")
                if(res.data.statusCode !== 400) {
                    Alert.alert("Success", 'password now change, logout to take effect.')
                    setNewPassword("")
                    setOldPassword("")
                } else {
                    Alert.alert("Failed", 'please fill old password and new password correctly.')
                }
            }).catch(error => {
                setLoadingLogin("false")
                Alert.alert("Failed", error.message)
            })
        } else {
            setLoadingLogin("false")
            Alert.alert("Failed", 'please fill old password and new password')
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
                        <Icon name="lock-open" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Old Password"
                            placeholderTextColor="#95a5a6"
                            secureTextEntry
                            onChangeText={(value) => setOldPassword(value)}
                            value={oldPassword}
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
                            placeholder="New Password"
                            placeholderTextColor="#95a5a6"
                            secureTextEntry
                            onChangeText={(value) => setNewPassword(value)}
                            value={newPassword}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => changePwd()}>
                        {
                            loadingLogin === "true" &&
                            <ActivityIndicator size="small" color="#3498db" style={{marginRight:10}}/>
                        }
                        <Text style={style.loginText}>Save</Text>
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
        color: '#34495e'
    },
    loginButton : {
        backgroundColor: '#2980b9',
        height : hp('5%'),
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : hp('1.5%'),
        width : wp('69%'),
        flexDirection: 'row'
    },
    loginText : {
        color: '#ffffff'
    },
    forgotPassword : {
        justifyContent: 'center',
        alignItems : 'center'
    }
})

export default ChangePassword