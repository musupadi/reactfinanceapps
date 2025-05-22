import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeInfoCard = ({ title, subtitle, color, icon }) => (
  <View style={[styles.infoCard, { borderColor: color }]}>
    <View style={[styles.avatar, { backgroundColor: `${color}20` }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={[styles.infoTitle, { color }]}>{title}</Text>
    <Text style={styles.infoSubtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoCard: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoTitle: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default HomeInfoCard;
