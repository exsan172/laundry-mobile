import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import jwt_decode from "jwt-decode";
import DropDownPicker from 'react-native-dropdown-picker'
import { useIsFocused } from '@react-navigation/native'
import { service } from '../config/index'

const storage = new MMKVStorage.Loader().initialize();
const CreateTransaction = ({ route, navigation }) => {
    const [customer, setCustomer] = useState("")
    const [weight, setWeight]     = useState("")
    const [loading, setLoading]   = useState("false")
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const isFocused = useIsFocused();
    const [openStore, setOpenStore]   = useState(false);
    const [valueStore, setValueStore] = useState(null);
    const [itemsStore, setItemsStore] = useState([]);

    useEffect(() => {
        
        if(isFocused) {
            const decodeJwt = jwt_decode(token)
            if(decodeJwt.role === "owner") {
                service.getData("transaction/get-cabang", token, null)
                .then(res => {
                    let dataFilter = []
                    for(const i in res.data.data) {
                        dataFilter.push({
                            label: res.data.data[i].cabang,
                            value: res.data.data[i]._id
                        })
                    }
                    setItemsStore(dataFilter)
                }).catch(error => {
                    Alert.alert("Failed", "can't get store.")
                })
            }

            if(route.params !== undefined) {
                decodeJwt.role === "owner" && setValueStore(route.params.id_cabang)
                setCustomer(route.params.name)
                setWeight(route.params.total_weight)
            }
        }

    }, [isFocused])

    const createTransaction = () => {
        setLoading("true")
        if(customer !== "" && weight !== "") {
            
            const decodeJwt = jwt_decode(token)
            service.postData("transaction/input-transaksi", token, {

                id_cabang : valueStore === null ? decodeJwt.cabang : valueStore,
                total_weight : weight,
                name : customer

            }).then(res => {
                if(res.data.statusCode === 400) {
                    setLoading("false")
                    Alert.alert("Failed Create Transaction", "Please fill customer and weight correctly")
                } else {
                    setLoading("false")
                    Alert.alert("Success", "Transaction created", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate("ListTransaction")
                            }
                        }
                    ])
                    setWeight("")
                    setCustomer("")
                    setValueStore(null)
                }
            }).catch(error => {
                setLoading("false")
                Alert.alert("Failed Create Transaction", error.message)
            })

        } else {
            setLoading("false")
            Alert.alert("Failed Create Transaction", "Please fill customer and weight")
        }
    }

    const updateTransaction = () => {
        setLoading("true")
        if(customer !== "" && weight !== "") {
            
            const decodeJwt = jwt_decode(token)
            service.postData("transaction/edit-transaksi", token, {

                id_cabang : valueStore === null ? decodeJwt.cabang : valueStore,
                id_transaksi : route.params._id,
                total_weight : weight,
                name : customer

            }).then(res => {
                if(res.data.statusCode === 400) {
                    setLoading("false")
                    Alert.alert("Failed Update Transaction", "Please fill customer and weight correctly")
                } else {
                    setLoading("false")
                    Alert.alert("Success", "Transaction updated", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate("ListTransaction")
                            }
                        }
                    ])
                    setWeight("")
                    setCustomer("")
                    setValueStore(null)
                }
            }).catch(error => {
                setLoading("false")
                Alert.alert("Failed Update Transaction", error.message)
            })

        } else {
            setLoading("false")
            Alert.alert("Failed Update Transaction", "Please fill customer and weight")
        }
    }

    return (
        <View style={style.container}>
            <View style={style.containerForm}>
                {
                    jwt_decode(token).role === "owner" &&
                    <View>
                        <View style={{margin: 5}}>
                            <Text style={{fontSize:10, color:'#34495e'}}>
                                Note : Chose store will show if you is owner.
                            </Text>
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
                            <View style={{zIndex:98}}>
                                <DropDownPicker
                                    open={openStore}
                                    value={valueStore}
                                    items={itemsStore}
                                    setOpen={setOpenStore}
                                    setValue={setValueStore}
                                    setItems={setItemsStore}
                                    style={style.inputFiled}
                                    placeholder="Chose Store"
                                    dropDownContainerStyle={{
                                        borderWidth:0,
                                        borderRadius:0
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                }

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
                            placeholder="Customer name"
                            placeholderTextColor="#95a5a6"
                            onChangeText={(value) => setCustomer(value)}
                            value={customer}
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
                        <Icon name="weight" width="20" color="#34495e"/>
                    </View>
                    <View>
                        <TextInput
                            style={style.inputFiled}
                            placeholder="Total weight"
                            placeholderTextColor="#95a5a6"
                            keyboardType="numeric"
                            onChangeText={(value) => setWeight(value)}
                            value={weight.toString()}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => route.params !== undefined ? updateTransaction() : createTransaction()}>
                        {
                            loading === "true" &&
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

export default CreateTransaction