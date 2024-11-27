import { StatusBar } from 'expo-status-bar';
import { addDoc,setDoc,doc, collection } from 'firebase/firestore';
import { Button, StyleSheet, Text, View } from 'react-native';
import { firebase_store } from './firebaseConfig';
import {  deleteDoc } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import  Home  from './screens/Home';

const Stack = createNativeStackNavigator();


export default function App() {
  // const demo = async()=>{
  //   await setDoc(doc(firebase_store,"demo1","id2"),{
  //     ten: "Bao31",
  //     tuoi: 20,
  //     ns:2004
  //   })
  // }
  // const del = async()=>{
  //   await deleteDoc(doc(firebase_store, "demo1", "id1"));
  // }
  return (
    // <Home/>
     
    //   <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Signup" component={SignUp} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login' }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ title: 'Sign Up' }} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Home' }} 
      />
    </Stack.Navigator>
  </NavigationContainer>

      
      
      
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  but: {
    margin:5
  }
});
