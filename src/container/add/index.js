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
    title: '',
    img: '',
    imgDes: '',
    information1: '',
    information2: '',
    newsTitle: '',
  });
  const {
    title,
    img,
    imgDes,
    information1,
    information2,
    newsTitle,
  } = informationNew;
  handleOnChange = (name, value) => {
    setInformationNew({
      ...informationNew,
      [name]: value,
    });
  };
  onSubmit = () => {
    firebaseApp
      .database()
      .ref('data/News')
      .push({
        title,
        img,
        imgDes,
        information1,
        information2,
        newsTitle,
      });
  };
  onClear = () => {
    setInformationNew({
      title: '',
      img: '',
      imgDes: '',
      information1: '',
      information2: "",
	  newsTitle: '',
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Information 1"
        value={information1}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('information1', text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Title"
        value={title}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('title', text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Image"
        value={img}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('img', text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Image Des"
        value={imgDes}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('imgDes', text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="NewTitle"
        value={newsTitle}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('newsTitle', text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="InFormation 2"
        value={information2}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={text => handleOnChange('information2', text)}
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
