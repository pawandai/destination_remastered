import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import {
  Title,
  Paragraph,
  Divider,
  TextInput,
  Button,
  HelperText,
  Checkbox,
} from 'react-native-paper';

const Tools = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', { name, email, password });
    // You can add logic to send data to your backend here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Create Account</Title>
        <Paragraph style={styles.subtitle}>
          or use email for registration
        </Paragraph>
      </View>
      <Divider />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Enter your full name'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder='Enter your email'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder='Enter your password'
          secureTextEntry
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          status={agreeTerms ? 'checked' : 'unchecked'}
          onPress={() => setAgreeTerms(!agreeTerms)}
        />
        <Text style={styles.checkboxText}>
          I agree to the Terms of Service and Privacy Policy
        </Text>
        {agreeTerms && (
          <HelperText type='error'>Please agree to continue.</HelperText>
        )}
      </View>

      <Button
        mode='contained'
        onPress={handleSubmit}
        disabled={!agreeTerms}
        style={styles.button}
      >
        SIGN UP
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#777',
    fontSize: 16,
  },
  inputContainer: {
    margin: 10,
  },
  label: {
    marginBottom: 5,
  },
  textInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#333', // Change as needed
    borderRadius: 5,
  },
});

export default Tools;
