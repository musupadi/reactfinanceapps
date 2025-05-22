import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TransactionTile = ({ icon, title, amount, date, time }) => (
  <View style={styles.container}>
    <Image source={icon} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{date}</Text>
    </View>
    <View style={styles.right}>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.sub}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: '600',
  },
  sub: {
    color: '#888',
    fontSize: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
  },
});

export default TransactionTile;
