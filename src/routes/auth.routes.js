import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil'
import SplashScreen from  "react-native-splash-screen";


// screen
import LoginScreen from '../views/login.screen';
import ForgotPassword from '../views/forgot_password.screen';
import HomeScreen from '../views/home.screen';
import HomeRoutes from './home.routes';
import CreateStore from '../views/create_store.screen';
import CreateTransaction from '../views/create_transaction.screen';
import CreateEmploye from '../views/create_employe.screen';
import PublicRegister from '../views/public_register'

const Stack = createNativeStackNavigator();
const AuthRoutes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen 
					options={{ headerShown:false }} 
					name="LoginScreen"
					component={LoginScreen} 
				/>
				<Stack.Screen
					options={{
						title: "Fotgot password",
						headerTitleStyle : {
							fontSize: 13
						},
						headerTitleAlign : "center",
						headerTintColor : "#ffffff",
						headerStyle : {
							backgroundColor : "#3498db"
						}
					}}
					name="ForgotPassword"
					component={ForgotPassword}
				/>
				<Stack.Screen
					options={{
						title: "Register",
						headerTitleStyle : {
							fontSize: 13
						},
						headerTitleAlign : "center",
						headerTintColor : "#ffffff",
						headerStyle : {
							backgroundColor : "#3498db"
						}
					}}
					name="Register"
					component={PublicRegister}
				/>
				<Stack.Screen
					options={{ headerShown:false }} 
					name="HomeScreen" 
					component={HomeScreen}
				/>
				<Stack.Screen
					options={{ headerShown:false }} 
					name="HomeRoutes" 
					component={HomeRoutes}
				/>
				<Stack.Screen
					name="CreateStore"
					component={CreateStore}
					options={{
						title: "Create store",
						headerTitleStyle : {
							fontSize: 15
						},
						headerTitleAlign : "center",
						headerTintColor : "#ffffff",
						headerStyle : {
							backgroundColor : "#3498db"
						}
					}}
				/>
				<Stack.Screen
					name="CreateTransaction"
					component={CreateTransaction}
					options={{
						title: "Create Transaction",
						headerTitleStyle : {
							fontSize: 15
						},
						headerTitleAlign : "center",
						headerTintColor : "#ffffff",
						headerStyle : {
							backgroundColor : "#3498db"
						}
					}}
				/>
				<Stack.Screen
					name="CreateEmploye"
					component={CreateEmploye}
					options={{
						title: "Create Employe",
						headerTitleStyle : {
							fontSize: 15
						},
						headerTitleAlign : "center",
						headerTintColor : "#ffffff",
						headerStyle : {
							backgroundColor : "#3498db"
						}
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const App = () => {

	useEffect(()=>{
		SplashScreen.hide();
	}, [])

	return (
		<RecoilRoot>
			<AuthRoutes/>
		</RecoilRoot>
	)
}

export default App;