import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import firebaseApp from '../../service/api/index';

export default function Add() {
  const [informationNew, setInformationNew] = useState({
    text: '',
  });
  const {text} = informationNew;
  useEffect(() => {}, [
    firebaseApp
      .database()
      .ref('data/Food')
      .on('value', dataSnapshot => {
        dataSnapshot.forEach(child => {
          child.forEach(data => {
            console.log(data.key);
          });
        });
      }),
  ]);
  handleOnChange = (name, value) => {
    setInformationNew({
      ...informationNew,
      [name]: value,
    });
  };
  onSubmit = () => {
    firebaseApp
      .database()
      .ref('data')
      .push({
        text: text,
        uid: key,
      });
  };
  onClear = () => {
    setInformationNew({text: uid});
    console.log(informationNew);
    console.log(uid);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Fuck"
        value={text}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('text', text)}
      />

      <Button
        style={{marginBottom: 20, width: 100, height: 50}}
        title="Submit"
        onPress={() => onSubmit()}
      />
      <Button
        style={{marginTop: 20, width: 100, height: 50}}
        title="Clear"
        onPress={() => onClear()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: 300,
    height: 49,
    borderColor: 'rgb(184,184,184)',
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 30,
    marginBottom: 20,
    fontSize: 16,
  },
});
