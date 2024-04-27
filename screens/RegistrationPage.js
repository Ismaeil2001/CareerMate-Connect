import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import auth from "@react-native-firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegistrationPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState("");

  const handleRegistration = () => {
    setErrortext("");
    if (!email) return alert("Please fill Email");
    if (!password) return alert("Please fill Password");

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Registration Successful. Please Login to proceed");
        console.log(user);
        if (user) {
          navigation.replace("TabNavigator");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext("That email address is already in use!");
        } else {
          setErrortext(error.message);
        }
      });
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/RP.png')}
      />
      <Text style={styles.RegisterText}>You are one step closer!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#3b808a"
        color="black"
        textAlign="left"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#3b808a"
        color="black"
        textAlign="left"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {errortext != "" ? (
        <Text style={styles.errorTextStyle}>
          {errortext} </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5', // Light grey background for contrast
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.3, // Adjust this value as needed
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#3b808a', // Use the same color as the button for consistency
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white', // White background for better visibility
  },
  button: {
    backgroundColor: '#3b808a',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  RegisterText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: 'black',
  },
  errorTextStyle: {
    color:'red'
  },
});

export default RegistrationPage;
