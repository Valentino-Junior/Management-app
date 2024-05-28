import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Animated, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const PaymentTab = ({ makePayment }) => {
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const scaleValue = new Animated.Value(1);

  const handlePressIn = (method) => {
    setSelectedMethod(method);
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (method) => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setCardDetails({ ...cardDetails, expiry: currentDate.toDateString() });
  };

  const handlePayment = () => {
    if (!amount || !cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !selectedMethod) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all the fields and select a payment method.'
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Payment initiated successfully.'
      });
      makePayment(selectedMethod, cardDetails, amount, date);
    }, 2000);
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <KeyboardAvoidingView style={styles.paymentContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Enter Payment Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Card Name"
        value={cardDetails.name}
        onChangeText={(text) => setCardDetails({ ...cardDetails, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardDetails.number}
        onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{cardDetails.expiry || 'Select Expiry Date'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cardDetails.cvv}
        onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
        secureTextEntry
      />
      <Text style={styles.title}>Select Payment Method</Text>
      <Animated.View style={[styles.card, animatedStyle, selectedMethod === 'debit' && styles.selectedCard]}>
        <TouchableOpacity
          onPressIn={() => handlePressIn('debit')}
          onPressOut={() => handlePressOut('debit')}
          style={styles.touchable}
        >
          <FontAwesome name="cc-mastercard" size={24} color={selectedMethod === 'debit' ? '#fff' : '#841584'} />
          <Text style={[styles.cardText, selectedMethod === 'debit' && styles.selectedCardText]}>Debit Card</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.card, animatedStyle, selectedMethod === 'credit' && styles.selectedCard]}>
        <TouchableOpacity
          onPressIn={() => handlePressIn('credit')}
          onPressOut={() => handlePressOut('credit')}
          style={styles.touchable}
        >
          <FontAwesome name="cc-visa" size={24} color={selectedMethod === 'credit' ? '#fff' : '#841584'} />
          <Text style={[styles.cardText, selectedMethod === 'credit' && styles.selectedCardText]}>Credit Card</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={handlePayment} style={styles.sendButton}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.sendButtonText}>Send Payment</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const TransactionsTab = ({ transactions }) => {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text style={styles.transactionText}>Code: {item.code}</Text>
          <Text style={styles.transactionText}>Amount: Ksh{item.amount}</Text>
          <Text style={styles.transactionText}>Date: {item.date.toDateString()} {item.date.toLocaleTimeString()}</Text>
          <Text style={styles.transactionText}>Method: {item.method.toUpperCase()}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'payments', title: 'Payments' },
    { key: 'transactions', title: 'Transactions' },
  ]);

  const makePayment = (method, cardDetails, amount, date) => {
    const code = `PAY${Math.floor(Math.random() * 100000)}`; // Random payment code for demo
    const newTransaction = { method, amount, code, date, cardDetails };
    setTransactions([newTransaction, ...transactions]);
  };

  const renderScene = SceneMap({
    payments: () => <PaymentTab makePayment={makePayment} />,
    transactions: () => <TransactionsTab transactions={transactions} />,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            activeColor="#841584"
            inactiveColor="gray"
          />
        )}
      />
      <Toast />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  indicator: {
    backgroundColor: '#841584',
  },
  tabView: {
    marginTop: 20,
  },
  paymentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  datePicker: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dateText: {
    color: '#333',
  },
  card: {
    width: '80%',
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
    marginBottom: 20,
    alignItems: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  selectedCard: {
    backgroundColor: '#333',
  },
  selectedCardText: {
    color: '#fff',
  },
  sendButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#841584',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
});

