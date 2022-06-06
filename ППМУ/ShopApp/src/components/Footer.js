import React from 'react';
import {View, Text} from 'react-native';
import COLORS from '../constants/colors';

const Footer = () => {
  return (
    <>
      <View
        style={{
          marginVertical: 15,
          borderBottomColor: COLORS.grey,
          borderBottomWidth: 1,
        }}
      />

      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={{marginLeft: 15}}> DIMOVA </Text>
        <Text style={{marginRight: 15}}> ©2022 </Text>
      </View>
    </>
  );
};

export default Footer;
