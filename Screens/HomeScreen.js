import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const slideAnim = new Animated.Value(-300); // Initial value for side menu

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: slideAnim._value === 0 ? -300 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      closeMenu();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#841584" />

      {/* Overlay to close menu when touched */}
      {slideAnim._value === 0 && (
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
      )}

      <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
        {/* Close Drawer Icon */}
        <View style={styles.drawerHeader}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Features')}>
          <Text style={styles.menuItem}>Features</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tenants')}>
          <Text style={styles.menuItem}>Tenants</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <MaterialIcons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Landlord Management</Text>
        <Image
          source={require('../assets/valor.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Welcome, Manage Your Tenants Efficiently</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Tenant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Tenants</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: '#841584',
    padding: 20,
    zIndex: 1000,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 10,
  },
  menuItem: {
    color: '#ffffff',
    fontSize: 18,
    marginVertical: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  content: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
  },
});

export default HomeScreen;
