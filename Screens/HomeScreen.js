import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


const items = [
  
  {
    img: 'https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80',
    name: 'Audi R8',
    price: 158600,
    hp: 562,
    acceleration: 3.2,
    miles: 24000,
    location: 'Seattle, WA',
    date: new Date('2024-05-18'),
  },
  {
    img: 'https://images.unsplash.com/photo-1590656364826-5f13b8e32cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
    name: 'Nissan GTR',
    price: 225500,
    hp: 598,
    acceleration: 3.7,
    miles: 13000,
    location: 'Richmond, VA',
    date: new Date('2024-05-18'),
  },
  {
    img: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    name: 'Porsche 911',
    price: 160100,
    hp: 640,
    acceleration: 3.5,
    miles: 6000,
    location: 'San Diego, CA',
    date: new Date('2024-05-18'),
  },

  {
    img: 'https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80',
    name: 'Audi R8',
    price: 158600,
    hp: 562,
    acceleration: 3.2,
    miles: 24000,
    location: 'Seattle, WA',
    date: new Date('2024-05-18'),
  }

];



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
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.menuItem}>Transactions</Text>
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
        <Text style={styles.title}>Valor Management</Text>
        <Image
          source={require('../assets/valor.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      

      <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Available Cars</Text>

        {items.map(
          (
            { img, name, price, miles, location, date, hp, acceleration },
            index,
          ) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      style={styles.cardImg}
                      source={{ uri: img }} />
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{name}</Text>

                      <Text style={styles.cardPrice}>
                        ${price.toLocaleString('en-US')}
                      </Text>
                    </View>

                    <View style={styles.cardStats}>
                      <View style={styles.cardStatsItem}>
                        <FeatherIcon
                          color="#48496c"
                          name="zap"
                          size={14} />

                        <Text style={styles.cardStatsItemText}>{hp} hp</Text>
                      </View>

                      <View style={styles.cardStatsItem}>
                        <FeatherIcon
                          color="#48496c"
                          name="navigation"
                          size={14} />

                        <Text style={styles.cardStatsItemText}>
                          {miles.toLocaleString('en-US')} miles
                        </Text>
                      </View>

                      <View style={styles.cardStatsItem}>
                        <FeatherIcon
                          color="#48496c"
                          name="clock"
                          size={14} />

                        <Text style={styles.cardStatsItemText}>
                          {acceleration} sec
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.cardFooterText}>{location}</Text>

                      <Text style={styles.cardFooterText}>
                        {date.toLocaleDateString('en-US', {
                          day: 'numeric',
                          year: 'numeric',
                          month: 'short',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          },
        )}
      </ScrollView>
    </SafeAreaView>


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
    height: 500,
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

  
/*cards styling*/
  container: {
    padding: 24,
  },
  
 
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -12,
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090',
  },
});

export default HomeScreen;
