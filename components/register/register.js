import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TouchableWithoutFeedback,KeyboardAvoidingView, TextInput,Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { AuthContext } from '../Context/context';
import  'react-native-gesture-handler';



export default class Register extends Component {
    constructor(props){
        super(props)
            this.state = {
                fullName:'',
                email:"",
                password:"",
                errorMessage: ''
            };

    }

handleSignUp(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.setState({
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        
    })
  )
    .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...

        this.setState({
            errorMessage: error.errorMessage
        })
      });
}

componentWillUnmount(){
    this.setState({
        fullName: null,
        email: null,
        password: null,
        errorMessage: null
    })
}

  render() {
    return (

        <KeyboardAvoidingView
                keyboardVerticalOffset = {70} 
                style={{ flex:1 }}
                behavior = "padding" >
        <TouchableWithoutFeedback
        onPress={() =>{
            Keyboard.dismiss();  
          }}>
             
            
             <LinearGradient 
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#009491', '#003837', '#002928']} 
                style={styles.linearGradient}
             >
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Register to Start Your Free Account!</Text>
            </View>
            
            <View style={styles.createInputsContainer}>
               <AuthContext.Consumer>
                   {(value) => (
                      <TouchableOpacity 
                    style={styles.create}
                      onPress={() =>{value.logInUser, this.handleSignUp()}}
                      >
                          <Text style={styles.createText} >Create</Text>
                      </TouchableOpacity> 
                    )}
            </AuthContext.Consumer>
            <View> 
                    <Text>
                        {this.state.errorMessage}
                    </Text> 
                </View>

            <View style = {{justifyContent:'center', alignItems: 'center'}}>
                <TextInput 
                   style={styles.textInputs}
                    placeholder= "Full Name..."
                    placeholderTextColor ="rgba(0,0,0, .6)"
                    onChangeText={(fullName) => this.setState({ fullName })}
                    value={this.state.fullName}
                >
                    </TextInput>
                <TextInput 
                    style={styles.textInputs}
                    placeholder= "Email..."
                    placeholderTextColor ="rgba(0,0,0, .6)"
                    onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                >
                </TextInput>
                <TextInput 
                    style={styles.textInputs}
                    placeholder= "Password..."
                    placeholderTextColor ="rgba(0,0,0, .6)"
                    onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                      secureTextEntry={true}
                >
                </TextInput>
            </View>
            </View>
            <View style={{flex:1}}></View>
        </View>
       
       </LinearGradient>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>

    );
  }
}


const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        
      },
    container:{
        flex:1, 
        justifyContent:'flex-end', 
        alignItems: 'center', 
      
    },
    createInputsContainer:{
        backgroundColor: 'rgba(255, 255, 255, .9)',
        alignItems: 'center',
        marginLeft:10,
        marginRight: 10,

        paddingLeft:25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10,
        // shadowOffset: {
        //   width: 0,
        //   height: 5,
        // },
        // shadowOpacity: 0.9,
        // shadowRadius: 5,

        // elevation:14,
        
    },
    textInputs:{
        width:250, 
        borderBottomWidth: 1, 
        borderBottomColor: 'black',
        marginBottom: 50,
        padding:5,
        fontSize: 22
    },
    title:{
        fontSize:35, 
        color:'white',
        textAlign:'center',
        letterSpacing:1,
 
    },
    create:{
        marginBottom: 50,
        marginTop: 50,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(35, 159, 130, 1)',
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderColor: 'transparent',
        
    },
    createText:{
        color: 'white',
        fontSize: 25,
        letterSpacing: 3,

    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        width:'100%',
        height: 200,
        textAlign:'center',
        backgroundColor: 'transparent',
        
    }
})