import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingScreen from './UI/Setting/SettingScreen';
import HomeScreen from './UI/Home/HomeScreen';
import TranscationScreen from './UI/Transaction/TransactionScreen';
import WalletScreen from './UI/Wallet/WalletScreen';
// Dummy screens
const Wallet = () => <View style={styles.screen}><Text>Wallet</Text></View>;

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'indigo',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Transaction':
              iconName = 'chart-bar';
              break;
            case 'Wallet':
              iconName = 'wallet';
              break;
            case 'Setting':
              iconName = 'cog';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={TranscationScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Dashboard;
