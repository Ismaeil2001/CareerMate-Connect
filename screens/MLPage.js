import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const MLPage = () => {
  const [currentPosition, setCurrentPosition] = useState('');
  const [desiredPosition, setDesiredPosition] = useState('');
  const [skills, setSkills] = useState([]);

  const analyzeSkillGap = () => {
    if (currentPosition.toLowerCase() === 'student' && desiredPosition.toLowerCase() === 'software developer') {
      setSkills(['database management', 'backend development', 'data structures']);
    } else if (currentPosition.toLowerCase() === 'student' && desiredPosition.toLowerCase() === 'cybersecurity specialist') {
      setSkills(['Intrusion detection', 'Risk analysis', 'cloud security', 'security analysis']);
    }
    else if (currentPosition.toLowerCase() === 'student' && desiredPosition.toLowerCase() === 'data scientist') {
      setSkills(['machine learning knowledge', 'data analysis', 'big data tools']);
    }
    else if (currentPosition.toLowerCase() === 'student' && desiredPosition.toLowerCase() === 'network engineer') {
      setSkills(['cloud networing', 'network operating systems', 'network security protocols']);
    }
    else if (currentPosition.toLowerCase() === 'software developer' && desiredPosition.toLowerCase() === 'cybersecurity specialist') {
      setSkills(['Intrusion detection', 'Intrusion detection', 'cloud security', 'security analysis']);
    }
    else if (currentPosition.toLowerCase() === 'software developer' && desiredPosition.toLowerCase() === 'data scientsit') {
      setSkills(['proficiency in sql', 'machine learning knowledge', 'Data analysis', 'big data tools']);
    }
    else if (currentPosition.toLowerCase() === 'software developer' && desiredPosition.toLowerCase() === 'network engineer') {
      setSkills(['internet protocols', 'network security protocols', 'cloud networing', 'network operating systems']);
    }
    else if (currentPosition.toLowerCase() === 'cybersecurity specialist' && desiredPosition.toLowerCase() === 'software developer') {
      setSkills(['backend development', 'data structures', 'cloud networing', 'database management']);
    }
    else if (currentPosition.toLowerCase() === 'cybersecurity specialist' && desiredPosition.toLowerCase() === 'data scientist') {
      setSkills(['proficiency in sql', 'Data analysis', 'big data tools', 'big data tools']);
    }
    else if (currentPosition.toLowerCase() === 'cybersecurity specialist' && desiredPosition.toLowerCase() === 'network engineer') {
      setSkills(['internet protocols', 'cloud networing', 'network operating systems', 'network operating systems']);
    }
    else if (currentPosition.toLowerCase() === 'data scientist' && desiredPosition.toLowerCase() === 'software developer') {
      setSkills(['backend development', 'proficiency in python']);
    }
    else if (currentPosition.toLowerCase() === 'data scientist' && desiredPosition.toLowerCase() === 'cybersecurity specialist') {
      setSkills(['Intrusion detection', 'Risk analysis', 'cloud security', 'security analysis']);
    }
    else if (currentPosition.toLowerCase() === 'data scientist' && desiredPosition.toLowerCase() === 'network engineer') {
      setSkills(['internet protocols', 'cloud networing', 'network operating systems', 'network operating systems']);
    }
    else if (currentPosition.toLowerCase() === 'network engineer' && desiredPosition.toLowerCase() === 'software developer') {
      setSkills(['proficiency in python', 'database management', 'backend development', 'data structures']);
    }
    else if (currentPosition.toLowerCase() === 'network engineer' && desiredPosition.toLowerCase() === 'cybersecurity specialist') {
      setSkills(['Intrusion detection', 'Risk analysis', 'cloud security', 'security analysis']);
    }
    else if (currentPosition.toLowerCase() === 'network engineer' && desiredPosition.toLowerCase() === 'data scientist') {
      setSkills(['proficiency in sql', 'machine learning knowledge', 'Data analysis', 'big data tools']);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Image
          style={styles.image}
          source={require('../assets/skilgap.jpeg')}
        />
        <TextInput
          style={styles.input}
          onChangeText={setCurrentPosition}
          value={currentPosition}
          placeholder="Enter current position"
          placeholderTextColor="#3b808a"
          color="black"
        />

        <TextInput
          style={styles.input}
          onChangeText={setDesiredPosition}
          value={desiredPosition}
          placeholder="Enter desired position"
          placeholderTextColor="#3b808a"
          color="black"
        />

        <View style={styles.buttonContainer}>
          <Button title="Analyze skill gap" onPress={analyzeSkillGap} color="#3b808a" />
        </View>

        {skills.length > 0 && (
          <View style={styles.skillBox}>
            <Text style={styles.skillTtileText}>Required skills to transition to your desired path:</Text>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.skillText}>{skill}</Text>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollview: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
  button: {
    backgroundColor: '#3b808a',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold', 
  },
  skillBox: {
    marginTop: 20,
    padding: 10,
    borderColor: '#3b808a',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  skillText: {
    color: 'black', 
    fontSize: 16,
  },
  skillTtileText: {
    color: 'black',
    fontWeight: 'bold', 
    fontSize: 16,
  },
});


export default MLPage;

