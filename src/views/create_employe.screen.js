import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { useIsFocused } from '@react-navigation/native'
import { service } from '../config/index'

const storage = new MMKVStorage.Loader().initialize();
const CreateEmploye = ({ route, navigation }) => {
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState("false")
    const [openRole, setOpenRole]   = useState(false);
    const [valueRole, setValueRole] = useState(null);
    const [openStore, setOpenStore]   = useState(false);
    const [valueStore, setValueStore] = useState(null);
    const [itemsStore, setItemsStore] = useState([]);
    const isFocused = useIsFocused();
    const [items, setItems] = useState([
        {label: 'Employe', value: 'employe'}
    ]);

    useEffect(() => {
        
        if(isFocused){
            service.getData("transaction/get-cabang", token, null).then(res => {
                let dataFilter = []
                for(const i in res.data.data) {
                    dataFilter.push({
                        label: res.data.data[i].cabang,
                        value: res.data.data[i]._id
                    })
                }
                setItemsStore(dataFilter)
    
            }).catch(error => {
                Alert.alert("Error", "failed get store list")
            })

            if(route.params !== undefined) {
                setName(route.params.name)
                setUsername(route.params.username)
                setValueStore(route.params.id_cabang)
                setValueRole(route.params.role)
            }
        }

    }, [isFocused])

    const createUsr = () => {
        setLoading("true")
        if(name !== null && username !== null && password !== null && valueRole !== null && valueStore !== null) {

            service.postData("auth/register", token, {
                name : name,
                username : username,
                password : password,
                role : valueRole,
                idCabang : valueStore
            }).then(res => {

                if(res.data.statusCode !== 400) {
                    setLoading("false")
                    Alert.alert("Success", "Employe created.", [
                        {
                            text: 'OK',
                            onPress : () => {
                                navigation.navigate("ListEmploye")
                            }
                        }
                    ])
                    setName(null)
                    setUsername(null)
                    setPassword(null)
                    setValueStore(null)
                    setValueRole(null)
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

    const updateUser = () => {
        setLoading("true")
        if(name !== null && username !== null && valueRole !== null && valueStore !== null) {

            service.postData("auth/update-user", token, {
                id: route.params._id,
                name : name,
                username : username,
                role : valueRole,
                idCabang : valueStore
            }).then(res => {

                if(res.data.statusCode !== 400) {
                    setLoading("false")
                    Alert.alert("Success", "Employe updated.", [
                        {
                            text: 'OK',
                            onPress : () => {
                                navigation.navigate("ListEmploye")
                            }
                        }
                    ])
                    setName(null)
                    setUsername(null)
                    setPassword(null)
                    setValueStore(null)
                    setValueRole(null)
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

                {
                    route.params === undefined &&
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
                        <Icon name="user-tag" width="20" color="#34495e"/>
                    </View>
                    <View  style={{zIndex:99}}>
                        <DropDownPicker
                            open={openRole}
                            value={valueRole}
                            items={items}
                            setOpen={setOpenRole}
                            setValue={setValueRole}
                            setItems={setItems}
                            style={style.inputFiled}
                            placeholder="Chose Role"
                            dropDownContainerStyle={{
                                zIndex: 99,
                                borderWidth:0,
                                borderRadius:0
                            }}
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
                        <Icon name="store" width="20" color="#34495e"/>
                    </View>
                    <View style={{zIndex:98}}>
                        <DropDownPicker
                            open={openStore}
                            value={valueStore}
                            items={itemsStore}
                            setOpen={setOpenStore}
                            setValue={setValueStore}
                            setItems={setItems}
                            style={style.inputFiled}
                            placeholder="Chose Store"
                            dropDownContainerStyle={{
                                borderWidth:0,
                                borderRadius:0
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={style.loginButton} onPress={() => route.params !== undefined ? updateUser() : createUsr()}>
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
        justifyContent: 'flex-start',
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

export default CreateEmploye