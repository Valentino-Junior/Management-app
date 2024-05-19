import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AppScreen = () => {
  const navigation = useNavigation();
  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Todolist');
    });
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apps</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
          <Animated.View style={[styles.card, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.touchable}
            >
              <Text style={styles.cardText}>Todo App </Text>
            </TouchableOpacity>
          </Animated.View>
        
      </ScrollView>
    </View>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#841584',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '45%',
    height: 100,
    backgroundColor: '#841584',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: '2.5%',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
