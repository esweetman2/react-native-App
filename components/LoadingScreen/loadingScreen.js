import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';





export default class LoadingScreen extends Component {
    
componentDidMount() {
    
}

  render() {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: "lightblue"}}>
          {/* <Image style={styles.logo} source={require('../images/Logo.png')} /> */}
          <Text style={styles.header} >SalonSort</Text>
        <Text style={{margin: 20, fontSize: 18}} >Loading...</Text>
        
        <ActivityIndicator size='large'></ActivityIndicator>
        </View>

    );
  }
}



const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    // backgroundColor:'white',
    borderRadius: 50,
    margin:0
  },
  header:{
    fontSize: 60,
    textAlign: 'center',
    color:'rgba(0,0,0, .8)',
    fontWeight: '900',
    fontFamily: 'Snell Roundhand',
    letterSpacing: 1.5 
},
})