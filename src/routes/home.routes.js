import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

// screeen
import ListStore from "../views/list_store.screen";
import ChangePassword from "../views/change_password.screen";
import TransactionScreen from "../views/list_transactions.screen";
import EmployeScreen from "../views/list_employe.screen";

const Tab = createBottomTabNavigator();
const HomeRoutes = ({ navigation }) => {
    return (
        <Tab.Navigator activeColor="#3498db">
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
                            <Text style={style.textBtn}>
                                + Create Store
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                component={ListStore}
            />
            <Tab.Screen 
                name = "ListTransaction"
                options = {{
                    title : "Transaction",
                    headerStyle: {
                        backgroundColor : "#3498db"
                    },
                    headerTintColor : "#ffffff",
                    headerTitleStyle : {
                        fontSize: 15
                    },
                    tabBarIcon : ({ color }) => (
                        <Icon name="cash-register" size={15} color={color}/>
                    ),
                    headerRight : () => (
                        <TouchableOpacity style={style.btnNewStore} onPress={() => navigation.navigate('CreateTransaction')}>
                            <Text style={style.textBtn}>
                                + Create Transaction
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                component={TransactionScreen} 
            />
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
                            <Text style={style.textBtn}>
                                + Create employe
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                component={EmployeScreen} 
            />
            <Tab.Screen 
                name = "ChangePassword"
                options = {{
                    title : "Change Password",
                    headerStyle: {
                        backgroundColor : "#3498db"
                    },
                    headerTitleStyle : {
                        fontSize: 15
                    },
                    headerTitleAlign: 'center',
                    headerTintColor : "#ffffff",
                    tabBarIcon : ({ color }) => (
                        <Icon name="lock" size={15} color={color}/>
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
        padding : 15
    },
    textBtn : {
        color: '#ffffff',
        fontSize: 12
    }
})

export default HomeRoutes
