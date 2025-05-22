import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const HeaderCard = ({ name, onAction }) => {
  return (
    <LinearGradient
      colors={['#151E57', '#F199FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('../../assets/img/profile.jpg')}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>Welcome Back,</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.name,
            { fontSize: name.length > 16 ? 14 : 16 },
          ]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={onAction ?? (() => {})}>
        <Icon name="grid-view" size={24} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderRadius: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HeaderCard;
