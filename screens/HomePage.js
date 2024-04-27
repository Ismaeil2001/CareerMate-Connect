import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, PermissionsAndroid, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import QRCode from 'react-native-qrcode-svg';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const HomePage = () => {
  const [qrValue, setQrValue] = useState(null);
  useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        database().ref(`/users/${uid}`).once('value').then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            setName(userData.name || '');
            setPosition(userData.position || '');
            setCompany(userData.company || '');
            setQrValue(userData.qrValue || null);
          }
        });
      }
    });

    return () => authListener();
  }, []);

  const saveUserData = () => {
    const uid = firebase.auth().currentUser.uid;
    database().ref(`/users/${uid}`).set({
      qrValue: qrValue,
      name: name,
      position: position,
      company: company,
    });
  };

  const pickDocument = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to upload the file.',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
        return;
      }

      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('URI of file:', res.uri);

      const realPath = `${RNFS.TemporaryDirectoryPath}/${res.name}`;
      await RNFS.copyFile(res.uri, realPath);

      const uid = firebase.auth().currentUser.uid;
      const reference = storage().ref(`/users/${uid}/${res.name}`);

      const task = reference.putFile(realPath);

      task.on('state_changed', snapshot => {
        if (snapshot.state === 'success') {
          console.log('File uploaded to Firebase Storage!');
          reference.getDownloadURL().then(url => {
            console.log('File available at:', url);
            setQrValue(url);
            const uid = firebase.auth().currentUser.uid;
            database().ref(`/users/${uid}`).update({ qrValue: url }); // Use update instead of set
          });
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
     <ScrollView contentContainerStyle={styles.scrollview}>
      <TextInput
        style={styles.text}
        onChangeText={(text) => { setName(text); saveUserData(); }} // Save user data after setting name
        value={name}
        placeholder={name ? `Name: ${name}` : 'Name'}
        placeholderTextColor="#3b808a"
      />
      <TextInput
        style={styles.text}
        onChangeText={(text) => { setPosition(text); saveUserData(); }} // Save user data after setting position
        value={position}
        placeholder={position ? `Position: ${position}` : 'Current Position'}
        placeholderTextColor="#3b808a"
      />
      <TextInput
        style={styles.text}
        onChangeText={(text) => { setCompany(text); saveUserData(); }} // Save user data after setting company
        value={company}
        placeholder={company ? `Company: ${company}` : 'Company Name'}
        placeholderTextColor="#3b808a"
      />
      <View style={styles.qrContainer}>
        {qrValue && <QRCode value={qrValue} size={300} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>Upload Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>Update QR Code</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background color for the whole screen
  },
  scrollview: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b808a',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 10, // Add shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Add this line
  },
});

export default HomePage;
