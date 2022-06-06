import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import QuantityActions from './QuantityActions';
import {deleteShoppingCartItem} from '../services/shoppingCart';
import plantImage from '../assets/plant1.png';

const renderRightActions = (cartItemId, onCartItemDelete) => {
  const onDelete = async () => {
    try {
      await deleteShoppingCartItem(cartItemId);
      onCartItemDelete(cartItemId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        padding: 30,
      }}>
      <Icon size={30} name="trash-2" color="white" onPress={onDelete} />
    </View>
  );
};

const CartItem = ({item, onQuantityChange, onCartItemDelete}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  console.log(item.plant);
  return (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id, onCartItemDelete)}>
      <View style={style.card}>
        <View
          style={{
            height: 100,
            width: 50,
            alignItems: 'center',
          }}>
          <Image
            source={plantImage}
            style={{flex: 0.9, resizeMode: 'contain'}}
          />
        </View>

        <Text>{item.plant.name}</Text>

        <Text>${item.plant.price}</Text>

        <QuantityActions
          smaller
          initialQuantity={quantity}
          onChange={newQuantity => {
            setQuantity(newQuantity);
            onQuantityChange({plantId: item.plant.id, newQuantity});
          }}
        />
      </View>
    </Swipeable>
  );
};

const style = StyleSheet.create({
  card: {
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default CartItem;
