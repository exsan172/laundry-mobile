import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { useIsFocused } from '@react-navigation/native'
import { service } from '../config/index'

const storage = new MMKVStorage.Loader().initialize();
const CreateStore = ({ route, navigation }) => {
    const [store, setStore] = useState("")
    const [price, setPrice] = useState("")
    const [loadingLogin, setLoadingLogin] = useState("false")
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const isFocused = useIsFocused();

    useEffect(() => {
        
        if(isFocused) {
            if(route.params !== undefined) {
                setStore(route.params.cabang)
                setPrice(route.params.price)
            }
        }

    }, [isFocused])

    const createStr = () => {
        setLoadingLogin("true")
        if(store !== "" && price !== "") {
            service.postData("transaction/input-cabang", token, {
                cabang : store,
                price : price
            }).then(res => {
                if(res.data.statusCode !== 400) {
                    setLoadingLogin("false")
                    Alert.alert("Success", "congratulation, store created.", [
                        {
                            text: "OK",
                            onPress : () => {
                                navigation.navigate("ListStore")
                            }
                        }
                    ])
                    setStore("")
                    setPrice("")
                } else {
                    setLoadingLogin("false")
                    Alert.alert("Failed", "Please fill all correctly.")
                }
            }).catch(err => {
                setLoadingLogin("false")
                Alert.alert("Failed", err.message)
            })
        } else {
            setLoadingLogin("false")
            Alert.alert("Failed", "please fill store name and price.")
        }
    }

    const updateStore = () => {
        setLoadingLogin("true")
        if(store !== "" && price !== "") {
            service.postData("transaction/edit-cabang", token, {
                id : route.params._id,
                cabang : store,
                price : price
            }).then(res => {
                if(res.data.statusCode !== 400) {
                    setLoadingLogin("false")
                    Alert.alert("Success", "congratulation, store updated.", [
                        {
                            text: "OK",
                            onPress : () => {
                                navigation.navigate("ListStore")
                            }
                        }
                    ])
                    setStore("")
                    setPrice("")
                } else {
                    setLoadingLogin("false")
                    Alert.alert("Failed", "Please fill all correctly.")
                }
            }).catch(err => {
                setLoadingLogin("false")
                Alert.alert("Failed", err.message)
            })
        } else {
            setLoadingLogin("false")
            Alert.alert("Failed", "please fill store name and price.")
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
                        <Icon name="store" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Store"
                            placeholderTextColor="#95a5a6"
                            onChangeText={(value) => setStore(value)}
                            value={store}
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
                        <Icon name="dollar-sign" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Price / kilogram"
                            placeholderTextColor="#95a5a6"
                            onChangeText={(value) => setPrice(value)}
                            value={price.toString()}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => route.params !== undefined ? updateStore() : createStr()}>
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

export default CreateStore