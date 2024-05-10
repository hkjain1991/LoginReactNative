import React, {useState} from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
Alert,
ActivityIndicator,
} from 'react-native';
const Login = ({navigation}) => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false)
const onPressLogin = () => {
    setIsLoading(true)
    fetch(
        'https://recruitment-api.pyt1.stg.jmr.pl/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                login: email,
                password: password,
              }),
        }
    ).then(response => response.json()).then(json => {
        setIsLoading(false)
        console.log(email + "   " + password + "::::::::::::")
        if(json.status == "ok" ) {
            navigation.navigate("Dashboard")
        } else { 
           Alert.alert("Invalid userid or password")
        }
    }).catch(
       
        error => {
            setIsLoading(false)
            Alert.alert("Some error came")
        }
    )
    
    //navigation.navigate("Dashboard")
};
return (
<View style={styles.container}>
{isLoading ? <ActivityIndicator size="large"/>: null}
    
<Text style={styles.title}> Login Screen</Text>
<View style={styles.inputView}>
<TextInput
style={styles.inputText}
placeholder="Email"
placeholderTextColor="#003f5c"
onChangeText={text => setEmail(text)}/>
</View>
<View style={styles.inputView}>
<TextInput
style={styles.inputText}
secureTextEntry
placeholder="Password"
placeholderTextColor="#003f5c"
onChangeText={text => setPassword(text)}/>
</View>
<TouchableOpacity
onPress = {onPressLogin}
style={styles.loginBtn}>
<Text>LOGIN </Text>
</TouchableOpacity>
</View>
);
}

const styles = StyleSheet.create({
    indicatorStyle:{
        flex: 1,
alignItems: 'center',
justifyContent: 'center',
    },
container: {
flex: 1,
backgroundColor: '#4FD3DA',
alignItems: 'center',
justifyContent: 'center',
},
title:{
fontWeight: "bold",
fontSize:50,
color:"#fb5b5a",
marginBottom: 40,
},
inputView:{
width:"80%",
backgroundColor:"#3AB4BA",
borderRadius:25,
height:50,
marginBottom:20,
justifyContent:"center",
padding:20
},
inputText:{
height:50,
color:"white"
},
forgotAndSignUpText:{
color:"white",
fontSize:11
},
loginBtn:{
width:"80%",
backgroundColor:"#fb5b5a",
borderRadius:25,
height:50,
alignItems:"center",
justifyContent:"center",
marginTop:40,
marginBottom:10
},
});

export default Login;