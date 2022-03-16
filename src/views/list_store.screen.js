import React, { useEffect, useState} from "react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { useRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import rupiahFormat from "rupiah-format";
import moment from "moment-timezone";
import jwt_decode from "jwt-decode";
import { service } from '../config/index'
import { listStore } from '../stores/home.store'

const storage = new MMKVStorage.Loader().initialize();
const ListStore = ({ navigation }) => {
    const [loading, setLoading] = useState("false")
    const [del, setDelete] = useState("false")
    const [store , setStore] = useRecoilState(listStore)
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const isFocused = useIsFocused();

    useEffect(() => {

        if(isFocused){
            setLoading("true")
            setDelete("false")
            
            service.getData("transaction/get-cabang", token, null)
            .then(res => {
                if(res.data.statusCode !== 400) {
                    setLoading("false")
                    setStore(res.data.data)
                } else {
                    Alert.alert("Failed", "can't get data store")
                }
            }).catch(error => {
                Alert.alert("Failed", error.message)
            })
        }

    }, [isFocused, del])

    const deleteStore = (idStore) => {
        Alert.alert("Confirm", "are you sure to delete store ?", [
            {
                text: "Yes",
                onPress : () => {
                    service.getData(`transaction/delete-cabang/${idStore}`, token, null)
                    .then(res => {
                        if(res.data.statusCode !== 400) {
                            Alert.alert("Success", "store deleted.")
                            setDelete("true")
                        } else {
                            Alert.alert("Failed", "can't delete store.")
                        }
                    }).catch(error => {
                        Alert.alert("Failed", error.message)
                    })
                }
            },
            {
                text: "No"
            }
        ])
    }

    return (
        <View style={style.container}>
            <ScrollView>
                {
                    loading === "true" ?
                        <View style={{justifyContent:'center', marginTop:30}}>
                            <ActivityIndicator size="small" color="#3498db"/>
                        </View>
                    :
                    store.length > 0 ?
                        store.map(data => {
                            return (
                                <View key={data._id} style={{flexDirection:'row', alignItems:'center', marginVertical:5, marginHorizontal:7, backgroundColor:'#ffffff', padding:10}}>
                                    <View style={{ flexDirection:'column', flex:1}}>
                                        <View style={{marginHorizontal: 5, marginBottom:5, flexDirection:'row', alignItems:'center'}}>
                                            <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                                <Icon name="store" size={10} color='#34495e' style={{alignItems:'center', justifyContent:'center', marginRight:8}}/>
                                                <Text style={{textTransform:'capitalize', color:'#34495e'}}>{data.cabang}</Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize:10, color:'#34495e'}}>{moment(data.createdAt).format('D/MMM/YYYY')}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                            <View style={{flex:1, marginLeft:5, justifyContent:'center'}}>
                                                <Text style={{color:'#34495e'}}>
                                                    {rupiahFormat.convert(data.price)}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity style={{marginLeft: 5, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => navigation.navigate("CreateStore", data)}>
                                                    <Icon name="pen" size={10} color='#ffffff' style={{alignItems:'center', justifyContent:'center', marginRight:8}}/>
                                                    <Text style={{fontSize:12, color:'#ffffff'}}>Edit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{marginLeft: 5, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => deleteStore(`${data._id}`)}>
                                                    <Icon name="trash" size={10} color='#ffffff' style={{alignItems:'center', justifyContent:'center', marginRight:5}}/>
                                                    <Text style={{fontSize:12, color:'#ffffff'}}>Delete</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    :
                    <View style={{justifyContent:'center', marginTop:50, alignItems:'center', color:'#34495e'}}>
                        <Text style={{fontSize:12}}>Store is empty, create store in top right corner.</Text>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        backgroundColor: '#ecf0f1',
        flex:1,
        flexDirection:'column'
    }
})

export default ListStore