import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuickInfoItem = ({ icon, text }) => (
  <View style={styles.quickInfoItem}>
    <Icon name={icon} size={20} color="#6A1B9A" />
    <Text style={styles.quickInfoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickInfoText: {
    marginLeft: 12,
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
});

export default QuickInfoItem;
