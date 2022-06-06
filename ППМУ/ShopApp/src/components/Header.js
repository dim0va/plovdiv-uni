import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../constants/colors';

const Header = ({navigation}) => {
  return (
    <View style={style.header}>
      <View>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Welcome to</Text>
        <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
          FloraShop
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
        <Icon name="shopping-cart" size={28} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
