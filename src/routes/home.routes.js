import React, { useEffect } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import jwt_decode from "jwt-decode";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import { useRecoilState } from 'recoil'
import rupiahFormat from "rupiah-format";

// screeen
import ListStore from "../views/list_store.screen";
import ChangePassword from "../views/change_password.screen";
import TransactionScreen from "../views/list_transactions.screen";
import EmployeScreen from "../views/list_employe.screen";
import { roleUser } from '../stores/general.store'
import { profitToday } from '../stores/home.store'

const storage = new MMKVStorage.Loader().initialize();
const Tab = createBottomTabNavigator();
const HomeRoutes = ({ navigation }) => {
    const [token, setToken] = useMMKVStorage("user", storage, "null");
    const [role, setRole] = useRecoilState(roleUser)
    const [profit, setProfit] = useRecoilState(profitToday)

    useEffect(() => {
        const decodeJwt = jwt_decode(token)
        setRole(decodeJwt.role)
    }, [])

    const logout = () => {
        setToken("null")
        navigation.navigate("LoginScreen")
    }

    return (
        <Tab.Navigator activeColor="#3498db">
            <Tab.Screen 
                name = "ListTransaction"
                options = {{
                    title : "+ "+rupiahFormat.convert(profit),
                    headerStyle: {
                        backgroundColor : "#3498db"
                    },
                    headerTintColor : "#ffffff",
                    headerTitleStyle : {
                        fontSize: 15
                    },
                    tabBarLabel: "Transaction",
                    tabBarIcon : ({ color }) => (
                        <Icon name="coins" size={15} color={color}/>
                    ),
                    headerRight : () => (
                        <TouchableOpacity style={style.btnNewStore} onPress={() => navigation.navigate('CreateTransaction')}>
                            <Icon name="plus" size={10} color='#ffffff' style={{marginRight: 5, alignItems:'center', justifyContent:'center'}}/>
                            <Text style={style.textBtn}>
                                Create Transaction
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                component={TransactionScreen} 
            />

            {
                role === "owner" &&
                <Tab.Screen 
                    name = "ListStore"
                    options = {{
                        title : "Store",
                        headerStyle: {
                            backgroundColor : "#3498db"
                        },
                        headerTintColor : "#ffffff",
                        headerTitleStyle : {
                            fontSize: 15
                        },
                        tabBarIcon : ({ color }) => (
                            <Icon name="store" size={15} color={color}/>
                        ),
                        headerRight : () => (
                            <TouchableOpacity style={style.btnNewStore} onPress={() => navigation.navigate('CreateStore')}>
                                <Icon name="plus" size={10} color='#ffffff' style={{marginRight: 5, alignItems:'center', justifyContent:'center'}}/>
                                <Text style={style.textBtn}>
                                    Create Store
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    component={ListStore}
                />
            }

            {
                role === "owner" &&
                    <Tab.Screen 
                        name = "ListEmploye"
                        options = {{
                            title : "Employe",
                            headerStyle: {
                                backgroundColor : "#3498db"
                            },
                            headerTintColor : "#ffffff",
                            headerTitleStyle : {
                                fontSize: 15
                            },
                            tabBarIcon : ({ color }) => (
                                <Icon name="user-friends" size={15} color={color}/>
                            ),
                            headerRight : () => (
                                <TouchableOpacity style={style.btnNewStore} onPress={() => navigation.navigate('CreateEmploye')}>
                                    <Icon name="plus" size={10} color='#ffffff' style={{marginRight: 5, alignItems:'center', justifyContent:'center'}}/>
                                    <Text style={style.textBtn}>
                                        Create employe
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        component={EmployeScreen} 
                    />
            }

            <Tab.Screen 
                name = "ChangePassword"
                options = {{
                    title : "Settings",
                    headerStyle: {
                        backgroundColor : "#3498db"
                    },
                    headerTitleStyle : {
                        fontSize: 15
                    },
                    headerTintColor : "#ffffff",
                    tabBarIcon : ({ color }) => (
                        <Icon name="cog" size={15} color={color}/>
                    ),
                    headerRight : () => (
                        <TouchableOpacity style={style.btnNewStore} onPress={() => logout()}>
                            <Icon name="sign-out-alt" size={10} color='#ffffff' style={{marginRight: 5, alignItems:'center', justifyContent:'center'}}/>
                            <Text style={style.textBtn}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                component={ChangePassword} 
            />
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    btnNewStore : {
        backgroundColor : '#3498db',
        alignItems: 'center',
        justifyContent : 'center',
        padding : 15,
        flexDirection: 'row'
    },
    textBtn : {
        color: '#ffffff',
        fontSize: 12
    }
})

export default HomeRoutes
