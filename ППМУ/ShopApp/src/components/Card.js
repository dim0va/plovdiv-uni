import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../constants/colors';
import {updatePlant} from '../services/plants';
import plantImage from '../assets/plant1.png';

const Card = ({plant, navigation}) => {
  const [isLiked, setIsLiked] = useState(plant.isLiked);

  const onLike = async () => {
    try {
      await updatePlant({plantId: plant.id, isLiked: !plant.isLiked});
      setIsLiked(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(plant);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', plant)}>
      <View style={style.card}>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isLiked
                ? 'rgba(245, 42, 42,0.2)'
                : 'rgba(0,0,0,0.2) ',
            }}>
            <TouchableOpacity onPress={onLike}>
              <Icon
                name="favorite"
                size={18}
                color={isLiked ? COLORS.red : COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}>
          <Image source={plantImage} style={{flex: 1, resizeMode: 'contain'}} />
        </View>

        <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
          {plant.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontSize: 19, fontWeight: 'bold'}}>${plant.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width / 2 - 30;

const style = StyleSheet.create({
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});

export default Card;
