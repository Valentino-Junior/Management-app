import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const notices = [];

const AllClientsTab = ({ addNotice }) => {
  const [message, setMessage] = useState('');

  const handleSendNotice = () => {
    if (message.trim() !== '') {
      addNotice({ message, date: new Date(), recipient: 'All Clients' });
      setMessage('');
    }
  };

  return (
    <View style={styles.tabContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type your notice here..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSendNotice}>
        <Text style={styles.buttonText}>Send Notice to All Clients</Text>
      </TouchableOpacity>
    </View>
  );
};

const SpecificClientTab = ({ addNotice }) => {
  const [message, setMessage] = useState('');
  const [client, setClient] = useState('');

  const handleSendNotice = () => {
    if (message.trim() !== '' && client.trim() !== '') {
      addNotice({ message, date: new Date(), recipient: client });
      setMessage('');
      setClient('');
    }
  };

  return (
    <View style={styles.tabContainer}>
      <TextInput
        style={styles.input}
        placeholder="Client's name..."
        value={client}
        onChangeText={setClient}
      />
      <TextInput
        style={styles.input}
        placeholder="Type your notice here..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSendNotice}>
        <Text style={styles.buttonText}>Send Notice to Client</Text>
      </TouchableOpacity>
    </View>
  );
};

const NoticeScreen = () => {
  const [noticesList, setNoticesList] = useState(notices);
  const slideAnim = new Animated.Value(0);

  const addNotice = (notice) => {
    setNoticesList((prev) => [notice, ...prev]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.noticeItem}>
      <Text style={styles.noticeMessage}>{item.message}</Text>
      <Text style={styles.noticeInfo}>
        Sent to: {item.recipient} on {item.date.toLocaleDateString()} at {item.date.toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Animated.View style={[styles.header, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.headerText}>Notices</Text>
      </Animated.View>
      <View style={styles.tabs}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            tabBarStyle: { borderBottomWidth: 1, borderColor: '#ccc' },
            tabBarActiveTintColor: '#841584',
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: { backgroundColor: '#841584', height: 4 },
          }}
        >
          <Tab.Screen name="All Clients">
            {(props) => <AllClientsTab {...props} addNotice={addNotice} />}
          </Tab.Screen>
          <Tab.Screen name="Specific Client">
            {(props) => <SpecificClientTab {...props} addNotice={addNotice} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.noticesContainer}>
          {noticesList.map((item, index) => (
            <View key={index} style={styles.noticeContainer}>
              <Text style={styles.noticeMessage}>{item.message}</Text>
              <Text style={styles.noticeInfo}>
                Sent to: {item.recipient} on {item.date.toLocaleDateString()} at {item.date.toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    height: 60,
    backgroundColor: '#841584',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#841584',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  noticesContainer: {
    flexGrow: 1,
  },
  noticeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  noticeMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  noticeInfo: {
    fontSize: 12,
    color: 'gray',
  },
});

export default NoticeScreen;
