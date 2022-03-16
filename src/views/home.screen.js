import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { service } from '../config/index'

const storage = new MMKVStorage.Loader().initialize();

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const [loadingLogin, setLoadingLogin] = useState("false")
    const [store, setStore] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        
        service.getData("transaction/get-cabang", token, null).then(res => {
            if(res.data.statusCode !== 400) {
                if(res.data.data.length > 0) {
                    navigation.navigate("HomeRoutes")
                }
            }
        }).catch(error => {
            Alert.alert("Failed", "failed get store")
        })

    }, [])
    
    const createStore = () => {
        setLoadingLogin("true")
        if(store !== "" && price !== "") {

            service.postData("transaction/input-cabang", token, {
                cabang : store,
                price : price
            }).then(res => {
                setLoadingLogin("false")
                if(res.data.statusCode === 400) {
                    Alert.alert("Failed Create Store", "Please fill store and price correctly")    
                } else {
                    navigation.navigate("HomeRoutes")
                }
            }).catch(error => {
                setLoadingLogin("false")
                Alert.alert("Failed Create Store", error.message)    
            })

        } else {
            setLoadingLogin("false")
            Alert.alert("Failed Create Store", "Please fill store and price")
        }
    }

    return (
        <View style={style.container}>
            <View style={style.containerForm}>
                <View style={{
                    flexDirection: 'row',
                    margin: 20
                }}>
                    <Text style={{
                        fontSize:15,
                        color:'#ffffff'
                    }}>Welcome, create your frist store here !</Text>
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
                            keyboardType="numeric"
                            onChangeText={(value) => setPrice(value)}
                            value={price}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => createStore()}>
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

export default HomeScreen