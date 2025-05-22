import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <Icon name="star-border" size={28} color="purple" />
        <Icon name="toggle-on" size={32} color="indigo" />
      </View>

      <View style={styles.middle}>
        <LottieView
          source={require('./assets/lottie/finance1.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.title}>
          Find way to{'\n'}
          <Text style={styles.textPink}>manage </Text>
          <Text style={styles.textPurple}>your </Text>
          <Text style={styles.textDeepPurple}>finance</Text>
        </Text>
        <Text style={styles.subtitle}>
          The most Transparent &{'\n'}Security Bank ever
        </Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <View style={styles.qrIcon}>
          <Icon name="qr-code-scanner" size={28} color="#999" />
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middle: {
    alignItems: 'center',
  },
  lottie: {
    height: 250,
    width: width - 48,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 30,
  },
  textPink: {
    color: '#FF4081',
  },
  textPurple: {
    color: 'purple',
  },
  textDeepPurple: {
    color: '#673AB7',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 4,
    backgroundColor: '#AF66F2',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  qrIcon: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SplashScreen;
