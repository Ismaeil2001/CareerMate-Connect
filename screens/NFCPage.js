import React, { useCallback } from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet, Dimensions, View, Linking } from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

async function readNdef() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    const tagID = tag.id; // get the tag's unique ID

    console.log('Detected NFC tag with UID:', tagID);

    // Define your links based on the tag's UID
    const links = {
      'D35937F5': 'https://firebasestorage.googleapis.com/v0/b/final-project-9ceae.appspot.com/o/Tags%2FIsmaeil_Dissouqi_old.pdf?alt=media&token=22c22b21-2477-416d-84a6-3f5d5e54ac3a',
      '338403FD': 'https://firebasestorage.googleapis.com/v0/b/final-project-9ceae.appspot.com/o/Tags%2FIsmaeil_Dissouqi_CV_2.pdf.pdf?alt=media&token=80ecfcfd-95f0-4bfb-bfbf-5d8fb6286a98',
      // add more links as needed
    };

    // Open the link associated with the tag's UID
    const linkToOpen = links[tagID];
    if (linkToOpen) {
      // Use Linking library or any other method to open the link
      Linking.openURL(linkToOpen);
    } else {
      console.warn('No link found for this tag');
    }
  } catch (ex) {
    Alert.alert('Oops!', ex.toString());
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}


function App() {
  const handlePress = useCallback(() => {
    readNdef();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Tap to Connect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background color for the whole screen
  },
  button: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: Dimensions.get('window').width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b808a',
    elevation: 10, // Add shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;
