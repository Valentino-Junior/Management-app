import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Animated, Easing } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [isEditing, setIsEditing] = useState(false);
  const [photoScale] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  useEffect(() => {
    if (photo) {
      Animated.timing(photoScale, {
        toValue: 1.1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(photoScale, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [photo]);

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSave = () => {
    // Save the updated details
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Animated.View style={[styles.profileContainer, { transform: [{ scale: photoScale }] }]}>
          <Image
            source={photo ? { uri: photo } : require('../assets/valor.png')}
            style={styles.profilePhoto}
          />
          <MaterialIcons name="edit" size={24} color="white" style={styles.editIcon} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, isEditing && styles.inputEditing]}
        value={name}
        onChangeText={setName}
        editable={isEditing}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, isEditing && styles.inputEditing]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={isEditing}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={[styles.input, isEditing && styles.inputEditing]}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={isEditing}
      />
      {!isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      {isEditing && (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#841584',
  },
  profilePhoto: {
    width: 150,
    height: 150,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#841584',
    borderRadius: 50,
    padding: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  inputEditing: {
    borderWidth: 1,
    borderColor: '#841584',
  },
  editButton: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

