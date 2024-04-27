import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  

  const navigation = useNavigation();

  const handleLogin = () => {
    setErrortext("");
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        // If server response message same as Data Matched
        if (user) navigation.replace("TabNavigator");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email")
          setErrortext(error.message);
        else if (error.code === "auth/user-not-found")
          setErrortext("No User Found");
        else {
          setErrortext(
            "Please check your email id or password",
            textAlign='center'
          );
        }
      });
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        style={styles.logo}
        source={require('../assets/frame.png')}
      />
      <Text style={styles.welcomeText}>Welcome, please sign in to continue</Text>
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
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#3b808a" />
        {errortext != "" ? (
        <Text style={styles.errorTextStyle}>
          {errortext} </Text>
      ) : null}
      </View>
      <View style={styles.signupContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
        <Text style={{color: 'black'}}>
          {"Don't have an account?"}
          <Text style={[styles.signupText, {color: 'black'}]}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: windowWidth,
    height: windowHeight * 0.4, // Adjust this value as needed,
    resizeMode: 'contain',
    marginBottom: 35,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#3b808a',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
  },
    buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 20,
    elevation: 10, // Add shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3b808a',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  errorTextStyle: {
    color: 'red',
    justifyContent: 'center',
  },
});

export default LoginPage;
