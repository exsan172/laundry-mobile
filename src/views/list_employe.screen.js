import React,{ useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { useRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from "moment-timezone";
import { service } from '../config/index'
import { listEmploye } from '../stores/home.store'

const storage = new MMKVStorage.Loader().initialize();

const EmployeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState("false")
    const [del, setDelete] = useState("false")
    const [employe , setEmploye] = useRecoilState(listEmploye)
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const isFocused = useIsFocused();

    useEffect(() => {

        if(isFocused){
            setDelete("false")
            setLoading("true")
            service.getData("auth/get-user", token, null)
            .then(res => {
                if(res.data.statusCode !== 400) {
                    setLoading("false")
                    setEmploye(res.data.data)
                } else {
                    Alert.alert("Failed", "get data employe.")
                }
            }).catch(error => {
                Alert.alert("Failed", error.message)
            })
        }

    }, [isFocused, del])

    const deleteEmploye = (idEmploye) => {
        Alert.alert("Confirm", "are you sure to delete employe ?", [
            {
                text: "Yes",
                onPress : () => {
                    service.getData(`auth/delete-user/${idEmploye}`, token, null)
                    .then(res => {
                        if(res.data.statusCode !== 400) {
                            Alert.alert("Success", "employe deleted.")
                            setDelete("true")
                        } else {
                            Alert.alert("Failed", "can't delete employe.")
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
                    employe.length > 0 ?
                        employe.map(data => {
                            return (
                                <View key={data._id} style={{flexDirection:'row', alignItems:'center', marginVertical:5, marginHorizontal:7, backgroundColor:'#ffffff', padding:10}}>
                                    <View style={{ flexDirection:'column', flex:1}}>
                                        <View style={{marginHorizontal: 5, marginBottom:5, flexDirection:'row', alignItems:'center'}}>
                                            <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                                <Icon name="store" size={10} color='#34495e' style={{alignItems:'center', justifyContent:'center', marginRight:8}}/>
                                                <Text style={{textTransform:'capitalize', color:'#34495e', fontWeight:'bold'}}>{data.cabang}</Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize:10, color:'#34495e'}}>{moment(data.createdAt).format('D/MMM/YYYY')}</Text>
                                            </View>
                                        </View>
                                        <View style={{marginHorizontal: 5, marginBottom:15, flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{textTransform:'capitalize', color:'#34495e'}}>{data.name}</Text>
                                            </View>
                                            <View>
                                                <Text style={{color:'#34495e'}}>
                                                    {data.username}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                            <View style={{flex:1, justifyContent:'center', marginLeft:5}}>
                                                <Text style={{color:'#34495e', textTransform:'capitalize'}}>
                                                    {data.role}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity style={{marginLeft: 5, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => navigation.navigate("CreateEmploye", data)}>
                                                    <Icon name="pen" size={10} color='#ffffff' style={{alignItems:'center', justifyContent:'center', marginRight:8}}/>
                                                    <Text style={{fontSize:12, color:'#ffffff'}}>Edit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{marginLeft: 5, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => deleteEmploye(`${data._id}`)}>
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
                    <View style={{justifyContent:'center', marginTop:200, alignItems:'center', color:'#34495e'}}>
                        <Text style={{fontSize:12, color:'#34495e'}}>Employe is empty, create employe in top right corner.</Text>
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

export default EmployeScreen