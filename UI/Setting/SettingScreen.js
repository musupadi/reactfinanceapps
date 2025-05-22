import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderCard from '../Widget/HeaderCard';

const settings = [
  { icon: 'logout', label: 'Back to Splash', action: 'Splash' },
  { icon: 'language', label: 'Language' },
  { icon: 'notifications', label: 'Notification Settings' },
  { icon: 'lock', label: 'Privacy & Security' },
  { icon: 'info', label: 'About This App' },
  { icon: 'help-outline', label: 'Help & Support' },
];

const SettingScreen = () => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    if (item.action) {
      navigation.replace(item.action); // replace Splash
    } else {
      Alert.alert(item.label, 'This feature is not implemented yet.');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderCard
        name="Supriyadi"
        onAction={() => Alert.alert('Header Action', 'This is not implemented yet')}
      />

      <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../../assets/lottie/setting.json')}

          autoPlay
          loop
          style={{ height: 250, width: 250 }}
        />

      </View>

      <FlatList
        data={settings}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tile} onPress={() => handlePress(item)}>
            <Icon name={item.icon} size={22} color="#6A1B9A" />
            <Text style={styles.label}>{item.label}</Text>
            <Icon name="arrow-forward-ios" size={14} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FF',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  lottie: {
    height: 160,
    alignSelf: 'center',
    marginVertical: 12,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});

export default SettingScreen;
