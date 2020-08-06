/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView, Linking } from 'react-native';
import {Item, Input, Label } from 'native-base'



import 'react-native-gesture-handler';

import * as firebase from 'firebase';
import { AuthContext } from '../Context/context';



export default class SignIn extends Component {
    constructor(props){
        super(props)
            this.state = {
              email: "",
              password:'',
              errorMessage: ''
            }
    }

handleSignIn(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
        this.setState({
            errorMessage: error.message,
            email: "",
            password:'',
        }),
        setTimeout(()=> {
            this.setState({
                errorMessage: null
            })
        },2000)
      });
   
}

componentWillUnmount(){
    this.setState({
        errorMessage: null,
        email: "",
        password:'',
    })
}
    


  render() {
    return (
        <ImageBackground
        style={styles.imageBackground}
        source= {require('../images/grayscale-photo-of-woman-1399073.jpg')}
        >
            <KeyboardAvoidingView
                keyboardVerticalOffset = {0} // adjust the value here if you need more padding
                style = {{ flex: 1 }}
                behavior = "padding" >
            <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();  
          }}>
            <View style = {styles.homeContainer}>
                <View style={styles.welcomeHeader}> 
                    <Text style={styles.welcomeText}>
                        Welcome, login to get started!
                    </Text> 
                </View>
                <View style={{marginTop:30}}> 
                    <Text style={{color: 'white', fontSize:18}}>
                        {this.state.errorMessage}
                    </Text> 
                </View>
                <View 
                style = {styles.userContainer}
                >
                    <View 
                    style = {styles.loginContainer}
                    >
                                <Item style={styles.login} floatingLabel>
                                <Label style={styles.textInputsLable} >Email</Label>
                                <Input style={styles.textInputs}
                        onChangeText={email => this.setState({email:email})}
                        value={this.state.email}/>
                    
                                </Item>
                                <Item style={styles.login} floatingLabel >
                                <Label style={styles.textInputsLable}>Password</Label>
                                <Input style={styles.textInputs}
                        onChangeText={password => this.setState({password:password})}
                        value={this.state.password}
                        secureTextEntry = {true}/>
                                </Item>
                            
                            
                        
                    </View>



                     <AuthContext.Consumer>
                         {(value) => (
                            <TouchableOpacity 
                            style={styles.loginBtn}
                            onPress={() =>{value.logInUser, 
                            this.handleSignIn()}
                                
                            }
                            >
                                <Text style={styles.text}>LOGIN</Text>
                            </TouchableOpacity>
                         )}
                            
                            </AuthContext.Consumer>




                    <TouchableOpacity 
                    style={{marginTop: 20}}
                    onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.registerText}>Not register? Create account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{marginTop: 20}}
                    onPress={() => Linking.openURL('https://www.termsfeed.com/privacy-policy/28f635cc04cbd9084902d65e838c9cda')}
                    >
                        <Text style={styles.registerText}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
    imageBackground:{
        width: '100%',
        height: '100%'
    },
    welcomeHeader:{
        marginTop: 0,
        width: '90%',
        textAlign:'center'
    },
    welcomeText:{
        fontSize: 40,
        textAlign: 'center',
        opacity: .9,
        
        letterSpacing: .5,
        color: "white",
        letterSpacing: 1.1,
    },
    homeContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .65)',
        width: '100%',
        marginTop: -50
       
    },
    textInputs:{
        color: 'white',
        fontSize: 22
    },
    textInputsLable:{
        color:'white',
        
        opacity: .95,
    },

    userContainer:{ 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  
    },
    loginContainer:{
        marginTop: 75, 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    login:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:25,
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: 'white',
        width: 250,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
        
        
    },
    loginBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom:30,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: '50%',
        backgroundColor: 'rgba(229, 240, 255, 1)',  
        paddingTop: 10,
        paddingBottom: 10,
    },
    register:{
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: '60%',
        backgroundColor: '#EAFEFF',  
        paddingTop: 10,
        paddingBottom: 10,
        
    },
    viewClientsText:{
        color: 'white',
        fontSize: 25,
        letterSpacing: 5
    },
    text:{
        color: 'black',
        fontSize: 16,
        letterSpacing: 5
    },
    registerText:{
        color:'white',
        fontSize:18
    },
})