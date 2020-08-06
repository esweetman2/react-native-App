import React, { Component } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, TextInput,} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';



import 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/AntDesign';


export default class ContactInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientInfo: [this.props.route.params.params],
      errorMessage: '',
      contact: [],
      addingNumber: '',
      addingEmail: '',
      addPressed: false,
      editMode: false
    }
  }



  componentDidMount() {
    console.log(this.state.clientInfo[0].name)


    this.getContactInfo(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}contact`)
      .then(contact => {

        if (contact) {
          this.setState({
            contact: JSON.parse(contact)
          })
        }
      }
      );

  }


  editMode(mode) {
    this.setState({
      editMode: mode
    })
  }

  async saveContactInfo(contact) {
    try {
      await AsyncStorage.removeItem(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}contact`);
      await AsyncStorage.setItem(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}contact`, JSON.stringify(contact));
      return contact;
    } catch (error) {
      alert(error)
    }

  };

  getContactInfo = async (key) => {
    try {
      const contact = await AsyncStorage.getItem(key)
      // value previously stored
      if (contact !== null) {
        return contact
      } else {
        return
      }
    } catch (e) {
      // error reading value
      alert(e);
    }
  }

  addInfo() {
    if (this.state.addingNumber === "" || this.state.addingEmail === '') {
      alert('Please Add Client')
    } else {
      let contact = [...this.state.contact];
      contact.push({
        phoneNumber: this.state.addingNumber,
        email: this.state.addingEmail,
        key: Math.floor((Math.random() * 10000) + 1).toString(),

      })
      this.saveContactInfo(contact);


      this.setState({
        contact: contact,

      })

    }

  }

  saveEditContact() {
    let contact = []
    contact.push({
      phoneNumber: this.state.addingNumber,
      email: this.state.addingEmail,
      key: Math.floor((Math.random() * 10000) + 1).toString(),

    })

    this.saveContactInfo(contact);
    this.setState({
      contact: contact
    })

  }



  addPressed(visible) {
    this.setState({
      addPressed: visible
    })
  }



  render() {

    let infoPhone = this.state.contact.map(item => {
      console.log(item);
      return item.phoneNumber
    })

    let infoEmail = this.state.contact.map(item => {
      return item.email
    })

    return (

      <View style={{ flex: 1 }}>

        {this.state.editMode === false ?

          <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: "space-between", width: '90%'}} >

            <TouchableOpacity
              style={{ paddingBottom: 20, margin:10 }}
              onPress={() => this.addPressed(!this.state.addPressed)}
            >
              <Icon name="plus" size={30} style={{ color: 'rgba(201, 255, 227, 1)' }} />
              <Text style={{color:'white'}} >Add</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{ paddingBottom: 50, margin:10 }}
              onPress={() => this.editMode(!this.state.editMode)}
            >
              <Icon name="edit" size={25} style={{ color: 'rgba(201, 255, 227, 1)' }} />
              <Text style={{color:'white'}} >Edit</Text>
            </TouchableOpacity>


            </View>
            <View style={styles.containerChild}>

              <Icon name='phone' size={30} style={{ color: 'rgba(0, 245, 126, 1)' }} />
              <Text style={styles.text}>{infoPhone}</Text>

            </View>
            <View style={styles.containerChild}>
              <Icon name='mail' size={30} style={{ color: 'rgba(0, 245, 126, 1)' }} />
              <Text style={styles.text}>{infoEmail}</Text>
            </View>
          </View>

          :

          <View style={styles.container}>
            <TouchableOpacity
              style={{ paddingBottom: 20 }}
              onPress={() => this.saveEditContact()}
              onPressOut={() => this.editMode(!this.state.editMode)}
            >
              <Text style={{ color: 'white', fontSize: 22 }}> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingBottom: 50 }}
              onPress={() => this.editMode(!this.state.editMode)}
            >
              <Icon name="close" size={30} style={{ color: 'rgba(201, 255, 227, 1)' }} />
              
            </TouchableOpacity>
            <View style={styles.containerChild}>

              <Icon name='phone' size={30} style={{ color: 'rgba(0, 245, 126, 1)' }} />
              <TextInput
                style={styles.editModeTextInput}
                keyboardType={"numeric"}
                placeholder="Enter #"
                placeholderTextColor="white"
                onChangeText={(addingNumber) => this.setState({ addingNumber })}
                value={this.state.addingNumber}
              />

            </View>
            <View style={styles.containerChild}>
              <Icon name='mail' size={30} style={{ color: 'rgba(0, 245, 126, 1)' }} />
              <TextInput
                style={styles.editModeTextInput}
                keyboardType={"email-address"}
                placeholder="Enter Email"
                placeholderTextColor="white"
                onChangeText={(addingEmail) => this.setState({ addingEmail })}
                value={this.state.addingEmail}
              />
            </View>
          </View>
        }


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.addPressed}
        >
          <View style={styles.modalScreen}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{ width: 75 }}
                onPress={() => { this.addPressed(!this.state.addPressed) }}
              >
                <Icon name='minus' size={70} style={{ textAlign: 'center', marginTop: 0, color: 'black' }} />
              </TouchableOpacity>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.addInfo}
                keyboardType={"numeric"}
                placeholder="Enter #"
                placeholderTextColor="rgba(0,0,0, .2)"
                onChangeText={(addingNumber) => this.setState({ addingNumber })}
                value={this.state.addingNumber}
              />
              <TextInput
                style={styles.addInfo}
                keyboardType={"email-address"}
                placeholder="Enter Email"
                placeholderTextColor="rgba(0,0,0, .2)"
                onChangeText={(addingEmail) => this.setState({ addingEmail })}
                value={this.state.addingEmail}
              />
            </View>

            <TouchableOpacity
              style={styles.submitInfo}
              onPress={this.addInfo.bind(this)}
              onPressOut={() => {
                this.addPressed(!this.state.addPressed);
              }}
            >

              <Icon name='checkcircleo' size={30} style={{ marginTop: 20, color: 'rgba(0, 0, 0, 1)' }} />

            </TouchableOpacity>


          </View>

        </Modal>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 25,
    backgroundColor: 'rgba(69, 69, 69, 1)'

  },
  containerChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    width: '100%',
    borderBottomColor: 'rgba(255, 255, 255, .5)',
    borderBottomWidth: 2
  },

  text: {
    textAlign: 'center',
    // marginLeft: 50,
    fontSize: 22,
    color: 'white'
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    height: '75%',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    marginTop: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textInputContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 70


  },
  editModeTextInput: {
    fontSize: 22,
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
    color: 'white',
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0,0,0, .7)',
    width: '75%',

    
  },
  addInfo: {
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
    color: 'black',
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0,0,0, .7)',
    width: '75%',

    margin: 20,

  }
})