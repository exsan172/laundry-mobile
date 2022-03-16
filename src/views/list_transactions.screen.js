import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Button } from 'react-native'
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { useRecoilState } from 'recoil'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import rupiahFormat from "rupiah-format";
import moment from "moment-timezone";
import jwt_decode from "jwt-decode";
import { service } from '../config/index'
import { profitToday } from '../stores/home.store'
import { Transaction, toDate, fromDate } from '../stores/home.store'
import DatePicker from 'react-native-date-picker'

const storage = new MMKVStorage.Loader().initialize();
const TransactionScreen = ({ navigation }) => {
    const [loading, setLoading] = useState("false")
    const [del, setDelete] = useState("false")
    const [transaction , setTransaction] = useRecoilState(Transaction)
    const [profit , setProfit] = useRecoilState(profitToday)
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const isFocused = useIsFocused();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateTo, setDateTo] = useState(new Date())
    const [openTo, setOpenTo] = useState(false)
    const [frmDate, setFrmDate] = useRecoilState(fromDate)
    const [tooDate, setTodate] = useRecoilState(toDate)

    useEffect(() => {
        if(isFocused){
            setDelete("false")
            setLoading("true")
            const store   = jwt_decode(token).role === "owner" ? jwt_decode(token).id_user : jwt_decode(token).cabang
            const linkUrl = jwt_decode(token).role === "owner" ? "transaction/get-transaksi-owner" : "transaction/get-transaksi"

            service.getData(`${linkUrl}/${store}/${frmDate}/${tooDate}`, token, null)
            .then(res => {
                if(res.data.statusCode !== 400) {
                    
                    let profitDay = 0
                    for(const i in res.data.data){
                        profitDay += res.data.data[i].total_price
                    }

                    setProfit(profitDay)
                    setTransaction(res.data.data)
                    setLoading("false")
                }
            }).catch(error => {
                Alert.alert("Failed", error.message)
            })
        }

    }, [isFocused, del, tooDate, frmDate])

    const deleteTransaction = (idTransaction) => {
        Alert.alert("Confirm", "are you sure to delete transaction ?", [
            {
                text: "Yes",
                onPress : () => {
                    service.getData(`transaction/delete-transaksi/${idTransaction}`, token, null)
                    .then(res => {
                        if(res.data.statusCode !== 400) {
                            Alert.alert("Success", "transaction deleted.")
                            setDelete("true")
                        } else {
                            Alert.alert("Failed", "can't delete transaction.")
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
    
    const filterToday = () => {
        const today   = moment().tz("Asia/Jakarta").format('YYYY-MM-D')
        const nextDay = moment().tz("Asia/Jakarta")
        const next    = nextDay.format('D')
        const nextDte = nextDay.format('YYYY-')+nextDay.format('MM-')+(parseInt(next)+1)

        setFrmDate(today)
        setTodate(nextDte)
    }

    const filterByDate = () => {
        const convertDateFrom = moment(date).format("YYYY-MM-D")
        const convertDateTo   = moment(dateTo).format("YYYY-MM-D")

        setFrmDate(convertDateFrom)
        setTodate(convertDateTo)
    }

    return (
        <View style={style.container}>
            <View style={{margin:1, flexDirection:'row', alignItems:'flex-end'}}>
                <View style={{marginRight:10, marginLeft:5, marginVertical:5}}>
                    <View>
                        <Text style={{fontSize:10, color:'#34495e'}}>Show data</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5, width:100}} onPress={() => filterToday()}>
                            <Text style={{fontSize:12, color:'#ffffff'}}>Today</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{fontSize:10, color:'#34495e'}}>Filter by date</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight:0, marginVertical:5}}>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => setOpen(true)}>
                                <Icon name="calendar" width="20" color="#ffffff" style={{ marginRight:5 }}/>
                                <Text style={{fontSize:12, color:'#ffffff'}}>From</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode="date"
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>
                        <View style={{marginLeft:2, marginVertical:5}}>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => setOpenTo(true)}>
                                <Icon name="calendar" width="20" color="#ffffff" style={{ marginRight:5 }}/>
                                <Text style={{fontSize:12, color:'#ffffff'}}>To</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode="date"
                                open={openTo}
                                date={dateTo}
                                onConfirm={(date) => {
                                    setOpenTo(false)
                                    setDateTo(date)
                                }}
                                onCancel={() => {
                                    setOpenTo(false)
                                }}
                            />
                        </View>
                        <View style={{marginVertical:5, marginHorizontal:2}}>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:7}} onPress={() => filterByDate()}>
                                <Icon name="search" width="20" color="#ffffff"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>
                {
                    loading === "true" ?
                        <View style={{justifyContent:'center', marginTop:30}}>
                            <ActivityIndicator size="small" color="#3498db"/>
                        </View>
                    :
                    transaction.length > 0 ?
                        transaction.map(data => {
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
                                                <Text style={{textTransform:'capitalize', color:'#34495e'}}>{rupiahFormat.convert(data.total_price)}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                            <View style={{flex:1, justifyContent:'center'}}>
                                                <Text style={{color:'#34495e'}}>
                                                    {data.total_weight} KG
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity style={{marginLeft: 5, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => navigation.navigate("CreateTransaction", data)}>
                                                    <Icon name="pen" size={10} color='#ffffff' style={{alignItems:'center', justifyContent:'center', marginRight:8}}/>
                                                    <Text style={{fontSize:12, color:'#ffffff'}}>Edit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{marginLeft: 5, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#3498db', paddingHorizontal:10, paddingVertical:5}} onPress={() => deleteTransaction(`${data._id}`)}>
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
                        <Text style={{fontSize:12}}>Transaction is empty, create transaction in top right corner.</Text>
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

export default TransactionScreen